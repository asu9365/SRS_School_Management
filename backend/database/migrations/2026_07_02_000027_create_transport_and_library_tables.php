<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-14.9: Administration Workspace - Transport & Library Tables
     */
    public function up(): void
    {
        if (!Schema::hasTable('transport_vehicles')) {
            Schema::create('transport_vehicles', function (Blueprint $table) {
                $table->id();
                $table->string('vehicle_number');
                $table->string('model');
                $table->integer('capacity')->default(40);
                $table->string('status')->default('Active'); // Active, Maintenance, Inactive
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('transport_student_allocations')) {
            Schema::create('transport_student_allocations', function (Blueprint $table) {
                $table->id();
                $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
                $table->foreignId('transport_route_id')->constrained('transport_routes')->onDelete('cascade');
                $table->string('status')->default('Active');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('transport_maintenances')) {
            Schema::create('transport_maintenances', function (Blueprint $table) {
                $table->id();
                $table->foreignId('transport_vehicle_id')->constrained('transport_vehicles')->onDelete('cascade');
                $table->text('maintenance_details');
                $table->decimal('cost', 10, 2)->default(0.00);
                $table->date('date');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('transport_incidents')) {
            Schema::create('transport_incidents', function (Blueprint $table) {
                $table->id();
                $table->foreignId('transport_vehicle_id')->constrained('transport_vehicles')->onDelete('cascade');
                $table->text('description');
                $table->string('severity')->default('Minor'); // Minor, Major, Critical
                $table->date('date');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('library_books')) {
            Schema::create('library_books', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->string('isbn');
                $table->string('category');
                $table->string('status')->default('Available'); // Available, Issued, Reserved
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('library_issue_records')) {
            Schema::create('library_issue_records', function (Blueprint $table) {
                $table->id();
                $table->foreignId('library_book_id')->constrained('library_books')->onDelete('cascade');
                $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
                $table->timestamp('issued_at')->useCurrent();
                $table->date('return_due_date');
                $table->string('status')->default('Issued'); // Issued, Returned, Overdue
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('library_issue_records');
        Schema::dropIfExists('library_books');
        Schema::dropIfExists('transport_incidents');
        Schema::dropIfExists('transport_maintenances');
        Schema::dropIfExists('transport_student_allocations');
        Schema::dropIfExists('transport_vehicles');
    }
};
