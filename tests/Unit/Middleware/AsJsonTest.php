<?php

namespace Tests\Unit\Middleware;

use Tests\TestCase;
use App\Http\Middleware\AsJson;

class AsJsonTest extends TestCase
{
    public function test_it_forces_the_request_to_be_json()
    {
        $this->app['router']
            ->get('test-as-json', fn () => ['hello world'])
            ->middleware(AsJson::class);

        $this->get('test-as-json')->assertHeader('Content-Type', 'application/json');
    }
}
