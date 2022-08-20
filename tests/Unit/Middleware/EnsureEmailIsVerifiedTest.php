<?php

namespace Tests\Unit\Middleware;

use Tests\TestCase;
use App\Models\User;
use App\Http\Middleware\EnsureEmailIsVerified;

class EnsureEmailIsVerifiedTest extends TestCase
{
    public function test_an_email_must_be_verified()
    {
        $this->app['router']
            ->get('test-ensure-email-is-verified', fn () => ['hello world'])
            ->middleware(EnsureEmailIsVerified::class);

        $this->be(User::factory()->unverified()->create())
            ->get('test-ensure-email-is-verified')
            ->assertJson(['message' => 'Your email address is not verified.'])
            ->assertStatus(409);
    }

    public function test_verified_users_may_pass_without_incident()
    {
        $this->app['router']
            ->get('test-ensure-email-is-verified', fn () => ['hello world'])
            ->middleware(EnsureEmailIsVerified::class);

        $this->be(User::factory()->create())
            ->get('test-ensure-email-is-verified')
            ->assertOk();
    }
}
