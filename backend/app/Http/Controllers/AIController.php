<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AIService;
use App\Models\Appointment;

class AIController extends Controller
{
    protected $aiService;

    public function __construct(AIService $aiService)
    {
        $this->aiService = $aiService;
    }

    private function getStudentData($studentId)
    {
        // Re-use the logic from Student360Controller, or simply instantiate it
        $controller = new Student360Controller();
        $response = $controller->show($studentId);
        return $response->getData(true)['data'];
    }

    public function getInsights(Request $request, $studentId)
    {
        $data = $this->getStudentData($studentId);
        $insights = $this->aiService->predictRisk($data);
        return response()->json(['success' => true, 'data' => $insights]);
    }

    public function generateReportComment(Request $request, $studentId)
    {
        $data = $this->getStudentData($studentId);
        $comment = $this->aiService->generateReportComment($data);
        return response()->json(['success' => true, 'data' => $comment]);
    }

    public function summarizePTM(Request $request, $appointmentId)
    {
        $appointment = Appointment::with('actionItems')->findOrFail($appointmentId);
        // Only teachers or participants should technically access this, handled by middleware generally
        
        $summary = $this->aiService->summarizePTM($appointment->notes, $appointment->actionItems);
        return response()->json(['success' => true, 'data' => $summary]);
    }

    public function chatWithCoach(Request $request, $studentId)
    {
        $validated = $request->validate([
            'message' => 'required|string'
        ]);

        $data = $this->getStudentData($studentId);
        $response = $this->aiService->chatWithCoach($data, $validated['message']);

        return response()->json(['success' => true, 'data' => $response]);
    }
}
