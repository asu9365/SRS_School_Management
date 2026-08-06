<?php

namespace App\Http\Controllers;

use App\Services\CommunicationService;
use App\Repositories\AppointmentRepository;
use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    protected $communicationService;
    protected $appointmentRepository;

    public function __construct(
        CommunicationService $communicationService,
        AppointmentRepository $appointmentRepository
    ) {
        $this->communicationService = $communicationService;
        $this->appointmentRepository = $appointmentRepository;
    }

    /**
     * Get bookings.
     */
    public function index(Request $request)
    {
        $filters = $request->only(['parent_id', 'teacher_id', 'status']);
        $records = $this->appointmentRepository->getFilteredAppointments($filters);

        return response()->json([
            'success' => true,
            'data' => $records,
        ]);
    }

    /**
     * Submit booking request.
     */
    public function store(Request $request)
    {
        $request->validate([
            'teacher_id' => 'required|exists:teachers,id',
            'scheduled_at' => 'required|date',
            'meeting_mode' => 'nullable|in:offline,online,telephone',
            'student_name' => 'nullable|string|max:255',
        ]);

        $result = $this->communicationService->schedulePTM($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Appointment booked successfully.',
            'data' => $result['data'],
        ], 201);
    }

    /**
     * Approve or reject meeting request.
     */
    public function approve(Request $request, Appointment $appointment)
    {
        $request->validate([
            'status' => 'required|in:Approved,Rejected,Completed',
            'notes' => 'nullable|string',
        ]);

        $result = $this->communicationService->handlePTMDecision($appointment->id, $request->status, $request->notes);

        if ($result['data']->parent_id && $request->status === 'Approved') {
            $meetingLink = '/meeting/' . $appointment->id . '-' . bin2hex(random_bytes(4));
            $result['data']->update(['meeting_link' => $meetingLink]);

            $notification = \App\Models\Notification::create([
                'user_id' => $appointment->parent_id,
                'type' => 'ptm_approved',
                'data' => [
                    'title' => 'PTM Approved',
                    'body' => 'Your Parent-Teacher Meeting has been scheduled.',
                    'link' => $meetingLink
                ]
            ]);
            
            broadcast(new \App\Events\NotificationSent($notification));
        }

        return response()->json([
            'success' => true,
            'data' => $result['data']
        ]);
    }

    /**
     * View details.
     */
    public function show(Appointment $appointment)
    {
        return response()->json([
            'success' => true,
            'data' => $appointment->load(['teacher', 'parent', 'actionItemsRelation'])
        ]);
    }

    /**
     * Save PTM notes, actions, and push timeline status updates.
     */
    public function saveNotes(Request $request, Appointment $appointment)
    {
        $request->validate([
            'notes' => 'required|string',
            'action_items' => 'nullable|array',
            'action_items.*.description' => 'required|string',
            'action_items.*.status' => 'required|in:pending,completed'
        ]);

        $result = $this->communicationService->recordPTMNotes($appointment->id, $request->only('notes', 'action_items'));

        if (!$result['success']) {
            return response()->json(['success' => false, 'message' => $result['message']], 400);
        }

        if ($request->has('action_items')) {
            $appointment->actionItemsRelation()->delete();
            foreach ($request->action_items as $item) {
                $appointment->actionItemsRelation()->create($item);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Meeting notes recorded successfully.',
            'data' => $appointment->load('actionItemsRelation')
        ]);
    }

    /**
     * Signal connection payload.
     */
    public function signal(Request $request, Appointment $appointment)
    {
        $request->validate([
            'payload' => 'required|array'
        ]);

        broadcast(new \App\Events\WebRTCSignal($appointment->id, $request->payload));

        return response()->json([
            'success' => true,
            'message' => 'Signal sent'
        ]);
    }
}
