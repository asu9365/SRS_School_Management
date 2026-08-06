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