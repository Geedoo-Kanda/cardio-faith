<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FicheMedicale extends Model
{
    use HasFactory;

    
        /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'email',
        'post_nom',
        'disable',
        'prenom',
        'sexe',
        'lieu_naissance',
        'adresse',
        'situation_familiale',
        'nbr_enfants',
        'nbr_grosses',
        'num_secu',
        'taille',
        'poids',
        'groupe_saguin',
        'medecin_traitant',
        'fumeur',
        'nbr_cigarette',
        'antecedents_familiaux',
        'maladie_infatiles_contractees',
        'antecedent_medicaux',
        'allergies',
        'intolerance_medicamentaire',
        'traitement_regulier',
        'disable',
        'vaccin',
        'conclusion'
    ];    
}
