<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Services\StudentService;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    protected $studentService;

    public function __construct(StudentService $studentService)
    {
        $this->studentService = $studentService;
    }

    /**
     * List students with filtering support.
     * FR-02: Student Information System
     */
    public function index(Request $request)
    {
        $filters = $request->only(['name', 'status', 'class_room_id', 'section_id']);
        $students = $this->studentService->queryStudents($filters)->get();

        return response()->json([
            'success' => true,
            'data' => $students,
        ]);
    }

    /**
     * Create a new student.
     */
    public function store(Request $request)
    {
        $request->validate([
            'Fname' => 'required|string|max:100',
            'Lname' => 'required|string|max:100',
            'DOB' => 'required|date',
            'class' => 'required|string',
            'rollno' => 'required|string',
            'address' => 'required|string',
            'pin' => 'required|string',
            'Dist' => 'required|string',
            'State' => 'required|string',
            'blood' => 'required|string',
        ]);

        try {
            $student = $this->studentService->createStudent($request->all());

            return response()->json([
                'success' => true,
                'data' => $student->load(['guardians', 'currentClassAssignment']),
                'message' => 'Student registered successfully',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Show student details.
     */
    public function show(Student $student)
    {
        return response()->json([
            'success' => true,
            'data' => $student->load([
                'user', 'guardians', 'documents',
                'classAssignments.classRoom', 'classAssignments.section',
                'classAssignments.academicSession', 'currentClassAssignment.classRoom',
                'currentClassAssignment.section',
            ]),
        ]);
    }

    /**
     * Update student information.
     */
    public function update(Request $request, Student $student)
    {
        $updated = $this->studentService->updateStudent($student->id, $request->all());

        return response()->json([
            'success' => true,
            'message' => 'Student updated successfully.',
            'data' => $student->fresh()->load(['guardians', 'currentClassAssignment']),
        ]);
    }

    /**
     * Delete a student.
     */
    public function destroy(Student $student)
    {
        $this->studentService->deleteStudent($student->id);

        return response()->json([
            'success' => true,
            'message' => 'Student deleted successfully.',
        ]);
    }

    // --- Transfer, Promote, Archive Operations ---

    /**
     * Transfer student to a different section/class.
     * FR-02: Transfer Student
     */
    public function transfer(Request $request, Student $student)
    {
        $request->validate([
            'class_room_id' => 'required|exists:class_rooms,id',
            'section_id' => 'required|exists:sections,id',
            'roll_number' => 'nullable|string',
        ]);

        $result = $this->studentService->transferStudent($student->id, $request->only('class_room_id', 'section_id', 'roll_number'));

        if (!$result['success']) {
            return response()->json(['success' => false, 'message' => $result['message']], 422);
        }

        return response()->json([
            'success' => true,
            'message' => 'Student transferred successfully.',
            'data' => $result['student'],
        ]);
    }

    /**
     * Promote students to the next class.
     * FR-02: Promote Student
     */
    public function promote(Request $request)
    {
        $request->validate([
            'student_ids' => 'required|array',
            'student_ids.*' => 'exists:students,id',
            'target_class_room_id' => 'required|exists:class_rooms,id',
            'target_section_id' => 'required|exists:sections,id',
            'target_session_id' => 'required|exists:academic_sessions,id',
        ]);

        $result = $this->studentService->promoteStudents(
            $request->student_ids,
            $request->target_class_room_id,
            $request->target_section_id,
            $request->target_session_id
        );

        return response()->json([
            'success' => true,
            'message' => "{$result['count']} students promoted successfully.",
        ]);
    }

    /**
     * Archive a student (mark as archived/alumni).
     * FR-02: Archive Student, Alumni Conversion
     */
    public function archive(Request $request, Student $student)
    {
        $request->validate([
            'status' => 'required|in:archived,alumni,transferred',
            'leaving_date' => 'nullable|date',
            'leaving_reason' => 'nullable|string',
        ]);

        $result = $this->studentService->archiveStudent($student->id, $request->only('status', 'leaving_date', 'leaving_reason'));

        if (!$result['success']) {
            return response()->json(['success' => false, 'message' => $result['message']], 422);
        }

        return response()->json([
            'success' => true,
            'message' => 'Student status updated to ' . $request->status . '.',
            'data' => $result['student'],
        ]);
    }

    // --- Guardian Management ---

    /**
     * Add a guardian to a student.
     */
    public function addGuardian(Request $request, Student $student)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'relation' => 'required|in:Father,Mother,Guardian,Uncle,Aunt,Grandparent,Other',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email',
            'is_primary' => 'boolean',
        ]);

        $result = $this->studentService->addGuardian($student->id, $request->all());

        if (!$result['success']) {
            return response()->json(['success' => false, 'message' => $result['message']], 422);
        }

        return response()->json([
            'success' => true,
            'message' => 'Guardian added successfully.',
            'data' => $result['guardian'],
        ], 201);
    }

    // --- Document Management ---

    /**
     * Upload a document for a student.
     */
    public function uploadDocument(Request $request, Student $student)
    {
        $request->validate([
            'file' => 'required|file|max:10240', // 10MB max
            'type' => 'required|string',
            'title' => 'required|string|max:200',
            'notes' => 'nullable|string',
        ]);

        $result = $this->studentService->uploadDocument(
            $student->id,
            $request->file('file'),
            $request->only('type', 'title', 'notes')
        );

        if (!$result['success']) {
            return response()->json(['success' => false, 'message' => $result['message']], 422);
        }

        return response()->json([
            'success' => true,
            'message' => 'Document uploaded successfully.',
            'data' => $result['document'],
        ], 201);
     }

    /**
     * Get timeline events for student.
     */
    public function timeline(Student $student)
    {
        $timeline = $this->studentService->getTimeline($student->id);

        return response()->json([
            'success' => true,
            'data' => $timeline,
        ]);
    }
}


