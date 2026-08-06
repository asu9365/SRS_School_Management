<?php

namespace App\Http\Controllers;

use App\Services\PrincipalKpisService;
use Illuminate\Http\Request;

class PrincipalKpisController extends Controller
{
    protected $kpisService;

    public function __construct(PrincipalKpisService $kpisService)
    {
        $this->kpisService = $kpisService;
    }

    /**
     * Get monitored KPIs value indicators.
     * GET /api/principal/kpis
     */
    public function kpis(Request $request)
    {
        $result = $this->kpisService->getKpisList();
        return response()->json($result);
    }

    /**
     * Get compound health rating average.
     * GET /api/principal/school-health
     */
    public function schoolHealth(Request $request)
    {
        $result = $this->kpisService->getSchoolHealthIndex();
        return response()->json($result);
    }

    /**
     * Get dashboard summary overview.
     * GET /api/principal/dashboard
     */
    public function dashboard(Request $request)
    {
        $result = $this->kpisService->getDashboardSummary();
        return response()->json($result);
    }

    /**
     * Get operational checkpoints metrics status.
     * GET /api/principal/operations/metrics
     */
    public function operationsMetrics(Request $request)
    {
        $result = $this->kpisService->getOperationsMetrics();
        return response()->json($result);
    }

    /**
     * Get national and district benchmarks registers comparison.
     * GET /api/principal/benchmark
     */
    public function benchmark(Request $request)
    {
        $result = $this->kpisService->getBenchmarkStats();
        return response()->json($result);
    }

    /**
     * Get AI enrollment forecasting predictions.
     * GET /api/principal/forecast
     */
    public function forecast(Request $request)
    {
        $result = $this->kpisService->getForecast();
        return response()->json($result);
    }

    /**
     * Get warning alerts history logs listings.
     * GET /api/principal/alerts
     */
    public function alerts(Request $request)
    {
        $result = $this->kpisService->getAlerts();
        return response()->json($result);
    }
}
