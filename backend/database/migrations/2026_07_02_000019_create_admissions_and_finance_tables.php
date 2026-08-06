<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-13.6: Principal Workspace - Admissions & Finance Governance Tables
     */
    public function up(): void
    {
        if (!Schema::hasTable('admission_cycles')) {
            Schema::create('admission_cycles', function (Blueprint $table) {
                $table->id();
                $table->string('session_name');
                $table->date('start_date');
                $table->date('end_date');
                $table->string('status')->default('Active'); // Active, Archival
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('seat_matrices')) {
            Schema::create('seat_matrices', function (Blueprint $table) {
                $table->id();
                $table->foreignId('class_room_id')->constrained('class_rooms')->onDelete('cascade');
                $table->integer('capacity')->default(40);
                $table->integer('filled_seats')->default(0);
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('scholarship_applications')) {
            Schema::create('scholarship_applications', function (Blueprint $table) {
                $table->id();
                $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
                $table->string('name');
                $table->decimal('amount', 10, 2)->default(0.00);
                $table->string('status')->default('Pending'); // Pending, Approved, Rejected
                $table->timestamp('approved_at')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('fee_categories')) {
            Schema::create('fee_categories', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->decimal('amount', 10, 2)->default(0.00);
                $table->text('description')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('budget_allocations')) {
            Schema::create('budget_allocations', function (Blueprint $table) {
                $table->id();
                $table->string('department_name');
                $table->string('fiscal_year');
                $table->decimal('allocated_amount', 12, 2)->default(0.00);
                $table->decimal('spent_amount', 12, 2)->default(0.00);
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('procurement_requests')) {
            Schema::create('procurement_requests', function (Blueprint $table) {
                $table->id();
                $table->string('item_name');
                $table->integer('quantity')->default(1);
                $table->decimal('estimated_cost', 10, 2)->default(0.00);
                $table->string('status')->default('Pending'); // Pending, Approved, Purchased
                $table->foreignId('requested_by')->constrained('users')->onDelete('cascade');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('procurement_requests');
        Schema::dropIfExists('budget_allocations');
        Schema::dropIfExists('fee_categories');
        Schema::dropIfExists('scholarship_applications');
        Schema::dropIfExists('seat_matrices');
        Schema::dropIfExists('admission_cycles');
    }
};
