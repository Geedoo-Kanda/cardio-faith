<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CompteRendu>
 */
class CompteRenduFactory extends Factory
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
            'description' => fake()->sentence(),
            'disable' => fake()->randomElement(['true', 'false']),
            'user_id' => fake()->randomNumber(5, true),
            'fiche_id' => fake()->randomNumber(5, true), // Remplacez par une relation si possible
            'created_at' => $randomDate,
        ];
    }
}
