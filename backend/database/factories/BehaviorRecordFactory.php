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
            'date' => fake()->date(),
            'teacher_id' => 2,
        ];
    }
}