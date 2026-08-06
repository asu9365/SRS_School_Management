<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
class StudentCompetencyFactory extends Factory
{
    public function definition(): array
    {
        return [
            'score' => fake()->numberBetween(1, 5),
            'teacher_id' => 2, // Default to a valid user_id for test teacher
        ];
    }
}