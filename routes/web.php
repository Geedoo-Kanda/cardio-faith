<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\RendezVousController;
use App\Http\Controllers\FicheMedicaleController;
use App\Http\Controllers\CaisseController;
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
    Route::prefix('rendez-vous')->group(function () {
        Route::get('/liste', [RendezVousController::class, 'indexView'])->name('rendez-vous.indexView');
        Route::post('/', [RendezVousController::class, 'store'])->name('rendez-vous.store');
        Route::get('/delete/{rendezVous}', [RendezVousController::class, 'destroy'])->name('rendez-vous.destroy');
        Route::put('/{rendezVous}', [RendezVousController::class, 'update'])->name('rendez-vous.update');
    });
    
    Route::prefix('fiches')->group(function () {
        Route::get('/liste', [FicheMedicaleController::class, 'indexView'])->name('fiches.indexView');
        Route::post('/', [FicheMedicaleController::class, 'store'])->name('rfiches.store');
        Route::get('/delete/{fiches}', [FicheMedicaleController::class, 'destroy'])->name('rfiches.destroy');
        Route::put('/{fiches}', [FicheMedicaleController::class, 'update'])->name('rfiches.update');
    });
    
    Route::prefix('caisse')->group(function () {
        Route::get('/liste', [CaisseController::class, 'indexView'])->name('caisse.indexView');
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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
