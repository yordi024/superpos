<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

trait UuidKey
{
    public static function booted()
    {
        static::creating(function (Model $model) {
            $model->setAttribute('uuid', Str::slug($model->name));
        });
    }
}
