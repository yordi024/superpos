<?php

namespace App\Jobs;

use App\Models\Business;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ConfigNewBusinessJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(private Business $business)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Set $owner business_id
        $owner = $this->business->owner;
        $owner->business_id = $this->business->id;
        $owner->save();

        // Create default location
        $this->business->locations()->create([
            'code' => str()->random(10),
            'name' => 'Default',
            'phone' => $this->business->phone,
            'is_default' => true,
        ]);
    }
}
