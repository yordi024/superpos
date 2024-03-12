<?php

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
        Schema::create('subscription_plans', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('description');
            $table->decimal('price');
            $table->string('currency', 3);
            $table->string('interval');
            $table->integer('interval_count');
            $table->integer('trial_days')->default(0);
            $table->boolean('is_active');
            $table->boolean('is_visible');
            $table->integer('order');
            $table->integer('users_limit');
            $table->integer('products_limit');
            $table->integer('invoices_limit');
            $table->integer('locations_limit');
            $table->json('features')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscription_plans');
    }
};
