<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\RendezVous;
use Illuminate\Support\Facades\Mail;
use App\Mail\MailNotify;
use App\Mail\RappelMail;

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

        $users = RendezVous::where('date', 'like', '%'.date("Y-m-d").'%');
        foreach ($users as $user) {
            Mail::to('geedookanda06@gmail.com')->queue(new RappelMail($user));
        }
    }
}
