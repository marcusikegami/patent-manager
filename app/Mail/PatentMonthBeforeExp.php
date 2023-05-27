<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PatentMonthBeforeExp extends Mailable
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
        $subject = "$count patent" . ($count > 1 ? 's' : '') . " will expire in one month.";

        return $this->markdown('emails.patent-month-before-expiration')
            ->subject($subject);
    }
}
