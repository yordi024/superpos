<?php

return [
    'abilities' => [
        'users' => [
            'view',
            'create',
            'update',
            'delete',
        ],
        'roles' => [
            'view',
            'create',
            'update',
            'delete',
        ],
    ],
    'roles' => [
        [
            'name' => 'admin',
            'title' => 'Admin',
        ],
        [
            'name' => 'sales-person',
            'title' => 'Sales Person',
        ],
    ],
];
