<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Caisse;
use App\Models\CompteRendu;
use App\Models\FicheMedicale;
use App\Models\Message;
use App\Models\RendezVous;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // $this->call(UsersTableSeeder::class);
        Caisse::factory()->count(3000)->create();
        RendezVous::factory()->count(5000)->create();
        Message::factory(5000)->create();
        FicheMedicale::factory(5000)->create();
        CompteRendu::factory(5000)->create();

        $roles = [
            'Administrateur',
            'Caissier',
            'Docteur',
            'Secretaire',
        ];

        // Créer les rôles et assigner les permissions
        foreach ($roles as $roleName) {
            Role::firstOrCreate(['name' => $roleName]);
        }

        $users = User::all();
        foreach ($users as $user) {
            switch ($user->acces) {
                case '1':
                    $role = 'Administrateur';
                    break;
                case '2':
                    $role = 'Secretaire';
                    break;
                case '3':
                    $role = 'Docteur';
                    break;
                case '4':
                    $role = 'Caissier';
                    break;
                default:
                    $role = null; // Aucun rôle si "acces" n'est pas défini ou incorrect
            }

            if ($role) {
                // Vérifier si le rôle existe dans le système
                $roleInstance = Role::where('name', $role)->first();

                if ($roleInstance) {
                    // Assigner le rôle à l'utilisateur
                    $user->assignRole($role);
                    echo "Le rôle '{$role}' a été assigné à l'utilisateur {$user->name}.\n";
                } else {
                    echo "Le rôle '{$role}' n'existe pas dans la base de données.\n";
                }
            } else {
                echo "L'utilisateur {$user->name} n'a pas de rôle valide à assigner.\n";
            }
        }
    }
}
