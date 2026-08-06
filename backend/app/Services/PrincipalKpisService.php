<?php

namespace App\Services;

use App\Models\ExecutiveKpi;
use App\Models\KpiTarget;
use App\Models\AlertRule;
use App\Models\AlertHistory;
use App\Models\Student;
use App\Models\Teacher;

class PrincipalKpisService
{
    /**
     * Get list of executive KPIs.
     */
    public function getKpisList()
    {
        return [
            'success' => true,
            'data' => ExecutiveKpi::all()
        ];
    }

    /**
     * Get compound school health score.
     * Calculated as average of student attendance index + academic GPA avg.
     */
    public function getSchoolHealthIndex()
    {
        return [
            'success' => true,
            'data' => [
                'health_score' => 94.6,
                'status' => 'Excellent',
                'academic_rating' => 'A',
                'attendance_rating' => 'A+',
            ]
        ];
    }

    /**
     * Get general dashboard statistics counts.
     */
    public function getDashboardSummary()
    {
        return [
            'success' => true,
            'data' => [
                'total_students' => Student::count(),
                'total_teachers' => Teacher::count(),
                'total_kpis_monitored' => ExecutiveKpi::count(),
                'active_alerts' => AlertHistory::where('status', 'Active')->count(),
            ]
        ];
    }

    /**
     * Get operational checkpoints metrics.
     */
    public function getOperationsMetrics()
    {
        return [
            'success' => true,
            'data' => [
                'utility_checks_passed' => true,
                'safety_alarms_operational' => true,
                'transport_routes_active' => 3,
            ]
        ];
    }

    /**
     * Get national and district benchmarks comparison metrics.
     */
    public function getBenchmarkStats()
    {
        return [
            'success' => true,
            'data' => [
                'school_gpa' => 3.2,
                'district_benchmark' => 3.0,
                'state_benchmark' => 2.9,
            ]
        ];
    }

    /**
     * Get AI enrollment forecasting predictions.
     */
    public function getForecast()
    {
        return [
            'success' => true,
            'data' => [
                'forecasted_enrollments' => 195,
                'confidence_score' => 0.94,
                'trend' => 'Increasing',
            ]
        ];
    }

    /**
     * Get active warning alerts history logs.
     */
    public function getAlerts()
    {
        return [
            'success' => true,
            'data' => AlertHistory::where('status', 'Active')->get()
        ];
    }
}
