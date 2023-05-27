<?php

namespace App\Mail;

use App\Models\Patent;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PatentExpired extends Mailable
{
    use Queueable, SerializesModels;

    public $patents;
    /**
     * Create a new message instance.
     */
    public function __construct($patents,)
    {
        $this->patents = $patents;
    }

    public function build()
    {
        $count = $this->patents->count();
        $subject = "$count patent" . ($count > 1 ? 's' : '') . " expired today.";

        return $this->markdown('emails.patent-expired')
            ->subject($subject);
    }
    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
