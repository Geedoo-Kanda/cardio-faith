<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use App\Models\Fiche;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromView;
use Carbon\Carbon;


class FicheExport implements FromView
{

    private $req;

    public function __construct( $req) 
    {
        $this->req = $req;
    }


    public function view(): View
    {
        return view('exports.fiche', [
            'fiches' => DB::table('fiche_medicales')
            ->join("users", "fiche_medicales.user_id", "=", "users.id")
            ->where('fiche_medicales.created_at', 'like', "%".$this->req."%")
            ->select("fiche_medicales.*", "users.name")->get()
        ]);
    }
}
