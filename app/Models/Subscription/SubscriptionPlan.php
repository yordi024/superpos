<?php

namespace App\Models\Subscription;

use App\Models\Traits\HasSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubscriptionPlan extends Model
{
    use HasFactory, SoftDeletes, HasSlug;

    protected $fillable = [
        'slug',
        'name',
        'description',
        'price',
        'currency',
        'interval',
        'interval_count',
        'trial_days',
        'is_active',
        'is_visible',
        'order',
        'features',
        'users_limit',
        'products_limit',
        'locations_limit',
        'invoices_limit',
    ];

    protected $casts = [
        'features' => 'array',
    ];

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class, 'plan_id');
    }
}
