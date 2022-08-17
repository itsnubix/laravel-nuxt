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

The Nuxt app is currently configured to build as a SPA. A hosted solution would most likely see the API hosted at the root domain (example.com)
and the frontend application hosted at a subdomain (app.example.com). While bundled together, the Laravel application does not currently serve
the files to the frontend and requires that you host the client on a CDN somewhere while the Laravel site is served on a separate domain.
