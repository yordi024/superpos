<?php

declare(strict_types=1);

namespace Rinvex\Subscriptions\Services;

use Carbon\Carbon;

class Period
{
    protected Carbon $start;

    protected Carbon $end;

    protected string $interval;

    protected int $period = 1;

    public function __construct(string $interval = 'month', int $count = 1, Carbon | string $start = null)
    {
        $this->interval = $interval;

        $this->start = is_null($start) ? Carbon::now() : Carbon::parse($start);

        $this->period = $count;

        $method = [
            'day'   => 'addDays',
            'year'  => 'addYears',
            'month' => 'addYears',
        ];

        $this->end = Carbon::parse($this->start)->{$method[$interval]}($this->period);
    }

    public function getStartDate(): Carbon
    {
        return $this->start;
    }

    public function getEndDate(): Carbon
    {
        return $this->end;
    }

    /**
     * Get period interval.
     */
    public function getInterval(): string
    {
        return $this->interval;
    }

    /**
     * Get period interval count.
     */
    public function getIntervalCount(): int
    {
        return $this->period;
    }
}
