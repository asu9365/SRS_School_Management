<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-12.12: Teacher Workspace - Communication & AI Log Tables
     */
    public function up(): void
    {
        if (!Schema::hasTable('message_threads')) {
            Schema::create('message_threads', function (Blueprint $table) {
                $table->id();
                $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('messages')) {
            Schema::create('messages', function (Blueprint $table) {
                $table->id();
                $table->foreignId('thread_id')->constrained('message_threads')->onDelete('cascade');
                $table->foreignId('sender_id')->constrained('users')->onDelete('cascade');
                $table->text('content');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('message_attachments')) {
            Schema::create('message_attachments', function (Blueprint $table) {
                $table->id();
                $table->foreignId('message_id')->constrained('messages')->onDelete('cascade');
                $table->string('file_path');
                $table->string('file_name');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('announcements')) {
            Schema::create('announcements', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->text('content');
                $table->foreignId('published_by')->constrained('users')->onDelete('cascade');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('communication_logs')) {
            Schema::create('communication_logs', function (Blueprint $table) {
                $table->id();
                $table->foreignId('sender_id')->constrained('users')->onDelete('cascade');
                $table->foreignId('recipient_id')->constrained('users')->onDelete('cascade');
                $table->string('channel'); // e.g. SMS, Email, Chat
                $table->string('subject');
                $table->timestamp('logged_at')->useCurrent();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('ai_requests')) {
            Schema::create('ai_requests', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
                $table->text('prompt');
                $table->string('model')->default('gemini-1.5-flash');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('ai_responses')) {
            Schema::create('ai_responses', function (Blueprint $table) {
                $table->id();
                $table->foreignId('request_id')->constrained('ai_requests')->onDelete('cascade');
                $table->text('response_content');
                $table->integer('response_time_ms')->default(0);
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ai_responses');
        Schema::dropIfExists('ai_requests');
        Schema::dropIfExists('communication_logs');
        Schema::dropIfExists('announcements');
        Schema::dropIfExists('message_attachments');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('message_threads');
    }
};
