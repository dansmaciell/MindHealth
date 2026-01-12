<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log; 
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:100',
            'username' => 'required|string|max:100|unique:usuarios',
            'email' => 'required|email|unique:usuarios',
            'password' => 'required|min:6',
        ]);

        $user = Usuario::create([
            'nome' => $request->nome,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Usuário registrado com sucesso',
            'user' => $user
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        // Tenta autenticar
        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Credenciais inválidas'], 401);
        }

        // --- CORREÇÃO AQUI ---
        // O React espera 'token', então vamos enviar 'token' explicitamente.
        return response()->json([
            'token' => $token,        // <--- AQUI ESTAVA O ERRO (Antes era só access_token)
            'access_token' => $token, // Mantive esse por garantia/padrão
            'token_type'   => 'bearer',
            'user'         => auth('api')->user()
        ]);
    }

    public function me()
    {
        return response()->json(auth('api')->user());
    }
}