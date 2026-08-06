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
            'date' => fake()->date(),
        ];
    }
}