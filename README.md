# Laravel Nuxt

This project combines NuxtJS v3 and Laravel.

This project is a work-in-progress and should not be used in production at this time. If you'd like to use it, instructions for installation are below.

## Installation

```
git clone https://github.com/itsnubix/laravel-nuxt
cd laravel-nuxt
npm install --force
composer install
cp .env.example .env
php artisan key:generate
./vendor/bin/sail up -d
php artisan migrate:fresh --seed
npm run dev
```

Your front-end application will be available on at `http://localhost:3000` and your API will be accessible at `http://localhost:8000`

You can log in with `test@example.com` and `password` for credentials

## Deployment

To deploy to Laravel Vapor create the following command:

```
php artisan make:command PrepareNuxtAppForDeploy
```

And then put the following contents inside it:

```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class PrepareNuxtAppForDeploy extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'nuxt:prepare';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Prepares the Nuxt application for deployment on Vapor.';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $view = file_get_contents($path = resource_path('views/app.blade.php'));
        file_put_contents($path, preg_replace('/"(\/_nuxt\/.*?)"/', '"{{ asset(\'$1\') }}"', $view));
    }
}
```

From here update your `vapor.yml` to have the following build steps:

```yml
id: 12345
name: my-app
environments:
  production:
    build:
      - 'COMPOSER_MIRROR_PATH_REPOS=1 composer install --no-dev'
      - 'php artisan event:cache'
      - 'php vendor/bin/vapor env:pull production'
      - 'rm .env && mv .env.production .env'
      - 'npm ci && npm run generate'
      - 'cp -r .output/public/index.html resources/views/app.blade.php'
      - 'cp -r .output/public/_nuxt public/_nuxt'
      - 'php artisan nuxt:prepare'
      - 'rm -rf node_modules client .output'
```

Be sure to add build-time environment variables necessary for the application to function correctly (such as an API_BASE_URL if required).

This deploy script will build your nuxt project and copy the `index.html` entry point to your resources folder as `app.blade.php`. From there it will copy all files into your public folder which vapor will upload to a CDN. Then we run the `nuxt:prepare` script which will change any instances of `/_nuxt/` in the `app.blade.php` file to use the `asset()` helper and point to the files on the CDN. Finally, it cleans everything up and you're good to launch.

The final step is to add a fallback route to your `routes/web.php` file to load the Nuxt app and let it handle user traffic and error handling for missing routes.

```php
Route::fallback(fn() => view('app'));
```

You should now be good to deploy your application to Vapor.
