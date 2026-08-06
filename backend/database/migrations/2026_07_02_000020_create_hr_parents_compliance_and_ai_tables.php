<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-13.8: Principal Workspace - HR, Parents, Compliance & AI Predictors Tables
     */
    public function up(): void
    {
        if (!Schema::hasTable('recruitment_requests')) {
            Schema::create('recruitment_requests', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->string('department');
                $table->string('status')->default('Pending'); // Pending, Approved, Closed
                $table->date('requested_date');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('parent_feedbacks')) {
            Schema::create('parent_feedbacks', function (Blueprint $table) {
                $table->id();
                $table->foreignId('parent_id')->constrained('users')->onDelete('cascade');
                $table->text('message');
                $table->integer('rating')->default(5);
                $table->string('status')->default('Active');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('parent_complaints')) {
            Schema::create('parent_complaints', function (Blueprint $table) {
                $table->id();
                $table->foreignId('parent_id')->constrained('users')->onDelete('cascade');
                $table->string('subject');
                $table->text('description');
                $table->string('status')->default('Pending'); // Pending, Investigating, Resolved
                $table->timestamp('resolved_at')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('risk_registers')) {
            Schema::create('risk_registers', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->text('description');
                $table->string('category'); // e.g. Financial, Operational, Regulatory
                $table->string('risk_level')->default('Medium'); // Low, Medium, High
                $table->string('status')->default('Active');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('ai_predictions')) {
            Schema::create('ai_predictions', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
                $table->string('category');
                $table->text('description');
                $table->decimal('confidence_score', 4, 2)->default(0.00);
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ai_predictions');
        Schema::dropIfExists('risk_registers');
        Schema::dropIfExists('parent_complaints');
        Schema::dropIfExists('parent_feedbacks');
        Schema::dropIfExists('recruitment_requests');
    }
};
