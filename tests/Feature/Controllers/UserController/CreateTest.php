<?php

use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\post;

beforeEach(function () {
    loginAsUser();
});

it('should create user with correct data', function () {
    $response = post(route('users.store'), [
        'name' => 'Test User',
        'username' => 'test',
        'email' => 'test@example',
        'status' => 'active',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertRedirect(route('users.index'))
        ->assertSessionHas('success', 'User created successfully');

    assertDatabaseHas('users', [
        'name' => 'Test User',
        'username' => 'test',
        'email' => 'test@example',
        'is_active' => true,
    ]);
});

it('should not create user with validation errors', function () {
    $response = post(route('users.store'), []);

    $response->assertSessionHasErrors([
        'name',
        'username',
        'email',
        'status',
        'password',
    ]);
});
