<?php

namespace App\Http\Controllers;

use App\Models\FicheMedicale;
use DateTimeImmutable;
use Illuminate\Http\Request;
use App\Exports\FicheExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Auth;
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

    public function indexView()
    {
        $fiches = FicheMedicale::where('disable', 'false')->orderBy('id', 'DESC')->paginate(50);

        return Inertia::render('fiches/index', [
            'fiches' => $fiches,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'postnom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'sexe' => 'required|string|max:255',
            'num_dossier' => 'required|string|max:255',
            'date_naissance' => 'required|string|max:255',
            'lieu_naissance' => 'required|string|max:255',
            'situation_familliale' => 'required|string|max:255',
            // 'nbr_enfants' => 'string|max:255',
            // 'nbr_grosses' => 'string|max:255',
            'num_secu' => 'required|string|max:255',
            'medecin_traitant' => 'required|string|max:255',
            'groupe_saguin' => 'required|string|max:255',
            'taille' => 'required|string|max:255',
            'poids' => 'required|string|max:255',
            'fumeur' => 'required|string|max:255',
            // 'nbr_cigarette' => 'string|max:255',
            // 'antecedents_familiaux' => 'string|max:255',
            // 'maladie_infatiles_contractees' => 'string|max:255',
            // 'antecedent_medicaux' => 'string|max:255',
            // 'allergies' => 'string|max:255',
            // 'intolerance_medicamenteuse' => 'string|max:255',
            // 'traitement_regulier' => 'string|max:255',
            // 'vaccin' => 'string|max:255',
            'conclusion' => 'required|string|max:9000',
        ]);

        $fiche = FicheMedicale::create([
            'nom' => $request->nom,
            'postnom' => $request->postnom,
            'prenom' => $request->prenom,
            'adresse' => $request->adresse,
            'sexe' => $request->sexe,
            'num_dossier' => $request->num_dossier,
            'date_naissance' => $request->date_naissance,
            'lieu_naissance' => $request->lieu_naissance,
            'situation_familliale' => $request->situation_familliale,
            'nbr_enfants' => $request->nbr_enfants,
            'nbr_grosses' => $request->nbr_grosses,
            'num_secu' => $request->num_secu,
            'medecin_traitant' => $request->medecin_traitant,
            'groupe_saguin' => $request->groupe_saguin,
            'taille' => $request->taille,
            'poids' => $request->poids,
            'fumeur' => $request->fumeur,
            'nbr_cigarette' => $request->nbr_cigarette,
            'antecedents_familiaux' => $request->antecedents_familiaux,
            'maladie_infatiles_contractees' => $request->maladie_infatiles_contractees,
            'antecedent_medicaux' => $request->antecedent_medicaux,
            'allergies' => $request->allergies,
            'intolerance_medicamenteuse' => $request->intolerance_medicamenteuse,
            'traitement_regulier' => $request->traitement_regulier,
            'vaccin' => $request->vaccin,
            'conclusion' => $request->conclusion,
            'user_id' => Auth::user()->id,
        ]); 

        return response($fiche, 201);
    }

    public function export($delai, $mois = null, $annee = null)
    {
        if($delai == 'annee'){
            $date = new DateTimeImmutable($annee);
            $req = $date->format('Y');

            return Excel::download(new FicheExport($req), 'rapport des fiches de '.$req.'.xlsx');
        }elseif($delai == 'mois'){

            $date = new DateTimeImmutable($mois);
            $req = $date->format('Y-m');

            return Excel::download(new FicheExport($req), 'rapport des fiches de '.$req.'.xlsx');
        }

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


}
