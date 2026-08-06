<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-02: Enhanced Student Information System
     * - Additional student profile fields
     * - Guardian details table
     * - Student documents table
     */
    public function up(): void
    {
        // Enhance students table with missing fields per SRS (conditionally)
        Schema::table('students', function (Blueprint $table) {
            if (!Schema::hasColumn('students', 'admission_number')) {
                $table->string('admission_number')->nullable()->after('id');
            }
            if (!Schema::hasColumn('students', 'gender')) {
                $table->string('gender')->nullable()->after('DOB');
            }
            if (!Schema::hasColumn('students', 'religion')) {
                $table->string('religion')->nullable()->after('caste');
            }
            if (!Schema::hasColumn('students', 'nationality')) {
                $table->string('nationality')->default('Indian')->after('religion');
            }
            if (!Schema::hasColumn('students', 'mother_tongue')) {
                $table->string('mother_tongue')->nullable()->after('nationality');
            }
            if (!Schema::hasColumn('students', 'email')) {
                $table->string('email')->nullable()->after('mother_tongue');
            }
            if (!Schema::hasColumn('students', 'phone')) {
                $table->string('phone', 20)->nullable()->after('email');
            }
            if (!Schema::hasColumn('students', 'medical_conditions')) {
                $table->text('medical_conditions')->nullable()->after('blood');
            }
            if (!Schema::hasColumn('students', 'allergies')) {
                $table->text('allergies')->nullable()->after('medical_conditions');
            }
            if (!Schema::hasColumn('students', 'emergency_contact_name')) {
                $table->string('emergency_contact_name')->nullable()->after('allergies');
            }
            if (!Schema::hasColumn('students', 'emergency_contact_phone')) {
                $table->string('emergency_contact_phone', 20)->nullable()->after('emergency_contact_name');
            }
            if (!Schema::hasColumn('students', 'emergency_contact_relation')) {
                $table->string('emergency_contact_relation')->nullable()->after('emergency_contact_phone');
            }
            if (!Schema::hasColumn('students', 'previous_school')) {
                $table->string('previous_school')->nullable()->after('emergency_contact_relation');
            }
            if (!Schema::hasColumn('students', 'photograph')) {
                $table->string('photograph')->nullable()->after('previous_school');
            }
            if (!Schema::hasColumn('students', 'status')) {
                $table->enum('status', ['active', 'transferred', 'archived', 'alumni', 'suspended'])->default('active')->after('photograph');
            }
            if (!Schema::hasColumn('students', 'admission_date')) {
                $table->date('admission_date')->nullable()->after('status');
            }
            if (!Schema::hasColumn('students', 'leaving_date')) {
                $table->date('leaving_date')->nullable()->after('admission_date');
            }
            if (!Schema::hasColumn('students', 'leaving_reason')) {
                $table->text('leaving_reason')->nullable()->after('leaving_date');
            }
        });

        // Guardian Details (supports multiple guardians per student)
        if (!Schema::hasTable('guardian_details')) {
            Schema::create('guardian_details', function (Blueprint $table) {
                $table->id();
                $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
                $table->string('name');
                $table->enum('relation', ['Father', 'Mother', 'Guardian', 'Uncle', 'Aunt', 'Grandparent', 'Other'])->default('Guardian');
                $table->string('phone', 20)->nullable();
                $table->string('email')->nullable();
                $table->string('occupation')->nullable();
                $table->text('address')->nullable();
                $table->string('annual_income')->nullable();
                $table->string('qualification')->nullable();
                $table->boolean('is_primary')->default(false);
                $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null'); // linked parent user
                $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade');
                $table->timestamps();
            });
        }

        // Student Documents
        if (!Schema::hasTable('student_documents')) {
            Schema::create('student_documents', function (Blueprint $table) {
                $table->id();
                $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
                $table->enum('type', [
                    'birth_certificate',
                    'transfer_certificate',
                    'migration_certificate',
                    'character_certificate',
                    'marksheet',
                    'medical_report',
                    'aadhar_card',
                    'passport_photo',
                    'address_proof',
                    'caste_certificate',
                    'income_certificate',
                    'other'
                ]);
                $table->string('title');
                $table->string('file_path');
                $table->string('file_name');
                $table->unsignedBigInteger('file_size')->nullable(); // bytes
                $table->string('mime_type')->nullable();
                $table->text('notes')->nullable();
                $table->foreignId('uploaded_by')->nullable()->constrained('users')->onDelete('set null');
                $table->foreignId('school_id')->nullable()->constrained('schools')->onDelete('cascade');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_documents');
        Schema::dropIfExists('guardian_details');

        Schema::table('students', function (Blueprint $table) {
            $table->dropColumn([
                'admission_number', 'gender', 'religion', 'nationality',
                'mother_tongue', 'email', 'phone', 'medical_conditions',
                'allergies', 'emergency_contact_name', 'emergency_contact_phone',
                'emergency_contact_relation', 'previous_school', 'photograph',
                'status', 'admission_date', 'leaving_date', 'leaving_reason',
            ]);
        });
    }
};
