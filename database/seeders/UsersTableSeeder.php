<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'phone' => '1234567890',
                'adresse' => '123 Admin Street',
                'acces' => 1,
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'), // Mot de passe sécurisé
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Test User',
                'email' => 'user@example.com',
                'phone' => '0987654321',
                'adresse' => '456 User Avenue',
                'acces' => 2,
                'email_verified_at' => now(),
                'password' => Hash::make('123456789'), // Mot de passe sécurisé
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
