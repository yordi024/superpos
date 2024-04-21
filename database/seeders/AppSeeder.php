<?php

namespace Database\Seeders;

use App\Jobs\NewSubscriptionJob;
use App\Models\Address;
use App\Models\Business;
use App\Models\BusinessLocation;
use App\Models\Subscription\SubscriptionPlan;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AppSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminUser = User::create([
            'name' => 'Admin',
            'username' => 'admin',
            'email' => 'admin@email.com',
            'is_admin' => true,
            'is_active' => true,
            'password' => Hash::make('password'),
        ]);

        $defaultBusiness = Business::create([
            'name' => 'Main Business',
            'email' => 'main@example.com',
            'phone' => '123456789',
            'currency' => 'DOP',
            'is_active' => true,
            'started_at' => now(),
            'user_id' => $adminUser->id,
        ]);

        $adminUser->update(['business_id' => $defaultBusiness->id]);

        $defaultBusinessLocation = BusinessLocation::create([
            'business_id' => $defaultBusiness->id,
            'name' => 'Main Location',
            'code' => 'main-location',
            'is_default' => true,
            'is_active' => true,
        ]);

        Address::factory()->create([
            'addressable_type' => get_class($defaultBusinessLocation),
            'addressable_id' => $defaultBusinessLocation->id,
        ]);

        $ultimatePlan = SubscriptionPlan::findOrFail(2)->first();

        NewSubscriptionJob::dispatch($defaultBusiness->id, $ultimatePlan->id)->onQueue('default');
    }
}
