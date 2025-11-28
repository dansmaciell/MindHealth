<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Projeto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjetoController extends Controller
{
    public function index()
    {
        $projetos = Projeto::all();

        return response()->json([
            'projetos' => $projetos
        ], 200);
    }

    public function show(Projeto $projeto)
    {
        return response()->json([
            'projeto' => $projeto
        ], 200);
    }

    public function store(Request $request)
    {
        // Validação dos dados
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'publicoAlvo' => 'required|string|max:255',
            'dataInscricao' => 'required|date',
            'dataInicio' => 'required|date|after_or_equal:dataInscricao',
            'vagas' => 'required|integer|min:1',
            'imagem' => 'nullable|file|image|max:2048',
            'usuario_id' => 'nullable|integer',
        ]);

        // Upload da imagem (salva no storage/app/public/projetos)
        $imagemPath = null;
        if ($request->hasFile('imagem')) {
            $imagemPath = $request->file('imagem')->store('projetos', 'public');
        }

        // Criar o projeto com Eloquent ORM
        $projeto = Projeto::create([
            'titulo' => $validated['titulo'],
            'publico_alvo' => $validated['publicoAlvo'],
            'data_inscricao' => $validated['dataInscricao'],
            'data_inicio' => $validated['dataInicio'],
            'vagas' => $validated['vagas'],
            'imagem' => $imagemPath,
            'usuario_id' => auth()->id(),
        ]);

        return response()->json([
            'msg' => 'Projeto criado com sucesso!',
            'projeto' => $projeto,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        try {
            $projeto = Projeto::findOrFail($id);

            $validated = $request->validate([
                'titulo' => 'required|string|max:255',
                'publicoAlvo' => 'required|string|max:255',
                'dataInscricao' => 'required|date',
                'dataInicio' => 'required|date|after_or_equal:dataInscricao',
                'vagas' => 'required|integer|min:1',
                'imagem' => 'nullable|file|image|max:2048',
                'usuario_id' => 'nullable|integer',
            ]);

            // Tratar upload da imagem
            if ($request->hasFile('imagem')) {
                if ($projeto->imagem) {
                    \Storage::disk('public')->delete($projeto->imagem);
                }
                $imagemPath = $request->file('imagem')->store('projetos', 'public');
                $validated['imagem'] = $imagemPath;
            }

            $projeto->update([
                'titulo' => $validated['titulo'],
                'publico_alvo' => $validated['publicoAlvo'],
                'data_inscricao' => $validated['dataInscricao'],
                'data_inicio' => $validated['dataInicio'],
                'vagas' => $validated['vagas'],
                'imagem' => $validated['imagem'] ?? $projeto->imagem,
            ]);

            return response()->json([
                'msg' => 'Projeto atualizado com sucesso!',
                'projeto' => $projeto,
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $ve) {
            return response()->json([
                'msg' => 'Erro de validação.',
                'errors' => $ve->errors(),
            ], 422);
        } catch (\Exception $e) {
            \Log::error("Erro ao atualizar projeto: " . $e->getMessage());

            return response()->json([
                'msg' => 'Erro ao atualizar projeto.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $projeto = Projeto::findOrFail($id);

            // Se tiver imagem, deleta do storage
            if ($projeto->imagem) {
                \Storage::disk('public')->delete($projeto->imagem);
            }

            // Deleta o projeto
            $projeto->delete();

            return response()->json([
                'msg' => 'Projeto excluído com sucesso!',
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'msg' => 'Projeto não encontrado.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'msg' => 'Erro ao excluir projeto.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
