<?php

namespace App\Http\Controllers;

use App\Models\Caisse;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;


class CaisseController extends Controller
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
    public function show(Caisse $caisse)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Caisse $caisse)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Caisse $caisse)
    {
        //
    }
    
    public function indexView()
    {
        $data = DB::table('caisses')->orderBy('id', 'DESC')->get();

        return Inertia::render('caisse/index', [
            'data' => $data,
        ]);
    }
}
