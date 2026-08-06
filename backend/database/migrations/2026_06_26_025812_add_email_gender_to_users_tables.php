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
        Schema::table('students', function (Blueprint $table) {
            $table->string('email')->nullable()->after('class');
            $table->string('gender')->nullable()->after('email');
        });

        Schema::table('teachers', function (Blueprint $table) {
            $table->string('email')->nullable()->after('Lname');
            $table->string('gender')->nullable()->after('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            $table->dropColumn(['email', 'gender']);
        });

        Schema::table('teachers', function (Blueprint $table) {
            $table->dropColumn(['email', 'gender']);
        });
    }
};
