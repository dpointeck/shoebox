<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $casts = [
        'customer_since' => 'date',
        'custom_fields' => 'array',
    ];

    public function projects()
    {
        return $this->hasMany(Project::class);
    }
}
