<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-01: Enhanced Authentication & Authorization
     * - Account locking after failed login attempts
     * - Gender field for user profiles
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedTinyInteger('failed_login_attempts')->default(0)->after('password');
            $table->timestamp('locked_until')->nullable()->after('failed_login_attempts');
            $table->string('phone', 20)->nullable()->after('email');
            $table->string('avatar')->nullable()->after('phone');
            $table->boolean('is_active')->default(true)->after('avatar');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'failed_login_attempts',
                'locked_until',
                'phone',
                'avatar',
                'is_active',
            ]);
        });
    }
};
