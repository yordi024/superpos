<?php

namespace Database\Seeders;

use App\Enums\PlanInterval;
use App\Models\Subscription\SubscriptionPlan;
use Illuminate\Database\Seeder;

class SubscriptionPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $basicPlan = SubscriptionPlan::create([
            'name' => 'Basic Plan',
            'description' => 'Basic plan',
            'price' => 10,
            'currency' => 'USD',
            'interval' => PlanInterval::MONTH,
            'interval_count' => 1,
            'trial_days' => 5,
            'is_active' => true,
            'is_visible' => true,
            'order' => 1,
            'users_limit' => 10,
            'products_limit' => 10,
            'locations_limit' => 10,
            'invoices_limit' => 10,
        ]);

        $ultimatePlan = SubscriptionPlan::create([
            'name' => 'Ultimate Plan',
            'description' => 'Basic plan',
            'price' => 100,
            'currency' => 'USD',
            'interval' => PlanInterval::MONTH,
            'interval_count' => 1,
            'trial_days' => 5,
            'is_active' => true,
            'is_visible' => true,
            'order' => 2,
            'users_limit' => 0,
            'products_limit' => 0,
            'locations_limit' => 0,
            'invoices_limit' => 0,
        ]);
    }
}
