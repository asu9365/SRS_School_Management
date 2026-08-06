<?php

namespace App\Http\Controllers;

use App\Services\AIService;
use Illuminate\Http\Request;

class TeacherAIController extends Controller
{
    protected $aiService;

    public function __construct(AIService $aiService)
    {
        $this->aiService = $aiService;
    }

    /**
     * AI lesson outline generator.
     * POST /api/teacher/ai/lesson
     */
    public function generateLesson(Request $request)
    {
        $request->validate([
            'topic' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
        ]);

        $outline = $this->aiService->generateLessonPlanOutline($request->topic, $request->subject);

        return response()->json([
            'success' => true,
            'data' => $outline,
        ]);
    }

    /**
     * AI Quiz generator.
     * POST /api/teacher/ai/questions
     */
    public function generateQuestions(Request $request)
    {
        $request->validate([
            'topic' => 'required|string|max:255',
            'difficulty' => 'required|in:easy,medium,hard',
        ]);

        $questions = $this->aiService->generateQuizQuestions($request->topic, $request->difficulty);

        return response()->json([
            'success' => true,
            'data' => $questions,
        ]);
    }

    /**
     * AI Homework helper.
     * POST /api/teacher/ai/homework
     */
    public function generateHomework(Request $request)
    {
        $request->validate([
            'topic' => 'required|string|max:255',
        ]);

        $hints = $this->aiService->generateHomeworkHints($request->topic);

        return response()->json([
            'success' => true,
            'data' => $hints,
        ]);
    }
}
