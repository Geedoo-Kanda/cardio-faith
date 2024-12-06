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

        $query = RendezVous::where('status', $status);

        // Appliquer les filtres temporels
        switch ($filter) {
            case 'today':
                $query->whereDate('created_at', Carbon::today());
                break;
            case 'yesterday':
                $query->whereDate('created_at', Carbon::yesterday());
                break;
            case 'week':
                $query->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
                break;
            case 'month':
                $query->whereMonth('created_at', Carbon::now()->month)
                    ->whereYear('created_at', Carbon::now()->year);
                break;
            case 'year':
                $query->whereYear('created_at', Carbon::now()->year);
                break;
        }

        // Appliquer la recherche si un terme est fourni
        if ($request->filled('search')) {
            $searchTerm = $request->input('search');
            $query->where('nom', 'like', "%{$searchTerm}%")
                ->orWhere('post_nom', 'like', "%{$searchTerm}%")
                ->orWhere('prenom', 'like', "%{$searchTerm}%")
                ->orWhere('objet', 'like', "%{$searchTerm}%")
                ->orWhere('email', 'like', "%{$searchTerm}%");
        }

        // Pagination et réponse JSON
        $rendezVous = $query->orderBy('id', 'desc')->paginate(50);
        return response()->json($rendezVous);
    }

    public function countByMonth($year)
    {
        // Récupérer tous les rendez-vous de l'année spécifiée
        $rendezVous = RendezVous::whereYear('created_at', $year)->get();

        // Grouper les rendez-vous par mois (format numérique) et compter
        $rendezVousParMois = $rendezVous->groupBy(function ($rendezVous) {
            return $rendezVous->created_at->format('n'); // Format numérique du mois (1 à 12)
        })->map(function ($rendezVous) {
            return $rendezVous->count();
        });

        $rendezVousParMoisArray = $rendezVousParMois->toArray();

        // Trier par clé (mois numérique) pour assurer un ordre croissant
        ksort($rendezVousParMoisArray);

        // Formater les données pour le graphique (exemple)
        $chartData = [];
        foreach ($rendezVousParMoisArray as $moisNumerique => $count) {
            // Convertir le mois numérique en nom de mois (exemple en français)
            $moisNom = date('F', mktime(0, 0, 0, $moisNumerique, 1)); // F pour le nom complet du mois en anglais
            $chartData[] = [
                'name' => $moisNom,
                'assignments' => $count,
            ];
        }

        return response()->json($chartData);
    }

    public function getAllYears()
    {
        $years = RendezVous::selectRaw('YEAR(created_at) as year')
            ->distinct()
            ->pluck('year');

        return response()->json($years);
    }


    public function indexView()
    {
        return Inertia::render('rdv/index');
    }

    public function today()
    {
        $date = new DateTimeImmutable(now());
        $demain = $date->sub(new DateInterval('P1D'));
        $req = $demain->format('Y-m-d');

        $rdvs = RendezVous::where('date', 'like', '%' . $req . '%')->where('disable', 'false')
            ->orderBy('id', 'DESC')->paginate(50);

        return Inertia::render('rdv/index', [
            'rdvs' => $rdvs,
        ]);
    }


    public function tomorrow()
    {

        $date = new DateTimeImmutable(now());
        $req = $date->format('Y-m-d');


        $rdvs = RendezVous::where('date', 'like', '%' . $req . '%')->where('disable', 'false')
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
            $req = RendezVous::where('id', $rendezVous->id)->update([
                'status' => $request->status,
                'date' => $request->date,
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
        $req = RendezVous::where('id', $rendezVous->id)->update(['disable' => 'true']);

        return response($req, 201);
    }
}
