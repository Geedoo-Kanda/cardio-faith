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
        return User::where('disable', 'false')->where('acces', 0)->orderBy('id', 'DESC')->get();
    }

    public function all()
    {
        return User::all();
    }

    public function indexView()
    {
        $users = User::where('disable', 'false')->where('acces', '!=',0)->orderBy('id', 'DESC')->paginate(50);

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
            'nom' => 'required|string|max:255',
            'role' => 'required|string|max:255',
        ]);

        if($request->role == 'manager'){
            $req = User::where('id', $request->nom)->update(['acces' => 1]);

            return response($req, 201);
        }elseif($request->role == 'secretaire'){

            $req = User::where('id', $request->nom)->update(['acces' => 2]);

            return response($req, 201);
        }elseif($request->role == 'docteur'){

            $req = User::where('id', $request->nom)->update(['acces' => 3]);

            return response($req, 201);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
      
    }

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
        $req = User::where('id', $user->id)->update(['disable' => 'true']);

        return response($req, 201);
    }
}
