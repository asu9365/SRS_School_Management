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