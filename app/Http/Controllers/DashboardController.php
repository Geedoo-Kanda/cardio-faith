<?php

namespace App\Http\Controllers;

use App\Models\Caisse;
use App\Models\RendezVous;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index(){
        $rdv_venir = RendezVous::where('status', 'A venir')->count();
        $rdv_annule = RendezVous::where('status', 'annule')->count();
        $rdv_repporte = RendezVous::where('status', 'repporte')->count();
        $rdv_effectue = RendezVous::where('status', 'effectue')->count();
    
        $depot = Caisse::where('operation', 'depot')->pluck('montant')->sum();
        $retrait = Caisse::where('operation', 'retrait')->pluck('montant')->sum();
        $solde = Caisse::orderBy('id', 'DESC')->pluck('solde')->first();
    
        Auth::user()->roles;

        return Inertia::render('Dashboard', [
            'rdv_venir' => $rdv_venir,
            'rdv_annule' => $rdv_annule,
            'rdv_repporte' => $rdv_repporte,
            'rdv_effectue' => $rdv_effectue,
            'depot' => $depot,
            'retrait' => $retrait,
            'solde' => $solde,
        ]);
    }
}
