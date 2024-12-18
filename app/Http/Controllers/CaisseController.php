<?php

namespace App\Http\Controllers;

use App\Models\Caisse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Exports\CaisseExport;
use Carbon\Carbon;
use Maatwebsite\Excel\Facades\Excel;
use DateTimeImmutable;

class CaisseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $operation = $request->input('operation'); // Récupération des valeurs au lieu d'utiliser filled()
        $filter = $request->input('filter');

        $query = Caisse::where('disable', false)->where('operation', $operation);

        // Appliquer les filtres temporels
        switch ($filter) {
            case 'today':
                $query->whereDate('date', Carbon::today());
                break;
            case 'yesterday':
                $query->whereDate('date', Carbon::yesterday());
                break;
            case 'week':
                $query->whereBetween('date', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
                break;
            case 'month':
                $query->whereMonth('date', Carbon::now()->month)
                    ->whereYear('date', Carbon::now()->year);
                break;
            case 'year':
                $query->whereYear('date', Carbon::now()->year);
                break;
        }

        // Appliquer la recherche si un terme est fourni
        if ($request->filled('search')) {
            $searchTerm = $request->input('search');
            $query->where('montant', 'like', "%{$searchTerm}%")
                ->orWhere('libele', 'like', "%{$searchTerm}%");
        }

        // Pagination et réponse JSON
        $caisses = $query->orderBy('id', 'desc')->paginate(50);
        return response()->json($caisses);
    }

    public function countByMonth($year)
    {
        // Récupérer tous les enregistrements de caisse
        $caisses = Caisse::all()->filter(function ($caisse) use ($year) {
            // Vérifier que l'année correspond
            return Carbon::parse($caisse->date)->year == $year;
        });
    
        // Grouper les caisses par mois
        $caissesParMois = $caisses->groupBy(function ($caisse) {
            // Extraire le mois numérique
            return Carbon::parse($caisse->date)->format('n');
        })->map(function ($caisses) {
            // Calculer les totaux pour chaque mois
            $totalDepot = $caisses->where('operation', 'depot')->sum('montant');
            $totalRetrait = $caisses->where('operation', 'retrait')->sum('montant');
            return [
                'totalDepot' => $totalDepot,
                'totalRetrait' => $totalRetrait,
            ];
        });
    
        // Trier les données par mois
        $caissesParMoisArray = $caissesParMois->toArray();
        ksort($caissesParMoisArray);
    
        // Préparer les données pour le graphique
        $chartData = [];
        foreach ($caissesParMoisArray as $moisNumerique => $data) {
            $moisNom = date('F', mktime(0, 0, 0, $moisNumerique, 1)); // Nom du mois en anglais
            $chartData[] = [
                'name' => $moisNom,
                'depot' => $data['totalDepot'],
                'retrait' => $data['totalRetrait'],
            ];
        }
    
        return response()->json($chartData);
    }
    

    public function export($delai, $mois = null, $annee = null)
    {
        if ($delai == 'annee') {
            $date = new DateTimeImmutable($annee);
            $req = $date->format('Y');

            return Excel::download(new CaisseExport($req), 'rapport de la caisse de ' . $req . '.xlsx');
        } elseif ($delai == 'mois') {

            $date = new DateTimeImmutable($mois);
            $req = $date->format('Y-m');

            return Excel::download(new CaisseExport($req), 'rapport de la caisse de ' . $req . '.xlsx');
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
            'date' => 'required|string|max:255',
            'libele' => 'required|string|max:9000',
        ]);

        $solde  = Caisse::pluck('solde')->last();

        if ($request->operation == 'depot') {
            $Caisse = Caisse::create([
                'operation' => $request->operation,
                'montant' => $request->montant,
                'libele' => $request->libele,
                'date' => $request->date,
                'solde' => $solde + $request->montant,
                'user_id' => Auth::user()->id,
            ]);
        } else {
            $Caisse = Caisse::create([
                'operation' => $request->operation,
                'montant' => $request->montant,
                'libele' => $request->libele,
                'date' => $request->date,
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
        $caisses = Caisse::orderBy('id', 'DESC')->paginate(50);
        return Inertia::render('caisse/index', [
            'caisses' => $caisses,
        ]);
    }
}
