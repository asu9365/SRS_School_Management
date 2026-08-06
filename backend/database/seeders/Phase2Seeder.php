<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Attendance;
use App\Models\Assessment;
use App\Models\Mark;
use Carbon\Carbon;

class Phase2Seeder extends Seeder
{
    public function run(): void
    {
        // 1. Get all students
        $students = User::role('Student')->get();
        if ($students->isEmpty()) {
            return;
        }

        $classId = '10-A';

        // 2. Seed Attendance for the past 14 days
        $today = Carbon::today();
        foreach ($students as $student) {
            for ($i = 0; $i < 14; $i++) {
                $date = $today->copy()->subDays($i);
                
                // Skip weekends
                if ($date->isWeekend()) {
                    continue;
                }

                // Randomly assign Present (80%), Absent (10%), Late (10%)
                $rand = rand(1, 100);
                $status = 'Present';
                if ($rand > 90) $status = 'Absent';
                elseif ($rand > 80) $status = 'Late';

                Attendance::updateOrCreate(
                    ['user_id' => $student->id, 'date' => $date->format('Y-m-d')],
                    [
                        'class_id' => $classId,
                        'status' => $status,
                        'remarks' => $status == 'Absent' ? 'Medical leave' : null
                    ]
                );
            }
        }

        // 3. Seed Assessments
        $assessments = [
            [
                'title' => 'Math Midterm',
                'type' => 'Midterm',
                'class_id' => $classId,
                'subject' => 'Mathematics',
                'max_marks' => 100,
                'exam_date' => Carbon::now()->subDays(10)->format('Y-m-d'),
            ],
            [
                'title' => 'Science Quiz 1',
                'type' => 'Quiz',
                'class_id' => $classId,
                'subject' => 'Science',
                'max_marks' => 20,
                'exam_date' => Carbon::now()->subDays(5)->format('Y-m-d'),
            ],
            [
                'title' => 'English Essay',
                'type' => 'Assignment',
                'class_id' => $classId,
                'subject' => 'English',
                'max_marks' => 50,
                'exam_date' => Carbon::now()->subDays(2)->format('Y-m-d'),
            ]
        ];

        foreach ($assessments as $data) {
            $assessment = Assessment::firstOrCreate(
                ['title' => $data['title'], 'class_id' => $data['class_id']],
                $data
            );

            // 4. Seed Marks for each student
            foreach ($students as $student) {
                // Generate random marks (60% to 100% of max_marks)
                $marksObtained = rand($assessment->max_marks * 0.6, $assessment->max_marks);
                
                Mark::updateOrCreate(
                    ['assessment_id' => $assessment->id, 'user_id' => $student->id],
                    [
                        'marks_obtained' => $marksObtained,
                        'teacher_feedback' => 'Good effort.'
                    ]
                );
            }
        }
    }
}
