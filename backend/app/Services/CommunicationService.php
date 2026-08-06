<?php

namespace App\Services;

use App\Repositories\NoticeRepository;
use App\Repositories\AppointmentRepository;
use App\Models\Student;

class CommunicationService
{
    protected $noticeRepository;
    protected $appointmentRepository;
    protected $timelineService;

    public function __construct(
        NoticeRepository $noticeRepository,
        AppointmentRepository $appointmentRepository,
        TimelineService $timelineService
    ) {
        $this->noticeRepository = $noticeRepository;
        $this->appointmentRepository = $appointmentRepository;
        $this->timelineService = $timelineService;
    }

    /**
     * Publish a new official notice / circular.
     */
    public function createNotice(array $data)
    {
        $notice = $this->noticeRepository->create([
            'title' => $data['title'],
            'content' => $data['content'],
            'category' => $data['category'] ?? 'general',
            'priority' => $data['priority'] ?? 'medium',
            'target_roles' => $data['target_roles'] ?? ['all'],
            'publish_date' => $data['publish_date'] ?? now(),
            'expiry_date' => $data['expiry_date'] ?? null,
            'attachment_path' => $data['attachment_path'] ?? null,
            'school_id' => auth()->user()->school_id ?? null,
        ]);

        return ['success' => true, 'data' => $notice];
    }

    /**
     * Book a new Parent-Teacher Meeting (PTM) Appointment.
     */
    public function schedulePTM(array $data)
    {
        $ptm = $this->appointmentRepository->create([
            'parent_id' => auth()->id(),
            'teacher_id' => $data['teacher_id'],
            'scheduled_at' => $data['scheduled_at'],
            'meeting_mode' => $data['meeting_mode'] ?? 'offline',
            'status' => 'Pending',
            'school_id' => auth()->user()->school_id ?? null,
            // Legacy / backup properties
            'SName' => $data['student_name'] ?? null,
            'GName' => auth()->user()->name,
            'number' => auth()->user()->phone ?? null,
        ]);

        return ['success' => true, 'data' => $ptm];
    }

    /**
     * Approve or reject a PTM booking request.
     */
    public function handlePTMDecision($ptmId, string $status, string $notes = null)
    {
        $ptm = $this->appointmentRepository->find($ptmId);
        if (!$ptm) {
            return ['success' => false, 'message' => 'PTM request not found.'];
        }

        $ptm->update([
            'status' => $status,
            'notes' => $notes ?? $ptm->notes,
        ]);

        return ['success' => true, 'data' => $ptm];
    }

    /**
     * Record PTM meeting notes and action items.
     * Links automatically to Student 360 timeline.
     */
    public function recordPTMNotes($ptmId, array $data)
    {
        $ptm = $this->appointmentRepository->find($ptmId);
        if (!$ptm) {
            return ['success' => false, 'message' => 'PTM record not found.'];
        }

        $ptm->update([
            'status' => 'Completed',
            'notes' => $data['notes'],
            'action_items' => $data['action_items'] ?? null,
        ]);

        // Find student associated with the parent
        $student = Student::where('user_id', $ptm->parent_id)
            ->orWhereHas('guardians', function ($q) use ($ptm) {
                $q->where('user_id', $ptm->parent_id);
            })
            ->first();

        if ($student) {
            $this->timelineService->logEvent(
                $student->id,
                'ptm',
                'PTM Conducted',
                "PTM completed. Mode: " . ucfirst($ptm->meeting_mode) . ". Notes: {$data['notes']}."
            );
        }

        return ['success' => true, 'data' => $ptm];
    }
}
