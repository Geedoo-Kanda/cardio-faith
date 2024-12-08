<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FicheMedicale>
 */
class FicheMedicaleFactory extends Factory
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
            'nom' => fake()->lastName(),
            'postnom' => fake()->lastName(),
            'prenom' => fake()->firstName(),
            'sexe' => fake()->randomElement(['M', 'F']),
            'lieu_naissance' => fake()->city(),
            'date_naissance' => fake()->date(),
            'adresse' => fake()->address(),
            'situation_familiale' => fake()->randomElement(['Célibataire', 'Marié(e)', 'Divorcé(e)']),
            'nbr_enfants' => fake()->numberBetween(0, 10),
            'nbr_grosses' => fake()->numberBetween(0, 5),
            'num_secu' => fake()->randomNumber(9, true),
            'taille' => fake()->randomFloat(2, 1.5, 2.2) . ' m',
            'poids' => fake()->numberBetween(50, 120) . ' kg',
            'groupe_saguin' => fake()->randomElement(['A', 'B', 'AB', 'O']),
            'medecin_traitant' => fake()->name(),
            'fumeur' => fake()->randomElement(['oui', 'non']),
            'nbr_cigarette' => fake()->numberBetween(0, 20),
            'antecedents_familiaux' => fake()->text(),
            'maladie_infatiles_contractees' => fake()->text(),
            'antecedent_medicaux' => fake()->text(),
            'allergies' => fake()->text(),
            'intolerance_medicamentaire' => fake()->text(),
            'traitement_regulier' => fake()->text(),
            'disable' => 'no',
            'vaccin' => fake()->text(),
            'conclusion' => fake()->paragraph(),
            'user_id' => fake()->randomNumber(5, true),
            'created_at' => $randomDate,

        ];
    }
}
