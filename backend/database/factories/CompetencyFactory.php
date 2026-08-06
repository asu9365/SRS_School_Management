<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
class CompetencyFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'subject' => fake()->randomElement(['Mathematics', 'Science', 'English']),
            'description' => fake()->sentence(),
        ];
    }
}