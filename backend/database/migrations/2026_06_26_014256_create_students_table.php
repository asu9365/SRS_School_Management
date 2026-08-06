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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('Fname');
            $table->string('Mname')->nullable();
            $table->string('Lname');
            $table->string('class');
            $table->string('rollno');
            $table->string('caste')->nullable();
            $table->date('DOB');
            $table->string('blood');
            $table->string('Ftname')->nullable();
            $table->string('Fcontact')->nullable();
            $table->string('Foccupation')->nullable();
            $table->string('Mtname')->nullable();
            $table->string('Mcontact')->nullable();
            $table->string('Moccupation')->nullable();
            $table->string('Gurdian')->nullable();
            $table->string('Gcontact')->nullable();
            $table->string('address');
            $table->string('POaddress')->nullable();
            $table->string('pin');
            $table->string('Dist');
            $table->string('State');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
