<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Verified;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;

class EmailVerificationTest extends TestCase
{
    use RefreshDatabase;

    public function test_email_can_be_verified()
    {
        $user = User::factory()->unverified()->create();

        Event::fake();

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id, 'hash' => sha1($user->email)]
        );

        $response = $this->actingAs($user)->get($verificationUrl);

        Event::assertDispatched(Verified::class);
        $this->assertTrue($user->fresh()->hasVerifiedEmail());
        $response->assertRedirect(config('app.frontend_url').RouteServiceProvider::HOME.'?verified=1');
    }

    public function test_email_is_not_verified_with_invalid_hash()
    {
        $user = User::factory()->create([
            'email_verified_at' => null,
        ]);

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id, 'hash' => sha1('wrong-email')]
        );

        $this->actingAs($user)->get($verificationUrl);

        $this->assertFalse($user->fresh()->hasVerifiedEmail());
    }

    public function test_user_is_redirected_if_already_verified()
    {
        $user = User::factory()->create();

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id, 'hash' => sha1($user->email)]
        );

        $this->be($user)->get($verificationUrl)->assertRedirect(config('app.frontend_url').RouteServiceProvider::HOME.'?verified=1');
    }

    public function test_verification_email_can_be_requested()
    {
        Notification::fake();

        $this->be($user = User::factory()->unverified()->create())
            ->postJson('/email/verification-notification')
            ->assertOk()
            ->assertJson(['status' => 'verification-link-sent']);

        Notification::assertSentTo($user, VerifyEmail::class);
    }

    public function test_verified_users_do_not_receive_a_verification_email()
    {
        Notification::fake();

        $this->be($user = User::factory()->create())
            ->postJson('/email/verification-notification')
            ->assertRedirect(RouteServiceProvider::HOME);

        Notification::assertNotSentTo($user, VerifyEmail::class);
    }

    public function test_guests_do_not_receive_email_verification_emails()
    {
        $this->postJson('/email/verification-notification')->assertUnauthorized();
    }
}
