<?php

use App\Models\Subscription\Subscription;
use App\Models\Subscription\SubscriptionPlan;

it('has all subscription plan necessary fields', function () {
    // Arrange
    $subscriptionPlan = SubscriptionPlan::factory()->create([
        'name' => 'Test Plan',
        'description' => 'Test',
        'price' => 100,
        'currency' => 'USD',
        'interval' => 'month',
        'interval_count' => 1,
        'trial_days' => 0,
        'is_active' => true,
        'is_visible' => true,
        'order' => 1,
        'users_limit' => 10,
        'products_limit' => 10,
        'invoices_limit' => 100,
        'locations_limit' => 2,
        'features' => [
            'test-feature' => true,
            'test-feature-2' => 2,
        ],
    ]);

    // Act & Assert
    expect($subscriptionPlan->slug)->toBe('test-plan');
    expect($subscriptionPlan->name)->toBe('Test Plan');
    expect($subscriptionPlan->description)->toBe('Test');
    expect($subscriptionPlan->price)->toBe(100);
    expect($subscriptionPlan->currency)->toBe('USD');
    expect($subscriptionPlan->interval)->toBe('month');
    expect($subscriptionPlan->interval_count)->toBe(1);
    expect($subscriptionPlan->trial_days)->toBe(0);
    expect($subscriptionPlan->is_active)->toBe(true);
    expect($subscriptionPlan->is_visible)->toBe(true);
    expect($subscriptionPlan->order)->toBe(1);
    expect($subscriptionPlan->users_limit)->toBe(10);
    expect($subscriptionPlan->products_limit)->toBe(10);
    expect($subscriptionPlan->invoices_limit)->toBe(100);
    expect($subscriptionPlan->locations_limit)->toBe(2);
    expect($subscriptionPlan->features)->toBe([
        'test-feature' => true,
        'test-feature-2' => 2,
    ]);
});

it('has many subscription', function () {
    // Arrange
    $subscriptionPlan = SubscriptionPlan::factory()
        ->has(Subscription::factory()->count(3))
        ->create();

    // Act & Assert
    expect($subscriptionPlan->subscriptions)
        ->toBeInstanceOf(\Illuminate\Database\Eloquent\Collection::class)
        ->toHaveCount(3);
});
