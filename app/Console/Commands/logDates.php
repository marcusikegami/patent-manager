<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;

class logDates extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:log-dates';

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
        logger(Carbon::today());
        logger(Carbon::today()->addDay());
        logger(Carbon::today()->addWeek());
        logger(Carbon::today()->addMonth());
        logger(Carbon::today()->addMonths(6));
        logger(Carbon::today()->addYear());
    }
}
