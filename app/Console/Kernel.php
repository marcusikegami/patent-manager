<?php

namespace App\Console;

use App\Console\Commands\SendExpirationNotifications;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

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
        $schedule->command('send:expiration-notifications')->daily();
        $schedule->command('send:day-before-notifications')->daily();
        $schedule->command('send:week-before-notifications')->daily();
        $schedule->command('send:month-before-notifications')->daily();
        $schedule->command('send:six-months-before-notifications')->daily();
        $schedule->command('send:year-before-notifications')->daily();
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
