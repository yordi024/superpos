<?php

use App\Enums\PlanInterval;
use App\Models\Business;
use App\Models\Subscription\Subscription;
use App\Models\Subscription\SubscriptionPlan;
use Illuminate\Support\Carbon;

it('has all subscription necessary fields', function () {
    // Arrange
    Carbon::setTestNow(now());

    $subscription = Subscription::factory()->create([
        'business_id' => 1,
        'plan_id' => 1,
        'price' => 100,
        'currency' => 'USD',
        'interval' => 'month',
        'interval_count' => 1,
        'trial_ends_at' => now()->addDays(7),
        'starts_at' => now()->addDays(7),
        'ends_at' => now()->addDays(30),
        'canceled_at' => null,
    ]);

    // Act & Assert
    expect($subscription->business_id)->toBe(1);
    expect($subscription->plan_id)->toBe(1);
    expect($subscription->price)->toBe(100);
    expect($subscription->currency)->toBe('USD');
    expect($subscription->interval)->toBe(PlanInterval::MONTH);
    expect($subscription->interval_count)->toBe(1);
    expect($subscription->trial_ends_at->toDateTimeString())
        ->toBe(now()->addDays(7)->toDateTimeString());
    expect($subscription->starts_at->toDateTimeString())
        ->toBe(now()->addDays(7)->toDateTimeString());
    expect($subscription->ends_at->toDateTimeString())
        ->toBe(now()->addDays(30)->toDateTimeString());
    expect($subscription->canceled_at)->toBeNull();
});

it('belongs to a business', function () {
    // Arrange
    $subscription = Subscription::factory()->create();

    // Act & Assert
    expect($subscription->business)->toBeInstanceOf(Business::class);
});

it('belongs to a plan', function () {
    // Arrange
    $subscription = Subscription::factory()->create();

    // Act & Assert
    expect($subscription->plan)->toBeInstanceOf(SubscriptionPlan::class);
});

it('filters by active subscriptions', function () {
    Carbon::setTestNow(now());
    // Arrange
    $activeSubscription = Subscription::factory()->create([
        'ends_at' => now()->addWeek(),
    ]);

    Subscription::factory()->count(3)->create([
        'ends_at' => now()->subDay(),
    ]);

    // Act & Assert
    expect($activeSubscription->isActive())->toBeTrue();
    expect($activeSubscription->isInactive())->toBeFalse();

    expect(Subscription::active()->count())->toBe(1);
    expect(Subscription::inactive()->count())->toBe(3);
    expect(Subscription::count())->toBe(4);
});

it('can verify if subscription is on trial', function () {
    // Arrange
    $subscriptionWithTrial = Subscription::factory()->create([
        'trial_ends_at' => now()->addDays(7),
    ]);

    $subscriptionWithEndedTrial = Subscription::factory()->create([
        'trial_ends_at' => now()->subDays(7),
    ]);

    // Act & Assert
    expect($subscriptionWithTrial->onTrial())->toBeTrue();
    expect($subscriptionWithEndedTrial->onTrial())->toBeFalse();
});

it('can verify if subscription is canceled', function () {
    // Arrange
    $subscription = Subscription::factory()->create([
        'canceled_at' => now(),
    ]);

    // Act & Assert
    expect($subscription->canceled())->toBeTrue();
});

it('can verify if subscription is ended', function () {
    // Arrange
    $subscription = Subscription::factory()->create([
        'ends_at' => now(),
    ]);

    // Act & Assert
    expect($subscription->ended())->toBeTrue();
});

it('can verify if subscription is active', function () {
    // Arrange
    $subscription = Subscription::factory()->create();

    // Act & Assert
    expect($subscription->isActive())->toBeTrue();
    expect($subscription->is_active)->toBeTrue();
});
