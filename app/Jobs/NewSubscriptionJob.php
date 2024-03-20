<?php

namespace App\Jobs;

use App\Models\Business;
use App\Models\Subscription\Subscription;
use App\Models\Subscription\SubscriptionPlan;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Rinvex\Subscriptions\Services\Period;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class NewSubscriptionJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        protected int $business_id,
        protected int $plan_id)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $plan = SubscriptionPlan::find($this->plan_id);
        $business = Business::find($this->business_id);

        $trial = new Period('day', $plan->trial_days, now());
        $period = new Period($plan->interval, $plan->interval_count, $trial->getEndDate());

        Subscription::create([
            'business_id' => $business->id,
            'plan_id' => $plan->id,
            'price' => $plan->price,
            'currency' => $plan->currency,
            'interval' => $plan->interval,
            'interval_count' => $plan->interval_count,
            'trial_ends_at' => $trial->getEndDate(),
            'starts_at' => $period->getStartDate(),
            'ends_at' => $period->getEndDate(),
            'canceled_at' => null,
            'is_active' => true
        ]);
    }

}
