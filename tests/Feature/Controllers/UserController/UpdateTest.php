<?php

use App\Models\User;
use function Pest\Laravel\post;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\put;

beforeEach(function () {
    loginAsUser();
});

it('should update user with correct data', function () {
    $user = User::factory()->create();

    $response = put(route('users.update', $user->id), [
        'name' => $user->name.'_updated',
        'username' => $user->username.'_updated',
        'email' => $user->email,
        'status' => 'inactive',
    ]);

    $response->assertRedirect(route('users.index'))
        ->assertSessionHas('success', 'User updated successfully');

    assertDatabaseHas('users', [
        'id' => $user->id,
        'name' => $user->name.'_updated',
        'username' => $user->username.'_updated',
        'email' => $user->email,
        'is_active' => false,
    ]);
});

it('should not update user with validation errors', function () {
    $user = User::factory()->create();
    $editUser = User::factory()->create();

    $response = post(route('users.store', $editUser->id), [
        'email' => $user->email,
    ]);

    $response->assertSessionHasErrors([
        'name',
        'username',
        'email',
        'status',
        'password',
    ]);

    $response->assertInvalid([
        'email' => 'The email has already been taken.',
    ]);
});
