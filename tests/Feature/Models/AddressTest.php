<?php

use App\Models\Address;
use App\Models\BusinessLocation;
use App\Models\User;

it('has all address necessary fields', function () {
    // Arrange
    $address = Address::factory()->create([
        'addressable_id' => 1,
        'addressable_type' => 'App\Models\User',
        'country' => 'Country',
        'state' => 'State',
        'city' => 'City',
        'street' => 'Street',
        'landmark' => 'Landmark',
        'zipcode' => 'Zipcode',
    ]);

    // Act & Assert
    expect($address->country)->toBe('Country');
    expect($address->state)->toBe('State');
    expect($address->city)->toBe('City');
    expect($address->street)->toBe('Street');
    expect($address->landmark)->toBe('Landmark');
    expect($address->zipcode)->toBe('Zipcode');
});

it('has addressable user relation', function () {
    // Arrange
    $address = Address::factory()
        ->for(User::factory(), 'addressable')
        ->create();

    // Act & Assert
    expect($address->addressable)->toBeInstanceOf(User::class);
});

it('has addressable business location relation', function () {
    // Arrange
    $address = Address::factory()
        ->for(BusinessLocation::factory(), 'addressable')
        ->create();

    // Act & Assert
    expect($address->addressable)->toBeInstanceOf(BusinessLocation::class);
});
