<?php

namespace App\Console\Commands;

use App\Mail\PatentYearBeforeExp;
use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Patent;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class SendYearBeforeNotifications extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:year-before-notifications';

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
        $this->info('Sending year-before expiration notifications...');

        // Retrieve all patents that will expire one year from today
        $expirationDate = Carbon::today()->addYear()->toDateString();
        $patents = Patent::whereDate('expiration_date', $expirationDate)->get();

        // Retrieve all users that have notifications.year set to true
        $users = User::where('notifications->year', true)->get();

        // Check if there are any patents before sending emails
        if ($patents->count() === 0) {
            $this->info('No patents found that will expire one year from today. Exiting...');
            return;
        }

        // Send an email to each user with the list of patents that will expire in a year
        foreach ($users as $user) {
            Mail::to($user->email)->send(new PatentYearBeforeExp($patents));
        }

        $this->info('Done!');
    }
}
