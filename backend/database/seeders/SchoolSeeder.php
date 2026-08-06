<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $school = \App\Models\School::firstOrCreate(
            ['subdomain' => 'srhs'],
            [
                'name' => 'St. Robert\'s High School',
                'contact_email' => 'contact@srhs.edu',
                'subscription_plan' => 'premium',
                'status' => 'active'
            ]
        );

        // Assign all existing records to this school
        $tables = [
            'users', 'students', 'teachers', 'appointments', 
            'attendances', 'assessments', 'marks', 'notices', 
            'updates', 'homework', 'messages', 'notifications'
        ];

        foreach ($tables as $tableName) {
            if (\Illuminate\Support\Facades\Schema::hasTable($tableName)) {
                \Illuminate\Support\Facades\DB::table($tableName)
                    ->whereNull('school_id')
                    ->update(['school_id' => $school->id]);
            }
        }
    }
}
