<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use App\Models\RendezVous;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromView;
use Carbon\Carbon;


class RendezVousExport implements FromView
{

    private $req;

    public function __construct( $req) 
    {
        $this->req = $req;
    }


    public function view(): View
    {
        return view('exports.rendez-vous', [
            'rendezVous' => DB::table('rendez_vouses')
            ->join("users", "rendez_vouses.user_id", "=", "users.id")
            ->where('rendez_vouses.date', 'like', "%".$this->req."%")
            ->select("rendez_vouses.*", "users.name")->get()
        ]);
    }
}
