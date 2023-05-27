<?php

namespace App\Console\Commands;

use App\Mail\PatentMonthBeforeExp;
use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Patent;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class SendMonthBeforeNotifications extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:month-before-notifications';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Sending month-before expiration notifications...');

        // Retrieve all patents that will expire in one month from today
        $patents = Patent::whereDate('expiration_date', Carbon::today()->addMonth())->get();

        // Retrieve all users that have notifications.month set to true
        $users = User::where('notifications->month', true)->get();
        // Send an email to each user with the list of patents that have expired today

        // Check if there are any patents before sending emails
        if ($patents->count() === 0) {
            $this->info('No patents found that will expire one month from today. Exiting...');
            return;
        }

        foreach ($users as $user) {
            Mail::to($user->email)->send(new PatentMonthBeforeExp($patents));
        }

        $this->info('Done!');
    }
}
