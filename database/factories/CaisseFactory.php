<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Caisse>
 */
class CaisseFactory extends Factory
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
            'operation' => fake()->randomElement(['retrait', 'depot']),
            'devise' => fake()->currencyCode(),
            'montant' => fake()->randomNumber(5, true),
            'solde' => fake()->randomNumber(6, true),
            'lobele' => fake()->sentence(),
            'user_id' => fake()->randomNumber(2),
            'created_at' => $randomDate,

        ];
    }
}
