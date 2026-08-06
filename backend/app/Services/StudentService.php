<?php

namespace App\Services;

use App\Repositories\StudentRepository;
use App\Models\StudentClassAssignment;
use App\Models\AcademicSession;
use Illuminate\Support\Facades\Storage;
use App\Events\StudentRegistered;

class StudentService
{
    protected $studentRepository;
    protected $timelineService;

    public function __construct(StudentRepository $studentRepository, TimelineService $timelineService)
    {
        $this->studentRepository = $studentRepository;
        $this->timelineService = $timelineService;
    }

    /**
     * Get students query builder.
     */
    public function queryStudents(array $filters)
    {
        return $this->studentRepository->getStudentsQuery($filters);
    }

    /**
     * Create student profile and manage class assignments and guardians.
     */
    public function createStudent(array $data)
    {
        $student = $this->studentRepository->create($data);

        // Generate standard Student ID: SRHS-YYYY-00000X
        $year = now()->format('Y');
        $studentIdString = 'SRHS-' . $year . '-' . str_pad($student->id, 6, '0', STR_PAD_LEFT);
        
        $student->update([
            'admission_number' => $studentIdString,
        ]);

        // Add guardians if provided
        if (!empty($data['guardians'])) {
            foreach ($data['guardians'] as $guardian) {
                $student->guardians()->create($guardian);
            }
        }

        // Handle assignment to class/section
        if (!empty($data['class_room_id']) && !empty($data['section_id'])) {
            $currentSession = AcademicSession::current()->first();
            if ($currentSession) {
                StudentClassAssignment::create([
                    'student_id' => $student->id,
                    'class_room_id' => $data['class_room_id'],
                    'section_id' => $data['section_id'],
                    'academic_session_id' => $currentSession->id,
                    'roll_number' => $data['rollno'] ?? null,
                ]);
            }
        }

        // Log Admission Event in Timeline
        $this->timelineService->logEvent(
            $student->id,
            'admission',
            'Student Admitted',
            "Student registration profile created under ID: {$studentIdString}."
        );

        // Dispatch StudentRegistered Event
        event(new StudentRegistered($student));

        return $student;
    }

    /**
     * Update student profile.
     */
    public function updateStudent($id, array $data)
    {
        $student = $this->studentRepository->update($id, $data);
        if ($student) {
            $this->timelineService->logEvent(
                $student->id,
                'profile',
                'Profile Updated',
                'Student personal information details updated.'
            );
        }
        return $student;
    }

    /**
     * Delete student profile.
     */
    public function deleteStudent($id)
    {
        return $this->studentRepository->delete($id);
    }

    /**
     * Transfer student to different section/class.
     */
    public function transferStudent($studentId, array $data)
    {
        $student = $this->studentRepository->find($studentId);
        if (!$student) {
            return ['success' => false, 'message' => 'Student not found.'];
        }

        $currentSession = AcademicSession::current()->first();
        if (!$currentSession) {
            return ['success' => false, 'message' => 'No active academic session.'];
        }

        StudentClassAssignment::updateOrCreate(
            [
                'student_id' => $student->id,
                'academic_session_id' => $currentSession->id,
            ],
            [
                'class_room_id' => $data['class_room_id'],
                'section_id' => $data['section_id'],
                'roll_number' => $data['roll_number'] ?? null,
            ]
        );

        // Log Transfer Event in Timeline
        $classRoom = \App\Models\ClassRoom::find($data['class_room_id']);
        $section = \App\Models\Section::find($data['section_id']);
        $className = $classRoom ? $classRoom->name : '';
        $sectName = $section ? $section->name : '';

        $this->timelineService->logEvent(
            $student->id,
            'transfer',
            'Class Transfer',
            "Transferred internally to Class: {$className} - Section: {$sectName}."
        );

        return ['success' => true, 'student' => $student->load('currentClassAssignment.classRoom', 'currentClassAssignment.section')];
    }

    /**
     * Promote multiple students to new class/session.
     */
    public function promoteStudents(array $studentIds, $targetClassRoomId, $targetSectionId, $targetSessionId)
    {
        $promoted = 0;
        $classRoom = \App\Models\ClassRoom::find($targetClassRoomId);
        $section = \App\Models\Section::find($targetSectionId);
        $className = $classRoom ? $classRoom->name : '';
        $sectName = $section ? $section->name : '';

        foreach ($studentIds as $studentId) {
            StudentClassAssignment::create([
                'student_id' => $studentId,
                'class_room_id' => $targetClassRoomId,
                'section_id' => $targetSectionId,
                'academic_session_id' => $targetSessionId,
            ]);
            $promoted++;

            // Log Promotion Event in Timeline
            $this->timelineService->logEvent(
                $studentId,
                'promotion',
                'Academic Promotion',
                "Promoted to Class: {$className} - Section: {$sectName}."
            );
        }

        return ['success' => true, 'count' => $promoted];
    }

    /**
     * Archive/Graduate student.
     */
    public function archiveStudent($studentId, array $data)
    {
        $student = $this->studentRepository->find($studentId);
        if (!$student) {
            return ['success' => false, 'message' => 'Student not found.'];
        }

        $student->update([
            'status' => $data['status'],
            'leaving_date' => $data['leaving_date'] ?? now(),
            'leaving_reason' => $data['leaving_reason'] ?? null,
        ]);

        // Log Status change in Timeline
        $this->timelineService->logEvent(
            $student->id,
            'status',
            'Status Changed',
            "Student status changed to: " . ucfirst($data['status']) . ". Reason: " . ($data['leaving_reason'] ?? 'N/A')
        );

        return ['success' => true, 'student' => $student];
    }

    /**
     * Add student guardian.
     */
    public function addGuardian($studentId, array $data)
    {
        $student = $this->studentRepository->find($studentId);
        if (!$student) {
            return ['success' => false, 'message' => 'Student not found.'];
        }

        if (!empty($data['is_primary']) && $data['is_primary']) {
            $student->guardians()->update(['is_primary' => false]);
        }

        $guardian = $student->guardians()->create($data);

        return ['success' => true, 'guardian' => $guardian];
    }

    /**
     * Upload document for a student.
     */
    public function uploadDocument($studentId, $file, array $metaData)
    {
        $student = $this->studentRepository->find($studentId);
        if (!$student) {
            return ['success' => false, 'message' => 'Student not found.'];
        }

        $path = $file->store('student-documents/' . $student->id, 'public');

        $document = $student->documents()->create([
            'type' => $metaData['type'],
            'title' => $metaData['title'],
            'file_path' => $path,
            'file_name' => $file->getClientOriginalName(),
            'file_size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
            'notes' => $metaData['notes'] ?? null,
            'uploaded_by' => auth()->id(),
        ]);

        // Log Document event in Timeline
        $this->timelineService->logEvent(
            $student->id,
            'document',
            'Document Uploaded',
            "Uploaded document: {$metaData['title']} (Type: " . str_replace('_', ' ', $metaData['type']) . ")."
        );

        return ['success' => true, 'document' => $document];
    }

    /**
     * Fetch timeline events for a student.
     */
    public function getTimeline($studentId)
    {
        return $this->timelineService->getTimeline($studentId);
    }
}
