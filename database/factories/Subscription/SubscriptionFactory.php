<?php

namespace Database\Factories\Subscription;

use App\Models\Business;
use App\Models\Subscription\SubscriptionPlan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subscription>
 */
class SubscriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'business_id' => Business::factory(),
            'plan_id' => SubscriptionPlan::factory(),
            'price' => fake()->numberBetween(100, 1000),
            'currency' => fake()->currencyCode(),
            'interval' => fake()->randomElement(['month', 'year']),
            'interval_count' => fake()->numberBetween(1, 12),
            'trial_ends_at' => fake()->dateTimeBetween('now', '+7 days'),
            'starts_at' => fake()->dateTimeBetween('now', '+7 days'),
            'ends_at' => fake()->dateTimeBetween('now', '+30 days'),
            'canceled_at' => null,
        ];
    }

    public function canceled()
    {
        return $this->state(function (array $attributes) {
            return [
                'canceled_at' => now(),
            ];
        });
    }
}
