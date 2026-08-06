<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AIService
{
    private function callGemini(string $prompt, bool $isJson = false): string|array|null
    {
        $apiKey = env('GEMINI_API_KEY');
        if (empty($apiKey)) {
            Log::warning('Gemini API key is not set.');
            return null;
        }

        $url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' . $apiKey;

        try {
            $response = Http::timeout(15)->post($url, [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ]
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? '';
                
                if ($isJson) {
                    // Clean up markdown code blocks if Gemini returns them
                    $text = preg_replace('/```json\s*/', '', $text);
                    $text = preg_replace('/```\s*/', '', $text);
                    return json_decode(trim($text), true);
                }
                
                return trim($text);
            }
            Log::error('Gemini API Error: ' . $response->body());
        } catch (\Exception $e) {
            Log::error('Gemini API Exception: ' . $e->getMessage());
        }

        return null;
    }

    /**
     * Simulate AI risk prediction based on student holistic data.
     */
    public function predictRisk($studentData)
    {
        $academicAvg = $studentData['academics']['average'] ?? 0;
        $attendance = $studentData['attendance']['percentage'] ?? 0;
        
        $behaviorRecords = $studentData['behavior'] ?? collect([]);
        $negativeCount = collect($behaviorRecords)->filter(function($b) { return $b['type'] === 'Needs Improvement'; })->count();

        $prompt = "You are an educational AI analyzing a student's profile. 
Here is the data:
- Academic Average: {$academicAvg}%
- Attendance: {$attendance}%
- Negative Behavior Count: {$negativeCount}

Return ONLY a valid JSON object with the following structure (no markdown tags, just the JSON):
{
    \"risk_level\": \"Low\" | \"Medium\" | \"High\",
    \"risk_score\": <number between 0 and 100>,
    \"insights\": [\"insight 1\", \"insight 2\"]
}";

        $result = $this->callGemini($prompt, true);

        if ($result && is_array($result) && isset($result['risk_level'])) {
            return $result;
        }

        $riskScore = 0;
        
        if ($academicAvg < 50) $riskScore += 40;
        else if ($academicAvg < 70) $riskScore += 20;

        if ($attendance < 75) $riskScore += 30;
        else if ($attendance < 85) $riskScore += 15;

        $riskScore += ($negativeCount * 10);
        $riskScore = min(100, $riskScore);

        $level = 'Low';
        if ($riskScore > 60) $level = 'High';
        else if ($riskScore > 30) $level = 'Medium';

        // Generate dynamic insights
        $insights = [];
        if ($academicAvg < 60) {
            $insights[] = "Academic performance is below average. Consider scheduling tutoring sessions.";
        }
        if ($attendance < 85) {
            $insights[] = "Attendance is a concern. A parent-teacher meeting is recommended.";
        }
        if ($negativeCount > 2) {
            $insights[] = "Recent behavioral issues noted. Monitor closely in class.";
        }
        if (empty($insights)) {
            $insights[] = "Student is performing well across all metrics. Keep up the good work!";
        }

        return [
            'risk_level' => $level,
            'risk_score' => $riskScore,
            'insights' => $insights
        ];
    }

    /**
     * Generate a contextual report comment based on data.
     */
    public function generateReportComment($studentData)
    {
        $name = $studentData['student']['Fname'] ?? 'The student';
        $academicAvg = $studentData['academics']['average'] ?? 0;
        
        $competencies = $studentData['competencies'] ?? [];
        $strong = [];
        if (count($competencies) > 0) {
            $strong = collect($competencies)->where('score', '>=', 4)->pluck('competency.name')->toArray();
        }
        $strongStr = empty($strong) ? "None noted." : implode(', ', $strong);

        $prompt = "Write a professional report card comment for a student named {$name}.
Academic Average: {$academicAvg}%
Strong Competencies: {$strongStr}
Keep it to 2-3 sentences. Do not use generic placeholders.";

        $result = $this->callGemini($prompt);
        if ($result) {
            return $result;
        }

        $intro = "";
        if ($academicAvg >= 90) $intro = "$name has shown outstanding academic excellence this term.";
        else if ($academicAvg >= 75) $intro = "$name is performing well and has a solid understanding of the material.";
        else if ($academicAvg >= 60) $intro = "$name is making steady progress, though there is room for improvement in key areas.";
        else $intro = "$name has struggled academically this term and will need additional support.";

        // Competencies
        $compStr = count($strong) > 0 ? " Particularly strong in " . implode(', ', $strong) . "." : "";

        return $intro . $compStr . " I encourage continued focus and active participation in class.";
    }

    /**
     * Summarize PTM notes and action items.
     */
    public function summarizePTM($notes, $actionItems)
    {
        if (empty($notes) && empty($actionItems)) {
            return "No meeting notes or action items were provided to summarize.";
        }
        
        $actionStr = json_encode($actionItems);
        $prompt = "You are an AI assistant for a school. Summarize the following Parent-Teacher Meeting notes and action items concisely.
Notes: {$notes}
Action Items: {$actionStr}
Format the output nicely. Be concise and professional.";

        $result = $this->callGemini($prompt);
        if ($result) {
            return $result;
        }

        // Simulated AI summary
        $summary = "Meeting Summary:\n";
        
        if (!empty($notes)) {
            $words = str_word_count(strip_tags($notes));
            $summary .= "- Discussed general academic progress and behavioral points ($words words in notes).\n";
        }
        
        if (!empty($actionItems)) {
            $completed = collect($actionItems)->where('is_completed', true)->count();
            $total = count($actionItems);
            $summary .= "- Identified $total key action items ($completed completed so far).\n";
        }

        $summary .= "\nRecommendation: Follow up on pending action items before the next term.";
        
        return $summary;
    }

    /**
     * AI Academic Coach Chat
     */
    public function chatWithCoach($studentData, $message)
    {
        $academicAvg = $studentData['academics']['average'] ?? 0;
        
        $prompt = "You are an AI Academic Coach for a school platform. You are chatting with a student.
Student's Current Academic Average: {$academicAvg}%
Student's message: \"{$message}\"
Provide a helpful, encouraging, and concise response. Do not use markdown if possible. Talk directly to the student.";

        $result = $this->callGemini($prompt);
        if ($result) {
            return $result;
        }

        $message = strtolower($message);

        if (str_contains($message, 'how am i doing') || str_contains($message, 'performance') || str_contains($message, 'grades')) {
            if ($academicAvg >= 80) return "You're doing great! Your academic average is around " . round($academicAvg) . "%. Keep up the excellent work!";
            if ($academicAvg >= 60) return "You are doing okay, with an average of " . round($academicAvg) . "%. Focusing a bit more on your upcoming assignments will help bring it up!";
            return "Your current average is " . round($academicAvg) . "%. I'd recommend reviewing recent chapters and speaking with your teachers if you need help.";
        }

        if (str_contains($message, 'study') || str_contains($message, 'tips')) {
            return "Here are a few quick tips:\n1. Break your study time into 25-minute chunks (Pomodoro technique).\n2. Review your class notes on the same day you write them.\n3. Stay hydrated and get enough sleep!";
        }

        return "I'm your AI Academic Coach! You can ask me how you're doing in class, or for study tips. (This is a simulated AI response).";
    }

    /**
     * AI Lesson Plan generator.
     */
    public function generateLessonPlanOutline($topic, $subject)
    {
        $prompt = "You are a curriculum developer. Generate a lesson plan outline for topic: '{$topic}' in subject: '{$subject}'. 
Return ONLY a valid JSON object with structure (no markdown tags):
{
    \"topic\": \"{$topic}\",
    \"subject\": \"{$subject}\",
    \"duration\": \"45 minutes\",
    \"objectives\": [\"Objective 1\", \"Objective 2\"],
    \"structure\": [
        {\"phase\": \"Introduction\", \"minutes\": 10, \"activities\": \"Activity details\"},
        {\"phase\": \"Core Concept\", \"minutes\": 25, \"activities\": \"Core teaching activity\"},
        {\"phase\": \"Wrap-up\", \"minutes\": 10, \"activities\": \"Review details\"}
    ],
    \"homework_idea\": \"A suggestion for follow-up homework.\"
}";

        $result = $this->callGemini($prompt, true);
        if ($result && is_array($result)) {
            return $result;
        }

        // Mock fallback
        return [
            'topic' => $topic,
            'subject' => $subject,
            'duration' => '45 minutes',
            'objectives' => [
                "Understand primary principles of {$topic}",
                "Apply {$topic} techniques to solve basic problems"
            ],
            'structure' => [
                ['phase' => 'Introduction', 'minutes' => 10, 'activities' => 'Recall prior knowledge, introduce topic objectives.'],
                ['phase' => 'Core Instruction', 'minutes' => 25, 'activities' => 'Explain concepts of ' . $topic . ' using whiteboard/slides, resolve examples.'],
                ['phase' => 'Conclusion', 'minutes' => 10, 'activities' => 'Perform quick quiz recap, announce homework task.']
            ],
            'homework_idea' => "Complete exercises 1 to 5 in Chapter {$topic} section."
        ];
    }

    /**
     * AI Quiz generator.
     */
    public function generateQuizQuestions($topic, $difficulty)
    {
        $prompt = "Generate 3 multiple choice questions for Topic: '{$topic}' with Difficulty: '{$difficulty}'.
Return ONLY a valid JSON array of objects with structure (no markdown tags):
[
    {
        \"question\": \"Question text?\",
        \"options\": [\"Option A\", \"Option B\", \"Option C\", \"Option D\"],
        \"correct_answer\": \"Option A\"
    }
]";

        $result = $this->callGemini($prompt, true);
        if ($result && is_array($result)) {
            return $result;
        }

        // Mock fallback
        return [
            [
                'question' => "Which of the following best defines the primary concept of {$topic}?",
                'options' => ["Option 1", "Option 2", "Option 3", "Option 4"],
                'correct_answer' => "Option 1"
            ],
            [
                'question' => "What is the primary factor limiting the efficiency of {$topic} applications?",
                'options' => ["Option 1", "Option 2", "Option 3", "Option 4"],
                'correct_answer' => "Option 2"
            ],
            [
                'question' => "Which formula is correctly applied when calculating values under {$topic} conditions?",
                'options' => ["Option 1", "Option 2", "Option 3", "Option 4"],
                'correct_answer' => "Option 3"
            ]
        ];
    }

    /**
     * AI Homework hints generator.
     */
    public function generateHomeworkHints($topic)
    {
        $prompt = "Provide study hints and quick reference points for homework on Topic: '{$topic}'. Keep it short and readable.";

        $result = $this->callGemini($prompt);
        if ($result) {
            return ['hints' => $result];
        }

        return [
            'hints' => "Study guide tips for {$topic}:\n- Review main textbook definitions.\n- Practice basic example problems first.\n- Double-check formulas and calculations."
        ];
    }

    /**
     * AI Classroom advisory generator.
     */
    public function getClassroomInsights($averageScore, $attendance, $riskCount)
    {
        $prompt = "Provide a classroom health observation comment.
- Class average score: {$averageScore}%
- Class average attendance: {$attendance}%
- Students at high success risk: {$riskCount}
Keep the comment to 2-3 sentences. Be constructive.";

        $result = $this->callGemini($prompt);
        if ($result) {
            return $result;
        }

        if ($riskCount > 2) {
            return "Class health indicators show strong metrics overall, but {$riskCount} students require active academic interventions. Consider focused group remedial sessions.";
        }
        
        return "The classroom demonstrates consistent performance averages. Regular lesson pacing is recommended.";
    }
}
