<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\V1\ProjetoController;
use App\Http\Controllers\Api\V1\Admin\UsuarioController;
use App\Http\Controllers\DiarioController;
use App\Http\Controllers\UnidadesSaudeController;

Route::get('/teste', fn () => response()->json(['status' => 'ok']));

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('/me', function (Request $request) {
        return $request->user();
    });
});

Route::middleware('auth:api')->group(function () {

    Route::get('/me', function () {
        return response()->json(auth('api')->user());
    });

    Route::get('/listar-projetos', [ProjetoController::class, 'index']);

    Route::prefix('admin')->group(function () {
        Route::resource('usuarios', UsuarioController::class);
        Route::resource('projetos', ProjetoController::class);
    });
});

Route::middleware('auth:api')->group(function () {

    Route::get('/diarioemocional', [DiarioController::class, 'index']);
    Route::post('/diarioemocional', [DiarioController::class, 'store']);

});

Route::get('/unidades-saude', function () {
    set_time_limit(60); 

    $contexto = stream_context_create([
        "ssl" => [
            "verify_peer" => false,
            "verify_peer_name" => false,
        ],
        "http" => [
            "timeout" => 15,
            "ignore_errors" => true,
            "header" => "User-Agent: Mozilla/5.0"
        ]
    ]);
    
    $listaCombinada = [];

    
    $locais = [
        ['tipo' => 'codigo_municipio', 'valor' => 520800],
        ['tipo' => 'codigo_municipio', 'valor' => 521760], 
        ['tipo' => 'codigo_uf', 'valor' => 53]             
    ];

    
    $termosDeBusca = [
        'HOSPITAL',
        'UPA',
        'UBS',
        'CAPS',
        'SAMU',
        'PLANALTINA',  
        'SOBRADINHO'   
    ];

    foreach ($locais as $local) {
        foreach ($termosDeBusca as $termo) {
            if ($local['valor'] == 521760 && in_array($termo, ['SOBRADINHO', 'PLANALTINA'])) {
                 continue; 
            }

            $termoUrl = urlencode($termo);
            $url = "https://apidadosabertos.saude.gov.br/cnes/estabelecimentos?limit=30&pagina=1&status=1&{$local['tipo']}={$local['valor']}&nome_fantasia={$termoUrl}";
            $json = @file_get_contents($url, false, $contexto);
            
            if ($json) {
                $dados = json_decode($json, true);
                $novos = $dados['estabelecimentos'] ?? [];
                if (!empty($novos)) {
                    $listaCombinada = array_merge($listaCombinada, $novos);
                }
            }
        }
    }

    $termosProibidos = [
        'LTDA', 'S/A', 'S.A', 'S/S', 'SERVICOS MEDICOS', 'CLINICA', 
        'CONSULTORIO', 'PARTICULAR', 'VETERINARIA', 'ESTETICA', 
        'DAY HOSPITAL', 'OTICA', 'DROGARIA', 'LABORATORIO'
    ];

    $listaFiltrada = array_filter($listaCombinada, function($item) use ($termosProibidos) {
        $nome = strtoupper($item['nome_fantasia'] ?? '');
        $lat = floatval($item['latitude_estabelecimento_decimo_grau'] ?? 0);
        $lon = floatval($item['longitude_estabelecimento_decimo_grau'] ?? 0);

        if ($lat == 0 || $lon == 0) return false;

        foreach ($termosProibidos as $proibido) {
            if (strpos($nome, $proibido) !== false) {
                if ($proibido === 'CLINICA' && strpos($nome, 'FAMILIA') !== false) continue;
                return false; 
            }
        }
        return true;
    });

    $listaUnica = [];
    foreach ($listaFiltrada as $item) {
        $id = $item['codigo_cnes'] ?? null;
        if ($id && !isset($listaUnica[$id])) {
            $listaUnica[$id] = $item;
        }
    }

    $unidadesFormatadas = array_map(function ($item) {
        return [
            'id' => $item['codigo_cnes'] ?? rand(),
            'nome' => $item['nome_fantasia'] ?? 'Sem Nome',
            'latitude' => floatval($item['latitude_estabelecimento_decimo_grau'] ?? 0),
            'longitude' => floatval($item['longitude_estabelecimento_decimo_grau'] ?? 0),
            'endereco' => ($item['endereco_estabelecimento'] ?? '') . ', ' . ($item['bairro_estabelecimento'] ?? ''),
            'telefone' => $item['numero_telefone_estabelecimento'] ?? null
        ];
    }, array_values($listaUnica));

    return response()
        ->json(['data' => $unidadesFormatadas], 200, [], JSON_UNESCAPED_UNICODE)
        ->header('Access-Control-Allow-Origin', '*') 
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
});

