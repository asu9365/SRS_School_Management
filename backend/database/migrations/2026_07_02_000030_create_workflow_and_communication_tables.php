<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-14.15: Administration Workspace - Workflow & Communication Tables
     */
    public function up(): void
    {
        if (!Schema::hasTable('workflow_definitions')) {
            Schema::create('workflow_definitions', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->text('description');
                $table->string('trigger_event');
                $table->string('status')->default('Active'); // Active, Inactive
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('workflow_tasks')) {
            Schema::create('workflow_tasks', function (Blueprint $table) {
                $table->id();
                $table->foreignId('workflow_definition_id')->constrained('workflow_definitions')->onDelete('cascade');
                $table->string('title');
                $table->string('status')->default('Pending'); // Pending, Approved, Rejected
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('workflow_logs')) {
            Schema::create('workflow_logs', function (Blueprint $table) {
                $table->id();
                $table->foreignId('workflow_definition_id')->constrained('workflow_definitions')->onDelete('cascade');
                $table->text('log_message');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('workflow_sla')) {
            Schema::create('workflow_sla', function (Blueprint $table) {
                $table->id();
                $table->foreignId('workflow_definition_id')->constrained('workflow_definitions')->onDelete('cascade');
                $table->integer('escalation_hours')->default(24);
                $table->string('priority')->default('Medium'); // Low, Medium, High
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('broadcast_messages')) {
            Schema::create('broadcast_messages', function (Blueprint $table) {
                $table->id();
                $table->foreignId('sender_id')->constrained('users')->onDelete('cascade');
                $table->string('title');
                $table->text('message');
                $table->string('target_audience')->default('All'); // All, Teachers, Parents, Students
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('broadcast_messages');
        Schema::dropIfExists('workflow_sla');
        Schema::dropIfExists('workflow_logs');
        Schema::dropIfExists('workflow_tasks');
        Schema::dropIfExists('workflow_definitions');
    }
};
