<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-13.16: Principal Workspace - Executive KPIs & Alert Rules Tables
     */
    public function up(): void
    {
        if (!Schema::hasTable('executive_kpis')) {
            Schema::create('executive_kpis', function (Blueprint $table) {
                $table->id();
                $table->string('kpi_name');
                $table->string('category'); // e.g. Academic, Financial, Operational
                $table->decimal('value', 8, 2)->default(0.00);
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('kpi_targets')) {
            Schema::create('kpi_targets', function (Blueprint $table) {
                $table->id();
                $table->string('kpi_name');
                $table->decimal('target_value', 8, 2)->default(0.00);
                $table->decimal('warning_threshold', 8, 2)->default(0.00);
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('alert_rules')) {
            Schema::create('alert_rules', function (Blueprint $table) {
                $table->id();
                $table->string('event_name');
                $table->string('priority')->default('Medium'); // Low, Medium, High, Critical
                $table->boolean('is_enabled')->default(true);
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('alert_history')) {
            Schema::create('alert_history', function (Blueprint $table) {
                $table->id();
                $table->string('event_name');
                $table->text('description');
                $table->string('severity')->default('Warning'); // Warning, Critical
                $table->string('status')->default('Active'); // Active, Acknowledged
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alert_history');
        Schema::dropIfExists('alert_rules');
        Schema::dropIfExists('kpi_targets');
        Schema::dropIfExists('executive_kpis');
    }
};
