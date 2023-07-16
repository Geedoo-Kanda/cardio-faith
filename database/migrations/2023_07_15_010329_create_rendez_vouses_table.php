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
        Schema::create('rendez_vouses', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('post_nom')->nullable();
            $table->string('prenom');
            $table->string('sexe');
            $table->string('phone');
            $table->string('objet');
            $table->string('email')->nullable();
            $table->string('status')->default('A venir');
            $table->string('disable')->default('no');
            $table->string('user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rendez_vouses');
    }
};
