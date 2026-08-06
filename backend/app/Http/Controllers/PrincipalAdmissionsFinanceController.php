<?php

namespace App\Http\Controllers;

use App\Services\PrincipalAdmissionsFinanceService;
use Illuminate\Http\Request;

class PrincipalAdmissionsFinanceController extends Controller
{
    protected $admissionsFinanceService;

    public function __construct(PrincipalAdmissionsFinanceService $admissionsFinanceService)
    {
        $this->admissionsFinanceService = $admissionsFinanceService;
    }

    /**
     * Get admissions general pipeline stats.
     * GET /api/principal/admissions
     */
    public function admissionsSummary(Request $request)
    {
        $result = $this->admissionsFinanceService->getAdmissionsSummary();
        return response()->json($result);
    }

    /**
     * Get admission enquiries applications lists.
     * GET /api/principal/admissions/applications
     */
    public function applicationsList(Request $request)
    {
        $result = $this->admissionsFinanceService->getApplicationsList();
        return response()->json($result);
    }

    /**
     * Get classroom filled capacity vs vacancies.
     * GET /api/principal/admissions/seats
     */
    public function seatsMatrix(Request $request)
    {
        $result = $this->admissionsFinanceService->getSeatsMatrix();
        return response()->json($result);
    }

    /**
     * Get merit scoring rank index lists.
     * GET /api/principal/admissions/merit-list
     */
    public function meritList(Request $request)
    {
        $result = $this->admissionsFinanceService->getMeritList();
        return response()->json($result);
    }

    /**
     * Get admissions scholarship applications list.
     * GET /api/principal/admissions/scholarships
     */
    public function scholarshipsList(Request $request)
    {
        $result = $this->admissionsFinanceService->getAdmissionsScholarships();
        return response()->json($result);
    }

    /**
     * Get AI enrollment forecasting insights.
     * GET /api/principal/admissions/ai
     */
    public function admissionsAi(Request $request)
    {
        $result = $this->admissionsFinanceService->getAdmissionsAiForecast();
        return response()->json($result);
    }

    /**
     * Get enrollment targets trends.
     * GET /api/principal/admissions/enrollment
     */
    public function enrollment(Request $request)
    {
        $result = $this->admissionsFinanceService->getEnrollmentsTrend();
        return response()->json($result);
    }

    /**
     * Get general finance overview KPIs.
     * GET /api/principal/finance
     */
    public function financeSummary(Request $request)
    {
        $result = $this->admissionsFinanceService->getFinanceSummary();
        return response()->json($result);
    }

    /**
     * Get fee categories lists.
     * GET /api/principal/finance/revenue
     */
    public function revenue(Request $request)
    {
        $result = $this->admissionsFinanceService->getRevenueSummary();
        return response()->json($result);
    }

    /**
     * Get department budget expenditures allocations.
     * GET /api/principal/finance/budget
     */
    public function budget(Request $request)
    {
        $result = $this->admissionsFinanceService->getBudgetSummary();
        return response()->json($result);
    }

    /**
     * Get open purchase procurement list.
     * GET /api/principal/finance/expenses
     */
    public function expenses(Request $request)
    {
        $result = $this->admissionsFinanceService->getExpensesSummary();
        return response()->json($result);
    }

    /**
     * Get staff payout statistics details.
     * GET /api/principal/finance/payroll
     */
    public function payroll(Request $request)
    {
        $result = $this->admissionsFinanceService->getPayrollSummary();
        return response()->json($result);
    }

    /**
     * Get financial scholarship applications.
     * GET /api/principal/finance/scholarships
     */
    public function financeScholarships(Request $request)
    {
        $result = $this->admissionsFinanceService->getAdmissionsScholarships();
        return response()->json($result);
    }

    /**
     * Get financial forecasting models.
     * GET /api/principal/finance/forecast
     */
    public function financeForecast(Request $request)
    {
        $result = $this->admissionsFinanceService->getFinanceForecast();
        return response()->json($result);
    }

    /**
     * Get AI financial insights advice.
     * GET /api/principal/finance/ai
     */
    public function financeAi(Request $request)
    {
        $result = $this->admissionsFinanceService->getFinanceAiInsights();
        return response()->json($result);
    }
}
