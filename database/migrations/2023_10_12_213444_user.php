<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('login')->nullable()->unique();
            $table->string('name')->nullable();
            $table->string('surname')->nullable();
            $table->string('city')->nullable();
            $table->string('street')->nullable();
            $table->string('street_number')->nullable();
            $table->string('post_code')->nullable();
            $table->string('country')->nullable();
            $table->tinyInteger('deleted')->default(0);
            $table->dateTime('created_at')->nullable();
            $table->dateTime('update_at')->nullable();
            $table->time('delete_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::drop('users');
    }
};
