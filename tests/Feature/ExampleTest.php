<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_the_application_pushes_people_to_the_client_app()
    {
        $response = $this->get('/')->assertRedirect(env('FRONTEND_URL'));
    }
}
