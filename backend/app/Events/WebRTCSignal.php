<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
class WebRTCSignal implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $appointmentId;
    public $payload;

    /**
     * Create a new event instance.
     */
    public function __construct($appointmentId, $payload)
    {
        $this->appointmentId = $appointmentId;
        $this->payload = $payload;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PresenceChannel('meeting.' . $this->appointmentId),
        ];
    }
    
    public function broadcastAs()
    {
        return 'WebRTCSignal';
    }
}
