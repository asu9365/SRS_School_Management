<?php
namespace Database\Factories;
use Illuminate\Database\Eloquent\Factories\Factory;
class AppointmentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'scheduled_at' => fake()->dateTimeBetween('-1 month', '+1 month')->format('Y-m-d H:i:s'),
            'status' => fake()->randomElement(['Pending', 'Approved', 'Completed']),
            'notes' => fake()->paragraph(),
        ];
    }
}