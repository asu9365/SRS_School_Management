<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * FR-14.13: Administration Workspace - Procurement & Document Tables
     */
    public function up(): void
    {
        if (!Schema::hasTable('purchase_requisitions')) {
            Schema::create('purchase_requisitions', function (Blueprint $table) {
                $table->id();
                $table->foreignId('requested_by')->constrained('users')->onDelete('cascade');
                $table->text('details');
                $table->string('budget_code');
                $table->string('status')->default('Pending'); // Pending, Approved, Rejected
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('vendors')) {
            Schema::create('vendors', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('contact_person');
                $table->string('email');
                $table->string('phone');
                $table->string('status')->default('Active'); // Active, Blacklisted
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('purchase_orders')) {
            Schema::create('purchase_orders', function (Blueprint $table) {
                $table->id();
                $table->foreignId('vendor_id')->constrained('vendors')->onDelete('cascade');
                $table->text('details');
                $table->decimal('total_amount', 10, 2)->default(0.00);
                $table->string('status')->default('Draft'); // Draft, Sent, Delivered, Cancelled
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('goods_receipt_notes')) {
            Schema::create('goods_receipt_notes', function (Blueprint $table) {
                $table->id();
                $table->foreignId('purchase_order_id')->constrained('purchase_orders')->onDelete('cascade');
                $table->date('received_date');
                $table->string('status')->default('Received'); // Received, Discrepancy
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('vendor_invoices')) {
            Schema::create('vendor_invoices', function (Blueprint $table) {
                $table->id();
                $table->foreignId('purchase_order_id')->constrained('purchase_orders')->onDelete('cascade');
                $table->string('invoice_number');
                $table->decimal('amount', 10, 2)->default(0.00);
                $table->string('status')->default('Pending'); // Pending, Approved, Paid
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('documents')) {
            Schema::create('documents', function (Blueprint $table) {
                $table->id();
                $table->string('title');
                $table->string('category'); // Policy, Student Record, Vendor Agreement
                $table->string('filepath');
                $table->string('status')->default('Draft'); // Draft, Approved, Archived
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('document_signatures')) {
            Schema::create('document_signatures', function (Blueprint $table) {
                $table->id();
                $table->foreignId('document_id')->constrained('documents')->onDelete('cascade');
                $table->foreignId('signed_by')->constrained('users')->onDelete('cascade');
                $table->timestamp('signed_at')->nullable();
                $table->string('status')->default('Pending'); // Pending, Signed
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document_signatures');
        Schema::dropIfExists('documents');
        Schema::dropIfExists('vendor_invoices');
        Schema::dropIfExists('goods_receipt_notes');
        Schema::dropIfExists('purchase_orders');
        Schema::dropIfExists('vendors');
        Schema::dropIfExists('purchase_requisitions');
    }
};
