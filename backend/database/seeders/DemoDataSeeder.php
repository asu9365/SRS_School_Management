<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        // Add Teachers
        $teachers = [
            ['Fname' => 'John', 'Lname' => 'Doe', 'gender' => 'Male', 'Phone' => '9876543210', 'email' => 'john.doe@schoolos.com', 'DOB' => '1985-05-14', 'blood' => 'O+', 'caste' => 'General', 'qualification' => 'M.Sc. Mathematics', 'experience' => '5 Years', 'classAssign' => '10'],
            ['Fname' => 'Jane', 'Lname' => 'Smith', 'gender' => 'Female', 'Phone' => '9876543211', 'email' => 'jane.smith@schoolos.com', 'DOB' => '1988-08-22', 'blood' => 'A+', 'caste' => 'General', 'qualification' => 'M.A. English', 'experience' => '8 Years', 'classAssign' => '9'],
            ['Fname' => 'Robert', 'Lname' => 'Brown', 'gender' => 'Male', 'Phone' => '9876543212', 'email' => 'robert.brown@schoolos.com', 'DOB' => '1990-11-03', 'blood' => 'B+', 'caste' => 'OBC', 'qualification' => 'B.Ed. Science', 'experience' => '3 Years', 'classAssign' => '8'],
        ];

        foreach ($teachers as $t) {
            Teacher::updateOrCreate(['email' => $t['email']], $t);
        }

        // Add Students
        $students = [
            ['Fname' => 'Alice', 'Lname' => 'Johnson', 'gender' => 'Female', 'email' => 'alice.j@schoolos.com', 'class' => '10', 'rollno' => '1', 'DOB' => '2010-05-14', 'blood' => 'O+', 'address' => 'City Center', 'pin' => '782136', 'Dist' => 'Nagaon', 'State' => 'Assam'],
            ['Fname' => 'Bob', 'Lname' => 'Williams', 'gender' => 'Male', 'email' => 'bob.w@schoolos.com', 'class' => '10', 'rollno' => '2', 'DOB' => '2010-08-22', 'blood' => 'A+', 'address' => 'North Hill', 'pin' => '782136', 'Dist' => 'Nagaon', 'State' => 'Assam'],
            ['Fname' => 'Charlie', 'Lname' => 'Davis', 'gender' => 'Male', 'email' => 'charlie.d@schoolos.com', 'class' => '10', 'rollno' => '3', 'DOB' => '2010-11-03', 'blood' => 'B+', 'address' => 'South Park', 'pin' => '782136', 'Dist' => 'Nagaon', 'State' => 'Assam'],
        ];

        foreach ($students as $s) {
            Student::updateOrCreate(['email' => $s['email']], $s);
        }
    }
}
