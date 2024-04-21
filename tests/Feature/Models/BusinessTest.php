<?php

use App\Models\Business;
use App\Models\BusinessLocation;
use App\Models\Subscription\Subscription;
use App\Models\User;
use Illuminate\Support\Carbon;

it('has all business necessary fields', function () {
    // Arrange
    Carbon::setTestNow(now());

    $business = Business::factory()->create([
        'slug' => 'test-business',
        'user_id' => 1,
        'name' => 'Test Business',
        'is_active' => true,
        'email' => 'test@example.com',
        'phone' => '123456789',
        'timezone' => 'UTC',
        'currency' => 'USD',
        'started_at' => now(),
    ]);

    // Act & Assert
    expect($business->slug)->toBe('test-business');
    expect($business->user_id)->toBe(1);
    expect($business->name)->toBe('Test Business');
    expect($business->is_active)->toBe(true);
    expect($business->email)->toBe('test@example.com');
    expect($business->phone)->toBe('123456789');
    expect($business->timezone)->toBe('UTC');
    expect($business->currency)->toBe('USD');
    expect($business->started_at->toDateTimeString())->toBe(now()->toDateTimeString());
});

it('belongs to a user', function () {
    // Arrange
    $business = Business::factory()->create();

    // Act & Assert
    expect($business->owner)->toBeInstanceOf(User::class);
});

it('has one subscription', function () {
    // Arrange
    $business = Business::factory()->create();
    $subscription = Subscription::factory()->create([
        'business_id' => $business->id,
    ]);

    // Act & Assert
    expect($business->subscription)->toBeInstanceOf(Subscription::class);
    expect($business->subscription->id)->toBe($subscription->id);
});

it('has many locations', function () {
    // Arrange
    $business = Business::factory()->create();
    $locations = BusinessLocation::factory()->count(2)->create([
        'business_id' => $business->id,
    ]);

    //Act & Assert
    expect($business->locations->first())->toBeInstanceOf(BusinessLocation::class);
    expect($business->locations->count())->toBe(2);
});

it('has main location', function () {
    // Arrange
    $business = Business::factory()->create();
    $location = BusinessLocation::factory()->main()->create([
        'business_id' => $business->id,
    ]);

    // Act & Assert
    expect($business->mainLocation)->toBeInstanceOf(BusinessLocation::class);
    expect($business->mainLocation->id)->toBe($location->id);
});
