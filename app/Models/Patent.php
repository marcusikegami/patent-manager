<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patent extends Model
{
    use HasFactory;

    protected $fillable = [
        'patent_number',
        'title',
        'abstract',
        'inventor',
        'filing_date',
        'issue_date',
        'expiration_date',
        'status',
        'jurisdiction',
        'related_patents',
    ];

    protected $casts = [
        'related_patents' => 'array',
    ];

    public function scopeExpired($query)
    {
        return $query->where('expiration_date', '<', now());
    }

    public function scopePending($query)
    {
        return $query->where('status', '=', 'pending');
    }

    public function scopeActive($query)
    {
        return $query->where('status', '=', 'active');
    }

    public function scopeJurisdiction($query, $jurisdiction)
    {
        return $query->where('jurisdiction', '=', $jurisdiction);
    }
}
