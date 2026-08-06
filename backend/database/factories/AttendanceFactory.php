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