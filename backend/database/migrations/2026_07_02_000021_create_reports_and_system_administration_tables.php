<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-13.12: Principal Workspace - Reports & System Health Tables
     */
    public function up(): void
    {
        if (!Schema::hasTable('executive_reports')) {
            Schema::create('executive_reports', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->string('category'); // e.g. Academic, Financial, Operational
                $table->string('file_path');
                $table->integer('file_size')->default(0);
                $table->foreignId('generated_by')->constrained('users')->onDelete('cascade');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('scheduled_reports')) {
            Schema::create('scheduled_reports', function (Blueprint $table) {
                $table->id();
                $table->string('report_title');
                $table->string('recipient_email');
                $table->string('cron_expression')->default('0 0 * * *');
                $table->string('status')->default('Active'); // Active, Paused
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('api_webhooks')) {
            Schema::create('api_webhooks', function (Blueprint $table) {
                $table->id();
                $table->string('target_url');
                $table->string('event_type'); // e.g. student.enrolled, leave.requested
                $table->boolean('is_active')->default(true);
                $table->string('secret')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('api_webhook_logs')) {
            Schema::create('api_webhook_logs', function (Blueprint $table) {
                $table->id();
                $table->foreignId('webhook_id')->constrained('api_webhooks')->onDelete('cascade');
                $table->text('payload');
                $table->integer('response_status')->default(200);
                $table->text('response_body')->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('api_webhook_logs');
        Schema::dropIfExists('api_webhooks');
        Schema::dropIfExists('scheduled_reports');
        Schema::dropIfExists('executive_reports');
    }
};
