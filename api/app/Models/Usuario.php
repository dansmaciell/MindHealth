<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'usuarios';

    protected $fillable = [
        'name',
        'email',
        'username',
        'password',
        'status',
    ];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = [
        'status' => 'boolean',
    ];

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }

    public function projetos()
    {
        return $this->hasMany(Projeto::class, 'usuario_id');
    }
}
