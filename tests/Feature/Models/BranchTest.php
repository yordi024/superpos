<?php

use App\Models\Business;
use App\Models\Branch;

it('has all business location necessary fields', function () {
    // Arrange
    $branch = Branch::factory()->create([
        'business_id' => 1,
        'name' => 'Test',
        'code' => 'test-code',
        'phone' => '123456789',
        'is_active' => true,
        'is_default' => true,
    ]);

    // Act & Assert
    expect($branch->business_id)->toBe(1);
    expect($branch->name)->toBe('Test');
    expect($branch->code)->toBe('test-code');
    expect($branch->phone)->toBe('123456789');
    expect($branch->is_active)->toBe(true);
    expect($branch->is_default)->toBe(true);
});

it('belongs to a business', function () {
    // Arrange
    $branch = Branch::factory()
        ->for(Business::factory())
        ->create();

    // Act & Assert
    expect($branch->business)->toBeInstanceOf(Business::class);
});
