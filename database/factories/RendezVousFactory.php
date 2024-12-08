<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RendezVous>
 */
class RendezVousFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = Carbon::now()->subYears(rand(0, 5));
        $endDate = $startDate->copy()->addMonths(rand(1, 12));
        $randomDate = $startDate->copy()->addDays(rand(1, $endDate->diffInDays($startDate)));
        
        return [
            'nom' => fake()->firstName(),
            'postnom' => fake()->lastName(),
            'prenom' => fake()->firstName(),
            'sexe' => fake()->randomElement(['M', 'F']),
            'phone' => fake()->phoneNumber(),
            'objet' => fake()->sentence(),
            'email' => fake()->unique()->safeEmail(),
            'status' => fake()->randomElement(['A venir', 'effectue', 'annule', 'repporte']),
            'disable' => fake()->boolean(),
            'user_id' => fake()->randomNumber(2),
            'date' => $randomDate,
        ];
    }
}
