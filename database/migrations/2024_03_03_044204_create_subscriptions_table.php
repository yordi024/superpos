<?php

use App\Models\Business;
use App\Models\Subscription\SubscriptionPlan;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Business::class);
            $table->foreignIdFor(SubscriptionPlan::class, 'plan_id');
            $table->string('price');
            $table->string('currency');
            $table->string('interval');
            $table->integer('interval_count');
            $table->timestamp('trial_ends_at');
            $table->timestamp('starts_at');
            $table->timestamp('ends_at');
            $table->timestamp('canceled_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
