<?php

namespace App\Http\Controllers;

use App\Models\FicheMedicale;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FicheMedicaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show(FicheMedicale $ficheMedicale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FicheMedicale $ficheMedicale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FicheMedicale $ficheMedicale)
    {
        //
    }

    public function indexView()
    {
        $data = DB::table('fiche_medicales')->orderBy('id', 'DESC')->get();

        return Inertia::render('fiches/index', [
            'data' => $data,
        ]);
    }
}
