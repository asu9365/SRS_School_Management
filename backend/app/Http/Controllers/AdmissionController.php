<?php

namespace App\Http\Controllers;

use App\Models\AdmissionEnquiry;
use App\Services\StudentService;
use App\Repositories\AdmissionEnquiryRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdmissionController extends Controller
{
    protected $studentService;
    protected $enquiryRepository;

    public function __construct(StudentService $studentService, AdmissionEnquiryRepository $enquiryRepository)
    {
        $this->studentService = $studentService;
        $this->enquiryRepository = $enquiryRepository;
    }

    /**
     * Submit admission enquiry or application form.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'date_of_birth' => 'required|date',
            'gender' => 'required|string',
            'class_room_id' => 'required|exists:class_rooms,id',
            'guardian_name' => 'required|string|max:100',
            'guardian_phone' => 'required|string|max:20',
            'guardian_email' => 'required|email',
            'notes' => 'nullable|string',
        ]);

        $enquiry = $this->enquiryRepository->create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Admission enquiry submitted successfully.',
            'data' => $enquiry,
        ], 201);
    }

    /**
     * Get admission enquiries.
     */
    public function index(Request $request)
    {
        $filters = $request->only(['status', 'class_room_id']);
        $enquiries = $this->enquiryRepository->getEnquiries($filters);

        return response()->json([
            'success' => true,
            'data' => $enquiries,
        ]);
    }

    /**
     * Approve admission application -> Provisons Student Profile & ID.
     */
    public function approve(Request $request, $id)
    {
        $enquiry = $this->enquiryRepository->find($id);

        if (!$enquiry) {
            return response()->json(['success' => false, 'message' => 'Enquiry not found.'], 404);
        }

        if ($enquiry->status === 'approved') {
            return response()->json(['success' => false, 'message' => 'Enquiry already approved.'], 400);
        }

        try {
            DB::beginTransaction();

            // Update enquiry status
            $enquiry->update(['status' => 'approved']);

            // Create student record
            $student = $this->studentService->createStudent([
                'Fname' => $enquiry->first_name,
                'Lname' => $enquiry->last_name,
                'DOB' => $enquiry->date_of_birth->toDateString(),
                'gender' => $enquiry->gender,
                'class_room_id' => $enquiry->class_room_id,
                'section_id' => $request->section_id ?? 1, // Default Section A
                'rollno' => $request->roll_number ?? '001',
                'class' => $enquiry->classRoom->name ?? '1',
                'address' => $request->address ?? 'N/A',
                'pin' => $request->pin ?? 'N/A',
                'Dist' => $request->district ?? 'N/A',
                'State' => $request->state ?? 'N/A',
                'blood' => $request->blood_group ?? 'O+',
                'guardians' => [
                    [
                        'name' => $enquiry->guardian_name,
                        'relation' => 'Guardian',
                        'phone' => $enquiry->guardian_phone,
                        'email' => $enquiry->guardian_email,
                        'is_primary' => true,
                    ]
                ]
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Admission application approved and student profile provisioned successfully.',
                'data' => $student->load('currentClassAssignment'),
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Reject enquiry.
     */
    public function reject(Request $request, $id)
    {
        $enquiry = $this->enquiryRepository->find($id);

        if (!$enquiry) {
            return response()->json(['success' => false, 'message' => 'Enquiry not found.'], 404);
        }

        $enquiry->update([
            'status' => 'rejected',
            'notes' => $request->notes ?? $enquiry->notes,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Enquiry rejected successfully.',
            'data' => $enquiry,
        ]);
    }
}
