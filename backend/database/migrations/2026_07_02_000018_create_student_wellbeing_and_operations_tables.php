<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-13.4: Principal Workspace - Student Success, Wellbeing & Operational Governance Tables
     */
    public function up(): void
    {
        if (!Schema::hasTable('student_risk_profiles')) {
            Schema::create('student_risk_profiles', function (Blueprint $table) {
                $table->id();
                $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
                $table->string('risk_level')->default('Low'); // Low, Medium, High
                $table->text('risk_factors')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('student_wellbeing')) {
            Schema::create('student_wellbeing', function (Blueprint $table) {
                $table->id();
                $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
                $table->decimal('happiness_index', 4, 2)->default(5.00); // 1 to 10 scale
                $table->decimal('social_index', 4, 2)->default(5.00);
                $table->text('counselor_notes')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('infrastructure_assets')) {
            Schema::create('infrastructure_assets', function (Blueprint $table) {
                $table->id();
                $table->string('asset_name');
                $table->string('category'); // e.g. Laboratory, Classroom, Sports
                $table->string('status')->default('Functional'); // Functional, Damaged, Under Maintenance
                $table->string('location');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('transport_routes')) {
            Schema::create('transport_routes', function (Blueprint $table) {
                $table->id();
                $table->string('route_name');
                $table->string('vehicle_no');
                $table->string('driver_name');
                $table->string('status')->default('Active');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('maintenance_requests')) {
            Schema::create('maintenance_requests', function (Blueprint $table) {
                $table->id();
                $table->foreignId('asset_id')->constrained('infrastructure_assets')->onDelete('cascade');
                $table->text('description');
                $table->string('status')->default('Pending'); // Pending, Approved, Work in Progress, Resolved
                $table->foreignId('reported_by')->constrained('users')->onDelete('cascade');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('security_incidents')) {
            Schema::create('security_incidents', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->string('category');
                $table->text('description');
                $table->string('severity')->default('Minor'); // Minor, Moderate, Critical
                $table->timestamp('reported_at')->useCurrent();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('security_incidents');
        Schema::dropIfExists('maintenance_requests');
        Schema::dropIfExists('transport_routes');
        Schema::dropIfExists('infrastructure_assets');
        Schema::dropIfExists('student_wellbeing');
        Schema::dropIfExists('student_risk_profiles');
    }
};
