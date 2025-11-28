<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UsuarioController extends Controller
{
    public function index()
    {
        return response()->json(
            [
                'usuarios' => Usuario::all()
            ]
        );
    }

    public function show(Usuario $usuario)
    {
        return response()->json([
            'usuario' => $usuario
        ], 200);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:100',
                'email' => 'required|email',
                'username' => 'required|string|max:100',
                'password' => 'required|string|min:8',
            ]);

            Usuario::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'username' => $validated['username'],
                'password' => $validated['password'],
                'status' => true,
            ]);

            return response()->json([
                'msg' => "Usuário criado com sucesso!",
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'msg' => 'Erro ao cadastrar usuário.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function destroy($id, Request $request)
    {
        try {
            $usuario = Usuario::findOrFail($id);
            $usernameLogado = $request->input('username');

            if ($usuario->username === $usernameLogado) {
                return response()->json([
                    'msg' => 'Você não pode excluir o seu próprio usuário.'
                ], 403);
            }

            $usuario->delete();

            return response()->json([
                'msg' => 'Usuário excluído com sucesso.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'msg' => 'Erro ao excluir o usuário.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $usuario = Usuario::findOrFail($id);

            $validated = $request->validate([
                'name' => 'required|string|max:100',
                'email' => [
                    'required',
                    'email',
                    Rule::unique('usuarios')->ignore($usuario->id),
                ],
                'username' => [
                    'required',
                    'string',
                    'max:100',
                    Rule::unique('usuarios')->ignore($usuario->id),
                ],
                'password' => 'nullable|string|min:8',
                'status' => 'required|boolean',
            ]);

            if (empty($validated['password'])) {
                unset($validated['password']);
            }

            $usuario->update($validated);

            return response()->json([
                'msg' => 'Usuário atualizado com sucesso!',
                'usuario' => $usuario,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'msg' => 'Erro ao atualizar usuário.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}
