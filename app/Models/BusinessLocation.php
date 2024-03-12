<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class BusinessLocation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'business_id',
        'code',
        'name',
        'is_default',
    ];

    public function business(): BelongsTo
    {
        return $this->belongsTo(Business::class);
    }
}
