<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Projeto;

class ProjetoController extends Controller
{
    public function index()
    {
        $projetos = Projeto::all();

        return response()->json([
            'projetos' => $projetos
        ], 200);
    }
}
