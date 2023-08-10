<?php

namespace App\Http\Controllers;

use App\Models\CompteRendu;
use App\Models\FicheMedicale;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class CompteRenduController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(CompteRendu $compteRendu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FicheMedicale $fiche)
    {
        $request->validate([
            'conclusion' => 'required|string|max:9000',
        ]);

        $req = CompteRendu::create([
            'description' => $request->conclusion,
            'fiche_id' => $fiche->id,
            'user_id' => Auth::user()->id,
        ]);

        return response($req, 201);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CompteRendu $compteRendu)
    {
        //
    }
}
