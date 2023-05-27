<?php

namespace App\Console\Commands;

use App\Mail\PatentExpired;
use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Patent;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class SendExpirationNotifications extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:expiration-notifications';

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
        $this->info('Sending expiration notifications...');

        // Retrieve all patents that have expired today but not patents that expired before today
        $patents = Patent::whereDate('expiration_date', Carbon::today())->get();
        // Retrieve all users that have notifications.expired set to true
        $users = User::where('notifications->expired', true)->get();
        // Send an email to each user with the list of patents that have expired today

        // Check if there are any patents before sending emails
        if ($patents->count() === 0) {
            $this->info('No patents found that will expire today. Exiting...');
            return;
        }

        foreach ($users as $user) {
            Mail::to($user->email)->send(new PatentExpired($patents));
        }

        $this->info('Done!');
    }
}
