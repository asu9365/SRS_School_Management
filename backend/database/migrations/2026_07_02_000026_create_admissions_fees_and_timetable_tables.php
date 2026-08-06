<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-14.6: Administration Workspace - Admissions, Fees & Timetabling Tables
     */
    public function up(): void
    {
        if (!Schema::hasTable('document_verifications')) {
            Schema::create('document_verifications', function (Blueprint $table) {
                $table->id();
                $table->foreignId('enquiry_id')->constrained('admission_enquiries')->onDelete('cascade');
                $table->string('document_name');
                $table->foreignId('verified_by')->constrained('users')->onDelete('cascade');
                $table->boolean('is_valid')->default(true);
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('fee_structures')) {
            Schema::create('fee_structures', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->decimal('amount', 10, 2)->default(0.00);
                $table->string('fiscal_year');
                $table->string('status')->default('Active'); // Active, Inactive
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('fee_invoices')) {
            Schema::create('fee_invoices', function (Blueprint $table) {
                $table->id();
                $table->foreignId('student_id')->constrained('students')->onDelete('cascade');
                $table->foreignId('fee_structure_id')->constrained('fee_structures')->onDelete('cascade');
                $table->decimal('amount', 10, 2)->default(0.00);
                $table->string('status')->default('Unpaid'); // Unpaid, Paid, Partially Paid
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('fee_payments')) {
            Schema::create('fee_payments', function (Blueprint $table) {
                $table->id();
                $table->foreignId('fee_invoice_id')->constrained('fee_invoices')->onDelete('cascade');
                $table->decimal('amount_paid', 10, 2)->default(0.00);
                $table->string('payment_method')->default('Cash'); // Cash, Card, NetBanking
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('substitution_records')) {
            Schema::create('substitution_records', function (Blueprint $table) {
                $table->id();
                $table->foreignId('teacher_id')->constrained('teachers')->onDelete('cascade');
                $table->foreignId('substitute_teacher_id')->constrained('teachers')->onDelete('cascade');
                $table->foreignId('class_room_id')->constrained('class_rooms')->onDelete('cascade');
                $table->date('date');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('substitution_records');
        Schema::dropIfExists('fee_payments');
        Schema::dropIfExists('fee_invoices');
        Schema::dropIfExists('fee_structures');
        Schema::dropIfExists('document_verifications');
    }
};
