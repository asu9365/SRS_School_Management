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
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->string('Fname');
            $table->string('Mname')->nullable();
            $table->string('Lname');
            $table->string('caste')->nullable();
            $table->date('DOB');
            $table->string('Phone');
            $table->string('blood');
            $table->string('Ftname')->nullable();
            $table->string('Fcontact')->nullable();
            $table->string('Mtname')->nullable();
            $table->string('Mcontact')->nullable();
            $table->string('address')->nullable();
            $table->string('POaddress')->nullable();
            $table->string('pin')->nullable();
            $table->string('Dist')->nullable();
            $table->string('State')->nullable();
            $table->text('qualification')->nullable();
            $table->text('experience')->nullable();
            $table->string('classAssign')->nullable();
            $table->string('role')->default('Assistant Teacher');
            $table->string('image')->nullable();
            $table->text('message')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
