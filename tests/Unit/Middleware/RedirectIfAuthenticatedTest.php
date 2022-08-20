<?php

namespace Tests\Unit\Middleware;

use Tests\TestCase;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use App\Http\Middleware\RedirectIfAuthenticated;

class RedirectIfAuthenticatedTest extends TestCase
{
    public function test_it_redirects_the_user_if_they_are_authd()
    {
        $this->app['router']
            ->get('test-redirect-if-authenticated', fn () => ['hello world'])
            ->middleware(RedirectIfAuthenticated::class);

        $this->be(User::factory()->create())
            ->get('test-redirect-if-authenticated')
            ->assertRedirect(config('app.frontend_url').RouteServiceProvider::HOME);
    }

    public function test_it_does_not_redirect_if_guest()
    {
        $this->app['router']
            ->get('test-redirect-if-authenticated', fn () => ['hello world'])
            ->middleware(RedirectIfAuthenticated::class);

        $this->get('test-redirect-if-authenticated')
            ->assertOk();
    }
}
