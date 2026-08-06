<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Attendance;
use App\Models\Assessment;
use App\Models\Mark;
use App\Models\Competency;
use App\Models\StudentCompetency;
use App\Models\PortfolioItem;
use App\Models\BehaviorRecord;
use App\Models\Appointment;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Core Tenant and Roles
        $this->call([
            SchoolSeeder::class,
            SuperAdminSeeder::class,
        ]);

        app()->instance('current_school_id', 1);

        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $teacherRole = Role::firstOrCreate(['name' => 'Teacher']);
        $studentRole = Role::firstOrCreate(['name' => 'Student']);
        $parentRole = Role::firstOrCreate(['name' => 'Parent']);

        // 2. Default Test Accounts
        $testAdmin = User::factory()->create([
            'name' => 'Test Admin',
            'email' => 'admin@schoolos.com',
        ]);
        $testAdmin->assignRole($adminRole);

        $testTeacher = User::factory()->create([
            'name' => 'Test Teacher',
            'email' => 'teacher@schoolos.com',
        ]);
        $testTeacher->assignRole($teacherRole);
        Teacher::factory()->create(['user_id' => $testTeacher->id, 'Fname' => 'Test', 'Lname' => 'Teacher']);

        $testStudent = User::factory()->create([
            'name' => 'Test Student',
            'email' => 'student@schoolos.com',
        ]);
        $testStudent->assignRole($studentRole);
        $studentProfile = Student::factory()->create(['user_id' => $testStudent->id, 'Fname' => 'Test', 'Lname' => 'Student']);

        // 3. Generate Teachers
        $teachers = [];
        for ($i = 0; $i < 5; $i++) {
            $user = User::factory()->create();
            $user->assignRole($teacherRole);
            $teachers[] = Teacher::factory()->create(['user_id' => $user->id]);
        }
        $teachers[] = $testTeacher->teacherProfile;

        // 4. Generate Students and Parents
        $students = [];
        for ($i = 0; $i < 40; $i++) {
            $parent = User::factory()->create();
            $parent->assignRole($parentRole);

            $studentUser = User::factory()->create();
            $studentUser->assignRole($studentRole);
            $student = Student::factory()->create(['user_id' => $studentUser->id]);
            $students[] = $student;
        }
        $students[] = $studentProfile;

        // 5. Generate Assessments
        $assessments = [];
        foreach (['Mathematics', 'Science', 'English'] as $subject) {
            $assessments[] = Assessment::factory()->create(['subject' => $subject, 'class_id' => '10-A']);
        }

        // 6. Generate Competencies
        $competencies = [];
        foreach (['Algebra', 'Grammar', 'Physics', 'Teamwork'] as $comp) {
            $competencies[] = Competency::factory()->create(['name' => $comp]);
        }

        // 7. Orchestrate Massive Data per Student
        foreach ($students as $student) {
            // Attendances (Last 30 days)
            for ($d = 1; $d <= 30; $d++) {
                Attendance::factory()->create([
                    'user_id' => $student->user_id,
                    'class_id' => $student->class,
                    'date' => now()->subDays($d)->format('Y-m-d'),
                ]);
            }

            // Marks
            foreach ($assessments as $assessment) {
                Mark::factory()->create([
                    'user_id' => $student->user_id,
                    'assessment_id' => $assessment->id,
                ]);
            }

            // Competencies
            foreach ($competencies as $competency) {
                StudentCompetency::factory()->create([
                    'student_id' => $student->user_id,
                    'competency_id' => $competency->id,
                    'teacher_id' => $teachers[array_rand($teachers)]->user_id,
                ]);
            }

            // Portfolios
            PortfolioItem::factory()->count(3)->create([
                'student_id' => $student->user_id,
            ]);

            // Behavior
            BehaviorRecord::factory()->count(5)->create([
                'student_id' => $student->user_id,
                'teacher_id' => $teachers[array_rand($teachers)]->user_id,
            ]);

            // PTM Appointments
            Appointment::factory()->create([
                'parent_id' => $student->user_id, // we can use student as parent for seeding
                'teacher_id' => $teachers[array_rand($teachers)]->id, // points to teachers table
            ]);
        }
    }
}
