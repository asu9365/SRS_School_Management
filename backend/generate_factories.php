<?php

$factories = [
    'StudentFactory' => <<<PHP
<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
class StudentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'Fname' => fake()->firstName(),
            'Lname' => fake()->lastName(),
            'class' => fake()->randomElement(['10-A', '10-B', '9-A', '11-C']),
            'rollno' => fake()->unique()->numberBetween(1, 100),
            'DOB' => fake()->date('Y-m-d', '-15 years'),
            'blood' => fake()->randomElement(['A+', 'B+', 'O+', 'AB+']),
            'address' => fake()->streetAddress(),
            'Dist' => fake()->city(),
            'State' => fake()->state(),
            'pin' => fake()->postcode(),
        ];
    }
}
PHP,
    'TeacherFactory' => <<<PHP
<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
class TeacherFactory extends Factory
{
    public function definition(): array
    {
        return [
            'Fname' => fake()->firstName(),
            'Lname' => fake()->lastName(),
            'DOB' => fake()->date('Y-m-d', '-30 years'),
            'Phone' => fake()->phoneNumber(),
            'blood' => fake()->randomElement(['A+', 'B+', 'O+', 'AB+']),
            'qualification' => 'M.Sc, B.Ed',
            'experience' => fake()->numberBetween(1, 15) . ' years',
            'role' => 'Assistant Teacher',
        ];
    }
}
PHP,
    'AttendanceFactory' => <<<PHP
<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
class AttendanceFactory extends Factory
{
    public function definition(): array
    {
        return [
            'class_id' => '10-A',
            'date' => fake()->dateTimeBetween('-30 days', 'now')->format('Y-m-d'),
            'status' => fake()->randomElement(['Present', 'Present', 'Present', 'Absent', 'Late']),
        ];
    }
}
PHP,
    'AssessmentFactory' => <<<PHP
<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
class AssessmentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'type' => fake()->randomElement(['Exam', 'Quiz', 'Assignment']),
            'subject' => fake()->randomElement(['Mathematics', 'Science', 'English']),
            'class_id' => '10-A',
            'max_marks' => 100,
            'date' => fake()->dateTimeBetween('-3 months', 'now')->format('Y-m-d'),
        ];
    }
}
PHP,
    'MarkFactory' => <<<PHP
<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
class MarkFactory extends Factory
{
    public function definition(): array
    {
        return [
            'marks_obtained' => fake()->randomFloat(2, 40, 100),
            'teacher_feedback' => fake()->sentence(),
        ];
    }
}
PHP,
    'CompetencyFactory' => <<<PHP
<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
class CompetencyFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'category' => fake()->randomElement(['Academic', 'Skill', 'Behavior']),
            'description' => fake()->sentence(),
        ];
    }
}
PHP,
    'StudentCompetencyFactory' => <<<PHP
<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
class StudentCompetencyFactory extends Factory
{
    public function definition(): array
    {
        return [
            'score' => fake()->numberBetween(1, 5),
            'notes' => fake()->sentence(),
            'evaluated_at' => fake()->dateTimeBetween('-1 month', 'now')->format('Y-m-d H:i:s'),
        ];
    }
}
PHP,
    'PortfolioItemFactory' => <<<PHP
<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
class PortfolioItemFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'type' => fake()->randomElement(['Project', 'Certificate', 'Extracurricular']),
            'description' => fake()->paragraph(),
            'date_earned' => fake()->date(),
        ];
    }
}
PHP,
    'BehaviorRecordFactory' => <<<PHP
<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
class BehaviorRecordFactory extends Factory
{
    public function definition(): array
    {
        return [
            'type' => fake()->randomElement(['Positive', 'Negative', 'Neutral']),
            'description' => fake()->sentence(),
            'points' => fake()->numberBetween(-10, 10),
            'incident_date' => fake()->date(),
        ];
    }
}
PHP,
    'AppointmentFactory' => <<<PHP
<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
class AppointmentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'appointment_date' => fake()->dateTimeBetween('-1 month', '+1 month')->format('Y-m-d H:i:s'),
            'reason' => fake()->sentence(),
            'status' => fake()->randomElement(['Pending', 'Confirmed', 'Completed']),
            'notes' => fake()->paragraph(),
        ];
    }
}
PHP,
];

foreach ($factories as $name => $content) {
    file_put_contents(__DIR__ . "/database/factories/{$name}.php", $content);
    echo "Updated {$name}\n";
}
