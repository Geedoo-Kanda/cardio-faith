<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fiche_medicales', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('postnom')->nullable();
            $table->string('prenom');
            $table->string('sexe');
            $table->string('lieu_naissance');
            $table->string('date_naissance');
            $table->string('adresse');
            $table->string('situation_familiale')->nallable();
            $table->integer('nbr_enfants')->default(0);
            $table->integer('nbr_grosses')->default(0);
            $table->integer('num_secu')->nallable();
            $table->integer('num_telephone')->nallable();
            $table->string('taille')->nallable();
            $table->string('poids')->nallable();
            $table->string('groupe_saguin')->nallable();
            $table->string('medecin_traitant');
            $table->string('fumeur')->nallable();
            $table->integer('nbr_cigarette')->nallable();

            $table->string('antecedents_familiaux')->nullable();
            $table->string('maladie_infatiles_contractees')->nullable();
            $table->string('antecedent_medicaux')->nullable();
            $table->string('allergies')->nullable();
            $table->string('intolerance_medicamentaire')->nullable();
            $table->string('traitement_regulier')->nullable();
            $table->string('disable')->default(false);
            $table->string('vaccin')->nullable();

            $table->longText('conclusion');
            $table->string('user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fiche_medicales');
    }
};
