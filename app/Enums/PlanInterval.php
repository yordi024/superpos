<?php

namespace App\Enums;

enum PlanInterval: string
{
    case MONTH = 'month';
    case YEAR = 'year';

    function plural() : string {
        $plurars = [
            self::MONTH->name => 'months',
            self::YEAR->name => 'years'
        ];

        return $plurars[$this->name];
    }
}
