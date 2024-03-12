<?php

namespace App\Models\Subscription;

use App\Models\Business;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subscription extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'business_id',
        'plan_id',
        'price',
        'currency',
        'interval',
        'interval_count',
        'trial_ends_at',
        'starts_at',
        'ends_at',
        'canceled_at',
    ];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    public function plan()
    {
        return $this->belongsTo(SubscriptionPlan::class);
    }
}
