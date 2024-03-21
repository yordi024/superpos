<?php

use App\Models\Business;
use App\Models\User;

it('has all user necessary fields', function () {
    // Arrange
    $user = User::factory()->create([
        'name' => 'John Doe',
        'username' => 'test1',
        'email' => 'test@example.com',
        'password' => 'password',
        'is_active' => true,
        'is_admin' => false,
        'avatar_url' => 'avatar.png',
    ]);

    // Act & Assert
    expect($user->name)->toBe('John Doe');
    expect($user->username)->toBe('test1');
    expect($user->email)->toBe('test@example.com');
    expect($user->is_active)->toBe(true);
    expect($user->is_admin)->toBe(false);
    expect($user->avatar_url)->toBe('avatar.png');
});

it('should have admin and app users', function () {
    // Arrange
    $admin = User::factory()->admin()->create();
    $app = User::factory()->create();

    //
    expect($admin->is_admin)->toBe(true);
    expect($app->is_admin)->toBe(false);
});

it('should have active and inactive users', function () {
    // Arrange
    $active = User::factory()->create();
    $inactive = User::factory()->inactive()->create();

    // Act & Assert
    expect($active->is_active)->toBe(true);
    expect($inactive->is_active)->toBe(false);
});

it('belongs to a business', function () {
    // Arrange
    $user = User::factory()
        ->for(Business::factory())
        ->create();

    // Act & Assert
    expect($user->business)->toBeInstanceOf(Business::class);
});

it('owns a business', function () {
    // Arrange
    $user = User::factory()
        ->has(Business::factory(), 'ownedBusiness')
        ->create();

    // Act & Assert
    expect($user->ownedBusiness)->toBeInstanceOf(Business::class);
    expect($user->ownedBusiness->owner)->toBeInstanceOf(User::class);
    expect($user->ownedBusiness->owner->id)->toBe($user->id);
});
