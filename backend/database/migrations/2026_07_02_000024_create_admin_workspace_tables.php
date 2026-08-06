<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-14.1: Administration Workspace - Core Dashboard Tables
     */
    public function up(): void
    {
        if (!Schema::hasTable('admin_dashboards')) {
            Schema::create('admin_dashboards', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
                $table->string('theme')->default('default');
                $table->text('layout_preferences')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('daily_work_queues')) {
            Schema::create('daily_work_queues', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->foreignId('assigned_to')->constrained('users')->onDelete('cascade');
                $table->string('priority')->default('Medium'); // Low, Medium, High
                $table->string('status')->default('Pending'); // Pending, Completed
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('approval_queues')) {
            Schema::create('approval_queues', function (Blueprint $table) {
                $table->id();
                $table->string('type'); // e.g. Fee Waiver, Leave Request, Purchase
                $table->text('description');
                $table->string('status')->default('Pending'); // Pending, Approved, Rejected
                $table->foreignId('requested_by')->constrained('users')->onDelete('cascade');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('admin_notifications')) {
            Schema::create('admin_notifications', function (Blueprint $table) {
                $table->id();
                $table->foreignId('recipient_id')->constrained('users')->onDelete('cascade');
                $table->string('title');
                $table->text('message');
                $table->string('status')->default('Unread'); // Unread, Read
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_notifications');
        Schema::dropIfExists('approval_queues');
        Schema::dropIfExists('daily_work_queues');
        Schema::dropIfExists('admin_dashboards');
    }
};
