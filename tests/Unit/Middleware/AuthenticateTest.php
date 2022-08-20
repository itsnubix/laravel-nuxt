<?php

namespace Tests\Unit\Middleware;

use Tests\TestCase;
use App\Http\Middleware\Authenticate;

class AuthenticateTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_it_redirects_to_login_if_not_expecting_json()
    {
        $this->app['router']
            ->get('test-authenticate', fn () => ['hello world'])
            ->middleware(Authenticate::class);

        $this->get('test-authenticate')->assertRedirect(route('login'));
    }
}
