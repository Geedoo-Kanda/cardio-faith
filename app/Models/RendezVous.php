<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RendezVous extends Model
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
        'postnom',
        'status',
        'disable',
        'prenom',
        'sexe',
        'date',
        'phone',
        'objet',
        'user_id',
        'updated_at'
    ];
}
