<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-12.12: Teacher Security & Auditing
     */
    public function up(): void
    {
        if (!Schema::hasTable('login_histories')) {
            Schema::create('login_histories', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
                $table->string('ip_address')->nullable();
                $table->string('user_agent')->nullable();
                $table->string('status')->default('success'); // success, failed
                $table->timestamp('logged_at')->useCurrent();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('audit_logs')) {
            Schema::create('audit_logs', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
                $table->string('action'); // e.g. "export_report", "update_profile"
                $table->string('ip_address')->nullable();
                $table->string('user_agent')->nullable();
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
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('login_histories');
    }
};
