<?php

use App\Http\Controllers\QuranController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/quran', [QuranController::class, 'index'])->name('quran.index');
Route::get('/quran/{chapter}', [QuranController::class, 'read'])->name('quran.chapter');
Route::get('/quran/juz/{juz}', [QuranController::class, 'read'])->name('quran.juz');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

require __DIR__ . '/auth.php';
