<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PatentWeekBeforeExp extends Mailable
{
    use Queueable, SerializesModels;

    public $patents;
    /**
     * Create a new message instance.
     */
    public function __construct($patents)
    {
        $this->patents = $patents;
    }

    public function build()
    {
        $count = $this->patents->count();
        $subject = "$count patent" . ($count > 1 ? 's' : '') . " will expire next week.";

        return $this->markdown('emails.patent-week-before-expiration')
            ->subject($subject);
    }
}
