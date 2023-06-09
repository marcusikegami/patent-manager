<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => env('ADMIN_NAME', 'Admin'),
            'email' => env('ADMIN_EMAIL', 'admin@example.com'),
            'password' => Hash::make(env('ADMIN_PASSWORD', 'password')),
            'is_admin' => true,
            'verified' => true,
            'notifications' => [
                'year' => false,
                'sixmonth' => false,
                'month' => true,
                'week' => true,
                'day' => true,
                'expired' => true,
            ],
            'created_at' => date('Y-m-d'),
        ]);
    }
}
