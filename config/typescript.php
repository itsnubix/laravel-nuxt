<?php

use Illuminate\Database\Eloquent\Model;
use Based\TypeScript\Generators\ModelGenerator;

return [
    'generators' => [
        Model::class => ModelGenerator::class,
    ],

    'paths' => [
        //
    ],

    'customRules' => [
        // \App\Rules\MyCustomRule::class => 'string',
        // \App\Rules\MyOtherCustomRule::class => ['string', 'number'],
    ],

    'output' => base_path('client/types/models.d.ts'),

    'autoloadDev' => false,
];
