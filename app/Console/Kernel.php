<?php

namespace App\Console;

use App\Console\Commands\SendExpirationNotifications;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use DateTimeZone;

class Kernel extends ConsoleKernel
{
    protected $commands = [
        SendExpirationNotifications::class,
    ];
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('send:expiration-notifications')->dailyAt('06:00');
        $schedule->command('send:day-before-notifications')->dailyAt('06:00');
        $schedule->command('send:week-before-notifications')->dailyAt('06:00');
        $schedule->command('send:month-before-notifications')->dailyAt('06:00');
        $schedule->command('send:six-months-before-notifications')->dailyAt('06:00');
        $schedule->command('send:year-before-notifications')->dailyAt('06:00');
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
