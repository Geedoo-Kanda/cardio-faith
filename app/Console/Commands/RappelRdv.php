<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\RendezVous;
use Illuminate\Support\Facades\Mail;
use App\Mail\RappelRdvMail;

use DateTimeImmutable;

class RappelRdv extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:rappel-rdv';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = new DateTimeImmutable(now());
        $rapel = $now->format('Y-m-d');

        $users = RendezVous::where('status', 'A venir')->orWhere('status', 'repporte')
        ->where('date', 'like', '%'.$rapel.'%')->get();
        foreach ($users as $user) {
            Mail::to($user->email)->queue(new RappelRdvMail($user));
        }

    }
}
