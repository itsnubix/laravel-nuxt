# Laravel Nuxt

This project combines NuxtJS v3 and Laravel.

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
