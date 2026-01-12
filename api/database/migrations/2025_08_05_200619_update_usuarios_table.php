<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('usuarios')->insert([
            [
                'nome' => 'Daniel',
                'email' => 'daniel@gmail.com',
                'username' => 'daniel',
                'password' => bcrypt('senha123'),
                'status' => true
            ],
            [
                'nome' => 'Robson',
                'email' => 'Robson@gmail.com',
                'username' => 'robson',
                'password' => bcrypt('senha123'),
                'status' => true
            ]
        ]);
    }

    public function down(): void
    {
        DB::table('usuarios')->where('username', 'admin')->delete();
    }
};
