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
            'footnoteCount' => 0,
            'mode' => $this->mode,
            'fonts' => []
        ];

        return Inertia::render('Quran/Read', $value);
    }
}
