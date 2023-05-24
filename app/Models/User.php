<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Carbon\Carbon;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'notifications',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'date',
        'is_admin' => 'boolean',
        'verified' => 'boolean',
        'notifications' => 'json',
    ];

    protected $dateFormat = 'Y-m-d';

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->attributes['notifications'] = [
            'day' => true,
            'week' => true,
            'month' => true,
            'sixmonth' => false,
            'year' => false,
            'expired' => true,
        ];
    }

    public function setCreatedAt($value)
    {
        $this->attributes['created_at'] = Carbon::parse($value)->format('Y-m-d');
    }

    public function setUpdatedAt($value)
    {
        $this->attributes['updated_at'] = Carbon::parse($value)->format('Y-m-d');
    }
}
