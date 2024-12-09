<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::doesntHave('roles')->orderBy('id', 'DESC')->get();
    }

    public function all()
    {
        return User::all();
    }

    public function indexView()
    {
        $users = User::where('disable', false)
                     ->whereHas('roles') // Vérifie que l'utilisateur a au moins un rôle
                     ->with('roles') // Charge les rôles associés
                     ->orderBy('id', 'DESC')
                     ->paginate(50);
    
        return Inertia::render('user/index', [
            'users' => $users,
        ]);
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:users,id',
            'role' => 'required|string|max:255',
        ]);

        $user = User::findOrFail($request->id);

        $user->assignRole($request->role);
        return response($user, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user) {}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->syncRoles([]);
        $user->update(['disable' => true]);
        return response($user, 200);
    }
}
