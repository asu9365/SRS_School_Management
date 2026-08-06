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