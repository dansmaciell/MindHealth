<?php

use App\Http\Controllers\Api\V1\Admin\ProjetoController;
use App\Http\Controllers\Api\V1\Admin\UsuarioController;
use App\Http\Controllers\Api\V1\Auth\LoginController;
use Illuminate\Support\Facades\Route;


// Route::resource('produtos', ProdutoController::class);

// Route::resource('pedidos', PedidoController::class);

Route::get('/teste', fn () => response()->json(['status' => 'ok']));

Route::post('/register', [LoginController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);

Route::get('/listar-projetos', [\App\Http\Controllers\Api\V1\ProjetoController::class, 'index']);

Route::middleware(['auth:sanctum'])->post('/auth/logout', [LoginController::class, 'logout']);

Route::middleware('auth:sanctum')->prefix('admin')->group(function () {

    Route::resource('usuarios', UsuarioController::class);
    Route::resource('/projetos', ProjetoController::class);
});
