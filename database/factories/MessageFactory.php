<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
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
            'objet' => fake()->sentence(),
            'message' => fake()->paragraphs(3, true),
            'user_id' => fake()->randomNumber(5, true),
            'disable' => fake()->randomElement(['true', 'false']),
            'created_at' => $randomDate,
        ];
    }
}
