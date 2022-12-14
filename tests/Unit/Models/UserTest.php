<?php

namespace Tests\Unit\Models;

use App\Models\User;
use Tests\TestCase;

class UserTest extends TestCase
{
    public function test_it_hides_password_from_output()
    {
        $user = User::factory()->make();

        $this->assertNotNull($user->password);
        $this->assertArrayNotHasKey('password', $user->toArray());
    }
}
