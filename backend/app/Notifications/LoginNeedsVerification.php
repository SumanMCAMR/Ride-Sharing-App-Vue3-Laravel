<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use NotificationChannels\Twilio\TwilioChannel;
use NotificationChannels\Twilio\TwilioSmsMessage;

class LoginNeedsVerification extends Notification
{
    use Queueable;
    public function __construct()
    {
        //
    }
    public function via($notifiable): array
    {
        return [TwilioChannel::class];
    }

    public function toTwilio($notifiable)
    {
        try {
            $loginCode = rand(111111, 999999);

            $notifiable->update([
                'login_code' => $loginCode
            ]);

            return (new TwilioSmsMessage())
                ->content("Your verification login code is {$loginCode}, Please don't share with anyone");
        } catch (\Exception $e) {
            \Log::error("Twilio SMS Error: " . $e->getMessage());
            throw $e;
        }
    }
    public function toArray(object $notifiable): array
    {
        return [

        ];
    }
}
