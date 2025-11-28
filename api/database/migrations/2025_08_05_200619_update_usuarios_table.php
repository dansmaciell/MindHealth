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
                'name' => 'Bruno',
                'email' => 'bruno@gmail.com',
                'username' => 'bruno',
                'password' => bcrypt('senha123'),
                'status' => true
            ],
            [
                'name' => 'Matheus',
                'email' => 'matheus@gmail.com',
                'username' => 'matheus',
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
