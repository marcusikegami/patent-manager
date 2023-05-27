<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Console\Scheduling\Schedule;

class sendAllExpirationEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:all-expiration-emails';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(Schedule $schedule)
    {
        // execute Commands/SendExpirationNotifications
        $this->call('send:expiration-notifications');
        $this->call('send:day-before-notifications');
        $this->call('send:week-before-notifications');
        $this->call('send:month-before-notifications');
        $this->call('send:six-months-before-notifications');
        $this->call('send:year-before-notifications');
    }
}
