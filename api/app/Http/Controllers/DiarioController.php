<?php


namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class DiarioController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return response()->json([
            'usuario' => $user,
            'diarioemocional' => []
        ]);
    }
}

