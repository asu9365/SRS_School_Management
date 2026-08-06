<?php

namespace App\Services;

use App\Models\AdmissionCycle;
use App\Models\SeatMatrix;
use App\Models\ScholarshipApplication;
use App\Models\FeeCategory;
use App\Models\BudgetAllocation;
use App\Models\ProcurementRequest;
use App\Models\AdmissionEnquiry;

class PrincipalAdmissionsFinanceService
{
    /**
     * Get overall admissions status.
     */
    public function getAdmissionsSummary()
    {
        $cycle = AdmissionCycle::where('status', 'Active')->first();
        
        return [
            'success' => true,
            'data' => [
                'current_cycle' => $cycle ? $cycle->session_name : '2026-2027 Session',
                'target_enrollments' => 200,
                'total_enquiries' => AdmissionEnquiry::count(),
                'total_applications' => AdmissionEnquiry::where('status', 'Approved')->count(),
                'conversion_rate' => '42.5%',
            ]
        ];
    }

    /**
     * Get lists of registered applications.
     */
    public function getApplicationsList()
    {
        return [
            'success' => true,
            'data' => AdmissionEnquiry::all()
        ];
    }

    /**
     * Get class vacancies counts.
     */
    public function getSeatsMatrix()
    {
        return [
            'success' => true,
            'data' => SeatMatrix::with('classRoom')->get()->map(function ($seat) {
                return [
                    'id' => $seat->id,
                    'class_name' => $seat->classRoom->name ?? 'Classroom',
                    'capacity' => $seat->capacity,
                    'filled_seats' => $seat->filled_seats,
                    'available_seats' => $seat->capacity - $seat->filled_seats,
                ];
            })
        ];
    }

    /**
     * Get mock lists of merit lists scoring.
     */
    public function getMeritList()
    {
        return [
            'success' => true,
            'data' => [
                [
                    'rank' => 1,
                    'applicant' => 'Alice Smith',
                    'score' => '98.5%',
                    'status' => 'Shortlisted',
                ],
                [
                    'rank' => 2,
                    'applicant' => 'Bob Johnson',
                    'score' => '96.2%',
                    'status' => 'Shortlisted',
                ]
            ]
        ];
    }

    /**
     * Get admissions scholarship applications lists.
     */
    public function getAdmissionsScholarships()
    {
        return [
            'success' => true,
            'data' => ScholarshipApplication::all()->map(function ($sch) {
                return [
                    'id' => $sch->id,
                    'student_name' => $sch->student->Fname ?? 'Student',
                    'scholarship_name' => $sch->name,
                    'amount' => $sch->amount,
                    'status' => $sch->status,
                ];
            })
        ];
    }

    /**
     * Get AI observations regarding admissions enrollment forecasting.
     */
    public function getAdmissionsAiForecast()
    {
        return [
            'success' => true,
            'data' => [
                'forecast' => 'Admissions enrollment is trending positive. Filled seats projection is 92% capacity across primary levels.',
            ]
        ];
    }

    /**
     * Get registered enrollments trends logs.
     */
    public function getEnrollmentsTrend()
    {
        return [
            'success' => true,
            'data' => [
                'current_enrolled_count' => 184,
                'target_enrolled_count' => 200,
            ]
        ];
    }

    /**
     * Get overall financial governance dashboard.
     */
    public function getFinanceSummary()
    {
        return [
            'success' => true,
            'data' => [
                'total_revenue' => 1250000.00,
                'total_expenses' => 840000.00,
                'net_surplus' => 410000.00,
                'fiscal_health' => 'Healthy',
            ]
        ];
    }

    /**
     * Get billing invoices categories.
     */
    public function getRevenueSummary()
    {
        return [
            'success' => true,
            'data' => FeeCategory::all()
        ];
    }

    /**
     * Get department budget allocations spent details.
     */
    public function getBudgetSummary()
    {
        return [
            'success' => true,
            'data' => BudgetAllocation::all()
        ];
    }

    /**
     * Get open procurement purchase requests list.
     */
    public function getExpensesSummary()
    {
        return [
            'success' => true,
            'data' => ProcurementRequest::all()
        ];
    }

    /**
     * Get payroll monthly expenses.
     */
    public function getPayrollSummary()
    {
        return [
            'success' => true,
            'data' => [
                'monthly_payroll_amount' => 480000.00,
                'status' => 'Disbursed',
                'payout_date' => now()->startOfMonth()->toDateString(),
            ]
        ];
    }

    /**
     * Get financial forecasts forecasting.
     */
    public function getFinanceForecast()
    {
        return [
            'success' => true,
            'data' => [
                'cash_flow_projection_next_month' => 450000.00,
                'trend' => 'Stable',
            ]
        ];
    }

    /**
     * Get AI finance suggestions.
     */
    public function getFinanceAiInsights()
    {
        return [
            'success' => true,
            'data' => [
                'insight' => 'Net surplus is healthy. Recommend allocating 10% of remaining budget to Science laboratory equipment purchases.',
            ]
        ];
    }
}
