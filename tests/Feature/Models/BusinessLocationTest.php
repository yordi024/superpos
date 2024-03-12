<?php

use App\Models\Business;
use App\Models\BusinessLocation;

it('has all business location necessary fields', function () {
    // Arrange
    $businessLocation = BusinessLocation::factory()->create([
        'business_id' => 1,
        'name' => 'Test',
        'code' => 'test-code',
        'phone' => '123456789',
        'is_active' => true,
        'is_default' => true,
    ]);

    // Act & Assert
    expect($businessLocation->business_id)->toBe(1);
    expect($businessLocation->name)->toBe('Test');
    expect($businessLocation->code)->toBe('test-code');
    expect($businessLocation->phone)->toBe('123456789');
    expect($businessLocation->is_active)->toBe(true);
    expect($businessLocation->is_default)->toBe(true);
});

it('belongs to a business', function () {
    // Arrange
    $businessLocation = BusinessLocation::factory()
        ->for(Business::factory())
        ->create();

    // Act & Assert
    expect($businessLocation->business)->toBeInstanceOf(Business::class);
});
