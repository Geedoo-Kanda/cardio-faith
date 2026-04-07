<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use App\Models\RendezVous;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromView;
use Carbon\Carbon;

class CaisseExport implements FromView
{
    private $req;
    private $operation;

    public function __construct($req, $operation)
    {
        $this->req = $req;
        $this->operation = $operation;
    }


    public function view(): View
    {
        return view('exports.caisse', [
            'caisse' => DB::table('caisses')
                ->join("users", "caisses.user_id", "=", "users.id")
                ->where('caisses.date', 'like', "%" . $this->req . "%")
                ->where('caisses.operation', $this->operation)
                ->select("caisses.*", "users.name")->get()
        ]);
    }
}
