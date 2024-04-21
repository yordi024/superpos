<?php

namespace App\Models\Subscription;

use App\Enums\PlanInterval;
use App\Models\Business;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Stringable;

class Subscription extends Model
{
    use HasFactory, SoftDeletes;

    protected $appends = [
        'frequency_label',
        'is_active',
    ];

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

    protected function casts(): array
    {
        return [
            'interval' => PlanInterval::class,
        ];
    }

    /**
     * Check if subscription is active.
     */
    public function isActive(): bool
    {
        return ! $this->ended() || $this->onTrial();
    }

    /**
     * Check if subscription is inactive.
     */
    public function isInactive(): bool
    {
        return ! $this->active();
    }

    /**
     * Check if subscription is currently on trial.
     */
    public function onTrial(): bool
    {
        return $this->trial_ends_at ? now()->lt($this->trial_ends_at) : false;
    }

    /**
     * Check if subscription is canceled.
     */
    public function canceled(): bool
    {
        return $this->canceled_at ? now()->gte($this->canceled_at) : false;
    }

    /**
     * Check if subscription period has ended.
     */
    public function ended(): bool
    {
        return $this->ends_at ? now()->gte($this->ends_at) : false;
    }

    /**
     * Get the is_active attribute.
     */
    public function getIsActiveAttribute(): bool
    {
        return $this->isActive();
    }

    /**
     * Get the frequency label attribute for the model.
     */
    public function getFrequencyLabelAttribute(): string
    {
        $plural = $this->interval_count > 1;

        $period = $plural ? $this->interval->plural() : $this->interval->value;

        return str($period)
            ->when($plural, fn (Stringable $string) => $string->prepend(" {$this->interval_count} "))
            ->prepend(trans('Every').' ')->toString();
    }

    public function scopeActive(Builder $query)
    {
        return $query->where('ends_at', '>', now())->orWhere('canceled_at', '>', now());
    }

    public function scopeInactive(Builder $query)
    {
        return $query->where('ends_at', '<', now())->orWhere('canceled_at', '<', now());
    }

    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    public function plan()
    {
        return $this->belongsTo(SubscriptionPlan::class);
    }
}
