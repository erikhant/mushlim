<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class QuranController extends Controller
{
    public $mode;

    public function __construct()
    {
        $this->mode = request()->query('mode', 1) ?? 1;
    }

    public function index()
    {
        return Inertia::render('Quran/Index');
    }

    public function read(Request $request)
    {
        $value['quran'] = [
            'chapter' => $request->chapter,
            'juz' => $request->juz,
            'mode' => $this->mode,
            'fonts' => [],
            'footnoteCount' => 0
        ];

        $value['baseURL'] =  env('APP_URL');

        return Inertia::render('Quran/Read', $value);
    }
}
