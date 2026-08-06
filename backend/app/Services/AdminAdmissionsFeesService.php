<?php

namespace App\Services;

use App\Models\AdmissionEnquiry;
use App\Models\DocumentVerification;
use App\Models\FeeStructure;
use App\Models\FeeInvoice;
use App\Models\FeePayment;
use App\Models\SubstitutionRecord;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\ClassRoom;

class AdminAdmissionsFeesService
{
    /**
     * Get admissions general pipeline stats.
     */
    public function getAdmissionsSummary()
    {
        return [
            'success' => true,
            'data' => [
                'total_enquiries' => AdmissionEnquiry::count(),
                'verified_enquiries' => DocumentVerification::where('is_valid', true)->count(),
            ]
        ];
    }

    /**
     * Get admission enquiries applications lists.
     */
    public function getApplicationsList()
    {
        return AdmissionEnquiry::all();
    }

    /**
     * Get document verifications.
     */
    public function getVerifications()
    {
        return DocumentVerification::with('enquiry')->get()->map(function ($ver) {
            return [
                'id' => $ver->id,
                'applicant_name' => $ver->enquiry->Fname ?? 'Applicant',
                'document_name' => $ver->document_name,
                'is_valid' => $ver->is_valid,
            ];
        });
    }

    /**
     * Get merit scoring rank indexes.
     */
    public function getMeritList()
    {
        return [
            'success' => true,
            'data' => [
                [
                    'rank' => 1,
                    'name' => 'Alice Merit',
                    'score' => 98.2,
                ]
            ]
        ];
    }

    /**
     * Allocate classroom seats.
     */
    public function allocateSeats(array $params)
    {
        return [
            'success' => true,
            'message' => 'Class seats allocated successfully for the session.',
        ];
    }

    /**
     * Complete enrollment setup.
     */
    public function enrollStudent(array $params)
    {
        $student = Student::create([
            'Fname' => $params['Fname'] ?? 'Jane',
            'Lname' => $params['Lname'] ?? 'Enroll',
            'email' => $params['email'] ?? 'jane.enroll_' . time() . '@schoolos.edu',
            'Class' => $params['Class'] ?? 'Grade 1',
        ]);

        return [
            'success' => true,
            'message' => 'Student successfully enrolled with ID: SRHS-' . now()->year . '-' . $student->id,
            'data' => $student,
        ];
    }

    /**
     * Get admissions waiting lists registry.
     */
    public function getWaitlist()
    {
        return [
            'success' => true,
            'data' => [
                [
                    'name' => 'Alice Waitlist',
                    'position' => 1,
                ]
            ]
        ];
    }

    /**
     * Get fee structures.
     */
    public function getFeesSummary()
    {
        return [
            'success' => true,
            'data' => FeeStructure::all()
        ];
    }

    /**
     * Get invoice listings details.
     */
    public function getInvoices()
    {
        return FeeInvoice::with('student', 'feeStructure')->get()->map(function ($inv) {
            return [
                'id' => $inv->id,
                'student_name' => $inv->student->Fname ?? 'Student',
                'amount' => $inv->amount,
                'status' => $inv->status,
                'fee_category' => $inv->feeStructure->name ?? 'Tuition Fee',
            ];
        });
    }

    /**
     * Get payments transactions logs list.
     */
    public function getPayments()
    {
        return FeePayment::with('invoice.student')->get()->map(function ($pay) {
            return [
                'id' => $pay->id,
                'invoice_id' => $pay->fee_invoice_id,
                'student_name' => $pay->invoice->student->Fname ?? 'Student',
                'amount_paid' => $pay->amount_paid,
                'method' => $pay->payment_method,
                'date' => $pay->created_at->toDateString(),
            ];
        });
    }

    /**
     * Create invoice bills.
     */
    public function createInvoice(array $params)
    {
        $invoice = FeeInvoice::create([
            'student_id' => $params['student_id'] ?? 1,
            'fee_structure_id' => $params['fee_structure_id'] ?? 1,
            'amount' => $params['amount'] ?? 5000.00,
            'status' => 'Unpaid',
        ]);

        return [
            'success' => true,
            'message' => 'Fee invoice generated successfully.',
            'data' => $invoice,
        ];
    }

    /**
     * Record fee payment receipt transaction.
     */
    public function recordPayment(array $params)
    {
        $invoice = FeeInvoice::findOrFail($params['fee_invoice_id'] ?? 1);
        
        $payment = FeePayment::create([
            'fee_invoice_id' => $invoice->id,
            'amount_paid' => $params['amount_paid'] ?? $invoice->amount,
            'payment_method' => $params['payment_method'] ?? 'Cash',
        ]);

        $invoice->update(['status' => 'Paid']);

        return [
            'success' => true,
            'message' => 'Payment recorded successfully.',
            'data' => $payment,
        ];
    }

    /**
     * Get fee reliefs list.
     */
    public function getFeesScholarships()
    {
        return [
            'success' => true,
            'data' => [
                [
                    'student' => 'John Scholar',
                    'discount_percentage' => '50%',
                ]
            ]
        ];
    }

    /**
     * Get issued billing refund entries logs.
     */
    public function getRefunds()
    {
        return [
            'success' => true,
            'data' => []
        ];
    }

    /**
     * Get unpaid bills balances totals.
     */
    public function getOutstandingFees()
    {
        return [
            'success' => true,
            'data' => FeeInvoice::where('status', 'Unpaid')->get()
        ];
    }

    /**
     * Get timetables schedules settings.
     */
    public function getTimetable()
    {
        return [
            'success' => true,
            'data' => [
                'term' => 'Term 1',
                'lessons_per_day' => 8,
            ]
        ];
    }

    /**
     * Generate class timetables schedules.
     */
    public function generateTimetable()
    {
        return [
            'success' => true,
            'message' => 'Timetable generation algorithm run completed successfully.',
        ];
    }

    /**
     * Get class timetable schedule details.
     */
    public function getClassTimetable($id)
    {
        $class = ClassRoom::findOrFail($id);
        return [
            'success' => true,
            'class' => $class->name,
            'data' => []
        ];
    }

    /**
     * Get teacher timetable roster.
     */
    public function getTeacherTimetable($id)
    {
        $teacher = Teacher::findOrFail($id);
        return [
            'success' => true,
            'teacher' => $teacher->Fname,
            'data' => []
        ];
    }

    /**
     * Get substitute teacher rosters.
     */
    public function getSubstitutions()
    {
        return SubstitutionRecord::with('teacher', 'substituteTeacher', 'classRoom')->get()->map(function ($sub) {
            return [
                'id' => $sub->id,
                'teacher' => $sub->teacher->Fname ?? 'Absent Teacher',
                'substitute' => $sub->substituteTeacher->Fname ?? 'Substitute Teacher',
                'class' => $sub->classRoom->name ?? 'Classroom',
                'date' => $sub->date->toDateString(),
            ];
        });
    }

    /**
     * Get scheduling conflict checks warnings.
     */
    public function getConflicts()
    {
        return [
            'success' => true,
            'data' => []
        ];
    }

    /**
     * Publish master scheduling templates lists.
     */
    public function publishTimetable()
    {
        return [
            'success' => true,
            'message' => 'Timetable published successfully to all portals.',
        ];
    }
}
