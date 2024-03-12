<?php

namespace Database\Factories\Subscription;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SubscriptionPlan>
 */
class SubscriptionPlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'slug' => fake()->slug(),
            'name' => fake()->word(),
            'description' => fake()->sentence(),
            'price' => fake()->numberBetween(100, 1000),
            'currency' => fake()->currencyCode(),
            'interval' => fake()->randomElement(['month', 'year']),
            'interval_count' => fake()->numberBetween(1, 12),
            'trial_days' => fake()->numberBetween(0, 30),
            'is_active' => true,
            'is_visible' => true,
            'order' => fake()->numberBetween(1, 100),
            'users_limit' => fake()->numberBetween(1, 10),
            'products_limit' => fake()->numberBetween(1, 10),
            'invoices_limit' => fake()->numberBetween(1, 100),
            'locations_limit' => fake()->numberBetween(1, 10),
            'features' => [
                'feature1' => fake()->word(),
                'feature2' => fake()->word(),
                'feature3' => fake()->word(),
                'feature4' => fake()->word(),
                'feature5' => fake()->word(),
            ],
        ];
    }
}
