<?php

namespace App\Http\Controllers;

use App\Models\RendezVous;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Exports\RendezVousExport;
use Maatwebsite\Excel\Facades\Excel;
use DateTimeImmutable;
use DateInterval;
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

    public function indexView()
    {
        $rdvs = RendezVous::where('disable', 'false')->orderBy('id', 'DESC')->paginate(50);

        return Inertia::render('rdv/index', [
            'rdvs' => $rdvs,
        ]);
    }

    public function today()
    {
        $date = new DateTimeImmutable(now());
        $demain = $date->sub(new DateInterval('P1D'));
        $req = $demain->format('Y-m-d');
        
        $rdvs = RendezVous::where('date', 'like', '%'.$req.'%')->where('disable', 'false')
        ->orderBy('id', 'DESC')->paginate(50);

        return Inertia::render('rdv/index', [
            'rdvs' => $rdvs,
        ]);
    }


    public function tomorrow()
    {

        $date = new DateTimeImmutable(now());
        $req = $date->format('Y-m-d');


        $rdvs = RendezVous::where('date', 'like', '%'.$req.'%')->where('disable', 'false')
        ->orderBy('id', 'DESC')->paginate(50);

        return Inertia::render('rdv/index', [
            'rdvs' => $rdvs,
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
            'phone' => 'required|string|max:255',
            'sexe' => 'required|string|max:255',
            'date' => 'required|string|max:255',
            'objet' => 'required|string|max:9000',
        ]);

        $rendezVous = RendezVous::create([
            'nom' => $request->nom,
            'postnom' => $request->postnom,
            'prenom' => $request->prenom,
            'phone' => $request->phone,
            'sexe' => $request->sexe,
            'date' => $request->date,
            'email' => $request->email,
            'objet' => $request->objet,
            'user_id' => Auth::user()->id,
        ]);

        return response($rendezVous, 201);
    }

    public function export($delai, $mois = null, $annee = null)
    {
        if($delai == 'annee'){
            $date = new DateTimeImmutable($annee);
            $req = $date->format('Y');

            return Excel::download(new RendezVousExport($req), 'rapport des rendez-vous de '.$req.'.xlsx');
        }elseif($delai == 'mois'){

            $date = new DateTimeImmutable($mois);
            $req = $date->format('Y-m');

            return Excel::download(new RendezVousExport($req), 'rapport des rendez-vous de '.$req.'.xlsx');
        }

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
        $request->validate([
            'status' => 'required|string|max:255',
        ]);

        if($request->date){
            $req = RendezVous::where('id', $rendezVous->id)->update([
                'status' => $request->status,
                'date' => $request->date,
            ]);
        }else{
            $req = RendezVous::where('id', $rendezVous->id)->update([
                'status' => $request->status,
            ]);
        }

        return response($req, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RendezVous $rendezVous)
    {
        $req = RendezVous::where('id', $rendezVous->id)->update(['disable' => 'true']);

        return response($req, 201);
    }
}
