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
        'postnom',
        'prenom',
        'adresse',
        'lieu_naissance',
        'sexe',
        'date_naissance',
        'situation_familliale',
        'nbr_enfants',
        'nbr_grosses',
        'num_secu',
        'taille',
        'poids',
        'medecin_traitant',
        'fumeur',
        'nbr_cigarette',
        'groupe_saguin',
        'antecedents_familiaux',
        'maladie_infatiles_contractees',
        'antecedent_medicaux',
        'allergies',
        'intolerance_medicamenteuse',
        'traitement_regulier',
        'vaccin',
        'conclusion',
        'num_dossier',
        'user_id'
    ];    
}
