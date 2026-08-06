<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-14.11: Administration Workspace - Hostel & Inventory Tables
     */
    public function up(): void
    {
        if (!Schema::hasTable('hostels')) {
            Schema::create('hostels', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('type')->default('Boys'); // Boys, Girls, Co-ed
                $table->integer('capacity')->default(100);
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('hostel_rooms')) {
            Schema::create('hostel_rooms', function (Blueprint $table) {
                $table->id();
                $table->foreignId('hostel_id')->constrained('hostels')->onDelete('cascade');
                $table->string('room_number');
                $table->integer('capacity')->default(4);
                $table->string('status')->default('Available'); // Available, Full
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('hostel_room_allocations')) {
            Schema::create('hostel_room_allocations', function (Blueprint $table) {
                $table->id();
                $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
                $table->foreignId('hostel_room_id')->constrained('hostel_rooms')->onDelete('cascade');
                $table->string('status')->default('Active');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('hostel_leave_requests')) {
            Schema::create('hostel_leave_requests', function (Blueprint $table) {
                $table->id();
                $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
                $table->text('reason');
                $table->date('start_date');
                $table->date('end_date');
                $table->string('status')->default('Pending'); // Pending, Approved, Rejected
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('hostel_visitors')) {
            Schema::create('hostel_visitors', function (Blueprint $table) {
                $table->id();
                $table->foreignId('resident_id')->constrained('students')->onDelete('cascade');
                $table->string('visitor_name');
                $table->string('relationship');
                $table->date('visit_date');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('inventory_items')) {
            Schema::create('inventory_items', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->integer('quantity')->default(0);
                $table->string('category');
                $table->string('status')->default('In Stock');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('asset_allocations')) {
            Schema::create('asset_allocations', function (Blueprint $table) {
                $table->id();
                $table->foreignId('teacher_id')->constrained('teachers')->onDelete('cascade');
                $table->string('item_name');
                $table->integer('quantity')->default(1);
                $table->timestamp('allocated_at')->useCurrent();
                $table->string('status')->default('Allocated'); // Allocated, Returned
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_allocations');
        Schema::dropIfExists('inventory_items');
        Schema::dropIfExists('hostel_visitors');
        Schema::dropIfExists('hostel_leave_requests');
        Schema::dropIfExists('hostel_room_allocations');
        Schema::dropIfExists('hostel_rooms');
        Schema::dropIfExists('hostels');
    }
};
