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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('class_id'); // e.g., "10-A"
            $table->date('date');
            $table->enum('status', ['Present', 'Absent', 'Late', 'Half-Day'])->default('Present');
            $table->text('remarks')->nullable();
            $table->timestamps();
            
            // Prevent duplicate attendance records for the same student on the same day
            $table->unique(['user_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
