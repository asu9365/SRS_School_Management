<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-14.17: Administration Workspace - Reports, Security & DB Tables
     */
    public function up(): void
    {
        if (!Schema::hasTable('report_definitions')) {
            Schema::create('report_definitions', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->string('category');
                $table->text('query_sql');
                $table->string('status')->default('Active'); // Active, Inactive
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('report_schedules')) {
            Schema::create('report_schedules', function (Blueprint $table) {
                $table->id();
                $table->foreignId('report_definition_id')->constrained('report_definitions')->onDelete('cascade');
                $table->string('recipient_email');
                $table->string('cron_expression');
                $table->string('status')->default('Active'); // Active, Suspended
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('api_clients')) {
            Schema::create('api_clients', function (Blueprint $table) {
                $table->id();
                $table->string('client_name');
                $table->string('client_id');
                $table->string('client_secret');
                $table->string('status')->default('Active'); // Active, Suspended
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('security_events')) {
            Schema::create('security_events', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
                $table->string('action');
                $table->string('ip_address');
                $table->string('status')->default('Logged');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('security_alerts')) {
            Schema::create('security_alerts', function (Blueprint $table) {
                $table->id();
                $table->text('description');
                $table->string('severity')->default('Medium'); // Low, Medium, High, Critical
                $table->string('status')->default('Open'); // Open, Resolved, Ignored
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('security_alerts');
        Schema::dropIfExists('security_events');
        Schema::dropIfExists('api_clients');
        Schema::dropIfExists('report_schedules');
        Schema::dropIfExists('report_definitions');
    }
};
