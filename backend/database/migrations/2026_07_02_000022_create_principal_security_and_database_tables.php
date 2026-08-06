<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-13.14: Principal Workspace - Security & Database Status Tables
     */
    public function up(): void
    {
        if (!Schema::hasTable('trusted_devices')) {
            Schema::create('trusted_devices', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
                $table->string('device_name');
                $table->string('ip_address');
                $table->boolean('is_trusted')->default(true);
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('security_policies')) {
            Schema::create('security_policies', function (Blueprint $table) {
                $table->id();
                $table->string('policy_name');
                $table->text('description')->nullable();
                $table->string('value')->nullable();
                $table->boolean('is_enabled')->default(true);
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('password_histories')) {
            Schema::create('password_histories', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
                $table->string('password_hash');
                $table->timestamp('changed_at')->useCurrent();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('executive_approvals')) {
            Schema::create('executive_approvals', function (Blueprint $table) {
                $table->id();
                $table->foreignId('requested_by')->constrained('users')->onDelete('cascade');
                $table->string('action_name');
                $table->string('status')->default('Pending'); // Pending, Approved, Rejected
                $table->timestamp('approved_at')->nullable();
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('executive_approvals');
        Schema::dropIfExists('password_histories');
        Schema::dropIfExists('security_policies');
        Schema::dropIfExists('trusted_devices');
    }
};
