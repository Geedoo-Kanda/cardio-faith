<?php

namespace App\Http\Controllers;

use App\Models\RendezVous;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RendezVousController extends Controller
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
    public function show(RendezVous $rendezVous)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RendezVous $rendezVous)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RendezVous $rendezVous)
    {
        //
    }

    public function indexView()
    {
        $data = DB::table('rendez_vouses')->orderBy('id', 'DESC')->get();

        return Inertia::render('rdv/index', [
            'data' => $data,
        ]);
    }
}
