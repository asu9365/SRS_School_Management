<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-13: Principal Workspace - Dashboard & Logs Tables
     */
    public function up(): void
    {
        if (!Schema::hasTable('principal_dashboards')) {
            Schema::create('principal_dashboards', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
                $table->json('layout_config')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('school_health_scores')) {
            Schema::create('school_health_scores', function (Blueprint $table) {
                $table->id();
                $table->decimal('overall_score', 5, 2)->default(0);
                $table->decimal('academic_index', 5, 2)->default(0);
                $table->decimal('operations_index', 5, 2)->default(0);
                $table->timestamp('recorded_at')->useCurrent();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('executive_alerts')) {
            Schema::create('executive_alerts', function (Blueprint $table) {
                $table->id();
                $table->string('type');
                $table->string('title');
                $table->text('message');
                $table->boolean('is_resolved')->default(false);
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('dashboard_preferences')) {
            Schema::create('dashboard_preferences', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
                $table->string('theme')->default('light');
                $table->json('widgets_enabled')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('executive_activity_logs')) {
            Schema::create('executive_activity_logs', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
                $table->string('action');
                $table->text('details')->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('executive_activity_logs');
        Schema::dropIfExists('dashboard_preferences');
        Schema::dropIfExists('executive_alerts');
        Schema::dropIfExists('school_health_scores');
        Schema::dropIfExists('principal_dashboards');
    }
};
