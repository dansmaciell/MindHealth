<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projeto extends Model
{
    use HasFactory;

    protected $table = 'projetos';

    protected $fillable = [
        'titulo',
        'publico_alvo',
        'data_inscricao',
        'data_inicio',
        'vagas',
        'imagem',
        'usuario_id',
    ];

    protected $casts = [
        'data_inscricao' => 'date',
        'data_inicio' => 'date',
        'vagas' => 'integer',
    ];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }
}
