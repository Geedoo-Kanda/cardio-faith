<?php

namespace App\Http\Controllers;

use App\Models\RendezVous;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Exports\RendezVousExport;
use Carbon\Carbon;
use Maatwebsite\Excel\Facades\Excel;
use DateTimeImmutable;
use DateInterval;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RendezVousController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $status = $request->input('status'); // Récupération des valeurs au lieu d'utiliser filled()
        $filter = $request->input('filter');

        $query = RendezVous::where('disable', false)->where('status', $status);

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
            $query->where('nom', 'like', "%{$searchTerm}%")
                ->orWhere('postnom', 'like', "%{$searchTerm}%")
                ->orWhere('prenom', 'like', "%{$searchTerm}%")
                ->orWhere('objet', 'like', "%{$searchTerm}%")
                ->orWhere('email', 'like', "%{$searchTerm}%");
        }

        // Pagination et réponse JSON
        $rendezVous = $query->orderBy('nom', 'asc')->paginate(50);
        return response()->json($rendezVous);
    }


    public function countByMonth($year)
    {
        $rendezVous = RendezVous::all()->filter(function ($rendezVous) use ($year) {
            return Carbon::parse($rendezVous->date)->year == $year;
        });
    
        $rendezVousParMois = $rendezVous->groupBy(function ($rendezVous) {
            return Carbon::parse($rendezVous->date)->format('n');
        })->map(function ($rendezVous) {
            return $rendezVous->count();
        });
    
        $rendezVousParMoisArray = $rendezVousParMois->toArray();
    
        ksort($rendezVousParMoisArray);
    
        $chartData = [];
        foreach ($rendezVousParMoisArray as $moisNumerique => $count) {
            $moisNom = date('F', mktime(0, 0, 0, $moisNumerique, 1));
            $chartData[] = [
                'name' => $moisNom,
                'assignments' => $count,
            ];
        }
    
        return response()->json($chartData);
    }
    
    

    public function getAllYears()
    {
        $years = RendezVous::selectRaw('YEAR(date) as year')
            ->distinct()
            ->pluck('year');

        return response()->json($years);
    }


    public function indexView()
    {
        return Inertia::render('rdv/index');
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

        $date = new DateTimeImmutable($request->date);

        $rendezVous = RendezVous::create([
            'nom' => $request->nom,
            'post_nom' => $request->postnom,
            'prenom' => $request->prenom,
            'phone' => $request->phone,
            'sexe' => $request->sexe,
            'date' => $date,
            'email' => $request->email,
            'objet' => $request->objet,
            'user_id' => Auth::user()->id,
        ]);

        return response($rendezVous, 201);
    }

    public function export($delai, $mois = null, $annee = null)
    {
        if ($delai == 'annee') {
            $date = new DateTimeImmutable($annee);
            $req = $date->format('Y');

            return Excel::download(new RendezVousExport($req), 'rapport des rendez-vous de ' . $req . '.xlsx');
        } elseif ($delai == 'mois') {

            $date = new DateTimeImmutable($mois);
            $req = $date->format('Y-m');

            return Excel::download(new RendezVousExport($req), 'rapport des rendez-vous de ' . $req . '.xlsx');
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

        if ($request->date) {
            $date = new DateTimeImmutable($request->date);
            $req = RendezVous::where('id', $rendezVous->id)->update([
                'status' => $request->status,
                'date' => $date,
            ]);
        } else {
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
        $req = RendezVous::where('id', $rendezVous->id)->update(['disable' => true]);

        return response($req, 201);
    }
}
