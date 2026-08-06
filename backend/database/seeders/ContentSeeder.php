<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Notice;
use App\Models\Update;
use App\Models\Homework;
use App\Models\User;
use Carbon\Carbon;

class ContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('email', 'admin@schoolos.com')->first() ?? User::first();
        
        // Notices
        Notice::create([
            'title' => 'Annual Sports Meet 2026',
            'content' => 'The Annual Sports Meet is scheduled for next month. All students must register with their class teachers by the end of this week.',
            'target_roles' => ['student', 'parent', 'teacher'],
            'publish_date' => Carbon::now(),
        ]);

        Notice::create([
            'title' => 'Important: Fee Submission Deadline',
            'content' => 'Please note that the deadline for submitting the Q2 tuition fees is the 15th of next month. Late submissions will incur a fine.',
            'target_roles' => ['parent'],
            'publish_date' => Carbon::now()->subDays(2),
        ]);

        // Updates
        Update::create([
            'user_id' => $admin->id,
            'class_id' => '10-A',
            'content' => 'Class 10-A science project submission date has been extended by 3 days due to the science fair preparations.',
        ]);

        Update::create([
            'user_id' => $admin->id,
            'class_id' => 'All',
            'content' => 'The library will remain closed tomorrow for annual maintenance. Please return your books today.',
        ]);

        // Homework
        Homework::create([
            'user_id' => $admin->id,
            'class_id' => '10-A',
            'subject' => 'Mathematics',
            'title' => 'Algebra Worksheet',
            'description' => 'Complete exercises 1 to 15 from Chapter 4. Ensure all working steps are shown.',
            'due_date' => Carbon::now()->addDays(2),
        ]);

        Homework::create([
            'user_id' => $admin->id,
            'class_id' => '10-A',
            'subject' => 'Science',
            'title' => 'Physics: Newton\'s Laws',
            'description' => 'Write a short essay on real-world applications of Newton\'s Third Law.',
            'due_date' => Carbon::now()->addDays(4),
        ]);
    }
}
