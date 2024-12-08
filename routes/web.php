<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\RendezVousController;
use App\Models\RendezVous;
use App\Models\Caisse;
use App\Http\Controllers\FicheMedicaleController;
use App\Http\Controllers\CaisseController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CompteRenduController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MessageController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('admin')->group(function () {

    Route::get('/all', [UserController::class, 'all'])->name('user.all');

    Route::middleware('role:Administrateur')->prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('user.index');
        Route::get('/show/{user}', [UserController::class, 'show'])->name('user.show');
        Route::get('/liste', [UserController::class, 'indexView'])->name('user.indexView');
        Route::post('/', [UserController::class, 'store'])->name('user.store');
        Route::get('/delete/{user}', [UserController::class, 'destroy'])->name('user.destroy');
        Route::put('/{user}', [UserController::class, 'update'])->name('user.update');
    });

    Route::middleware('role:Administrateur|Docteur')->prefix('compte-rendu')->group(function () {
        Route::put('/{fiche}', [CompteRenduController::class, 'update'])->name('compte-rendu.update');
    });

    Route::get('/byMonth/{year}', [RendezVousController::class, 'countByMonth'])->name('rendez-vous.countByMonth');
    Route::get('/all/years', [RendezVousController::class, 'getAllYears'])->name('rendez-vous.getAllYears');
    Route::middleware('role:Administrateur|Secretaire')->prefix('rendez-vous')->group(function () {
        Route::get('/', [RendezVousController::class, 'index'])->name('rendez-vous');
        Route::get('/liste', [RendezVousController::class, 'indexView'])->name('rendez-vous.indexView');
        Route::post('/', [RendezVousController::class, 'store'])->name('rendez-vous.store');
        Route::get('/export/{delai}/{mois?}/{annee?}', [RendezVousController::class, 'export'])
            ->name('rendez-vous.export');
        Route::get('/delete/{rendezVous}', [RendezVousController::class, 'destroy'])->name('rendez-vous.destroy');
        Route::put('/{rendezVous}', [RendezVousController::class, 'update'])->name('rendez-vous.update');
    });

    Route::middleware('role:Administrateur|Secretaire|Docteur')->prefix('fiches')->group(function () {
        Route::get('/', [FicheMedicaleController::class, 'index'])->name('fiches');
        Route::get('/liste', [FicheMedicaleController::class, 'indexView'])->name('fiches.indexView');
        Route::post('/', [FicheMedicaleController::class, 'store'])->name('fiches.store');
        Route::get('/delete/{ficheMedicale}', [FicheMedicaleController::class, 'destroy'])->name('fiches.destroy');
        Route::put('/{ficheMedicale}', [FicheMedicaleController::class, 'update'])->name('fiches.update');
        Route::get('/export/{delai}/{mois?}/{annee?}', [FicheMedicaleController::class, 'export'])
            ->name('fiches.export');
    });

    Route::middleware('role:Administrateur|Secretaire')->prefix('messages')->group(function () {
        Route::get('/', [MessageController::class, 'index'])->name('message');
        Route::get('/liste', [MessageController::class, 'indexView'])->name('message.indexView');
        Route::post('/', [MessageController::class, 'store'])->name('message.store');
        Route::get('/delete/{message}', [MessageController::class, 'destroy'])->name('message.destroy');
        Route::put('/{message}', [MessageController::class, 'update'])->name('message.update');
    });

    Route::get('/chart/byMonth/{year}', [CaisseController::class, 'countByMonth'])->name('caisse.countByMonth');
    Route::middleware('role:Administrateur|Caissier')->prefix('caisse')->group(function () {
        Route::get('/', [CaisseController::class, 'index'])->name('caisse');
        Route::get('/liste', [CaisseController::class, 'indexView'])->name('caisse.indexView');
        Route::post('/', [CaisseController::class, 'store'])->name('caisse.store');
        Route::get('/delete/{caisse}', [CaisseController::class, 'destroy'])->name('caisse.destroy');
        Route::put('/{caisse}', [CaisseController::class, 'update'])->name('caisse.update');
        Route::get('/export/{delai}/{mois?}/{annee?}', [CaisseController::class, 'export'])
            ->name('rendez-vous.export');
    });
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/sitemap', function () {
    return view('sitemap');
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
