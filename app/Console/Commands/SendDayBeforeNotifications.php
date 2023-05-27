<?php

namespace App\Console\Commands;

use App\Mail\PatentDayBeforeExp;
use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Patent;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class SendDayBeforeNotifications extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:day-before-notifications';

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
        $this->info('Sending day-before expiration notifications...');

        // Retrieve all patents that will expire tomorrow but not patents that expired already
        $patents = Patent::whereDate('expiration_date', Carbon::today()->addDay())->get();

        // Retrieve all users that have notifications.day set to true
        $users = User::where('notifications->day', true)->get();
        // Send an email to each user with the list of patents that have expired today

        // Check if there are any patents before sending emails
        if ($patents->count() === 0) {
            $this->info('No patents found that will expire tomrrow. Exiting...');
            return;
        }

        foreach ($users as $user) {
            Mail::to($user->email)->send(new PatentDayBeforeExp($patents));
        }

        $this->info('Done!');
    }
}
