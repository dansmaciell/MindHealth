<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class UnidadesSaudeController extends Controller
{
    public function index()
{
    try {
        $response = Http::withoutVerifying()->get(
            'https://apidadosabertos.saude.gov.br/cnes/estabelecimentos',
            [
                'status' => 1,
                'limit' => 100
            ]
        );

        if ($response->failed()) {
            return response()->json(['error' => 'Falha CNES'], 500);
        }

        $dados = $response->json();

        $unidadesFormosa = array_values(array_filter(
            $dados['estabelecimentos'] ?? [],
            fn ($u) =>
                ($u['codigo_municipio'] ?? null) == 5208008
        ));

        return response()->json([
            'data' => $unidadesFormosa
        ]);

    } catch (\Throwable $e) {
        return response()->json([
            'erro' => $e->getMessage()
        ], 500);
    }
}

}