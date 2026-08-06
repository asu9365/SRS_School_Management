<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
class AssessmentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'type' => fake()->randomElement(['Midterm', 'Final', 'Assignment', 'Unit Test']),
            'subject' => fake()->randomElement(['Mathematics', 'Science', 'English']),
            'class_id' => '10-A',
            'max_marks' => 100,
            'exam_date' => fake()->dateTimeBetween('-3 months', 'now')->format('Y-m-d'),
        ];
    }
}