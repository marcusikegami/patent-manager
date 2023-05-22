<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Facades\Auth;


class EmailController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function sendWelcomeEmail($user, $temporaryPassword)
    {
        try {
            Mail::to($user->email)->send(new WelcomeEmail($user, $temporaryPassword));
            return response()->json(['message' => 'Welcome email sent successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to send welcome email.'], 500);
        }
    }
}
