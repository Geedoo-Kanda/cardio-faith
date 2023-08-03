<?php

namespace App\Http\Controllers;

use App\Models\Caisse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Exports\CaisseExport;
use Maatwebsite\Excel\Facades\Excel;
use DateTimeImmutable;

class CaisseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function export($delai, $mois = null, $annee = null)
    {
        if($delai == 'annee'){
            $date = new DateTimeImmutable($annee);
            $req = $date->format('Y');

            return Excel::download(new CaisseExport($req), 'rapport de la caisse de '.$req.'.xlsx');
        }elseif($delai == 'mois'){

            $date = new DateTimeImmutable($mois);
            $req = $date->format('Y-m');

            return Excel::download(new CaisseExport($req), 'rapport de la caisse de '.$req.'.xlsx');
        }

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'operation' => 'required|string|max:255',
            'montant' => 'required|string|max:255',
            'libele' => 'required|string|max:9000',
        ]);

        $solde  = Caisse::pluck('solde')->last();

        if($request->operation == 'depot'){
            $Caisse = Caisse::create([
                'operation' => $request->operation,
                'montant' => $request->montant,
                'libele' => $request->libele,
                'solde' => $solde + $request->montant,
                'user_id' => Auth::user()->id,
            ]);
        }else{
            $Caisse = Caisse::create([
                'operation' => $request->operation,
                'montant' => $request->montant,
                'libele' => $request->libele,
                'solde' => $solde - $request->montant,
                'user_id' => Auth::user()->id,
            ]);
        }
       

        return response($Caisse, 201);
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
        $req = Caisse::where('id', $caisse->id)->update(['disable' => 'true']);

        return response($req, 201);
    }
    
    public function indexView()
    {
        $caisses = Caisse::where('disable', 'false')->orderBy('id', 'DESC')->paginate(50);
        return Inertia::render('caisse/index', [
            'caisses' => $caisses,
        ]);
    }
}
