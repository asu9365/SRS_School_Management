<?php

namespace App\Services;

use App\Models\PurchaseRequisition;
use App\Models\Vendor;
use App\Models\PurchaseOrder;
use App\Models\GoodsReceiptNote;
use App\Models\VendorInvoice;
use App\Models\Document;
use App\Models\DocumentSignature;

class AdminProcurementDocumentService
{
    /**
     * Get procurement statistics.
     */
    public function getProcurementSummary()
    {
        return [
            'success' => true,
            'data' => [
                'total_vendors_active' => Vendor::where('status', 'Active')->count(),
                'pending_requisitions_count' => PurchaseRequisition::where('status', 'Pending')->count(),
                'active_purchase_orders_count' => PurchaseOrder::where('status', 'Sent')->count(),
            ]
        ];
    }

    /**
     * Get requisitions list.
     */
    public function getRequisitionsList()
    {
        return PurchaseRequisition::with('user')->get()->map(function ($req) {
            return [
                'id' => $req->id,
                'requested_by' => $req->user->name ?? 'Staff',
                'details' => $req->details,
                'budget_code' => $req->budget_code,
                'status' => $req->status,
            ];
        });
    }

    /**
     * Get purchase orders raised list.
     */
    public function getPurchaseOrdersList()
    {
        return PurchaseOrder::with('vendor')->get();
    }

    /**
     * Get registered commercial vendors list.
     */
    public function getVendorsList()
    {
        return Vendor::all();
    }

    /**
     * Get delivery notes GRNs logs.
     */
    public function getGoodsReceiptNotes()
    {
        return GoodsReceiptNote::with('purchaseOrder.vendor')->get()->map(function ($grn) {
            return [
                'id' => $grn->id,
                'po_id' => $grn->purchase_order_id,
                'vendor_name' => $grn->purchaseOrder->vendor->name ?? 'Supplier',
                'received_date' => $grn->received_date->toDateString(),
                'status' => $grn->status,
            ];
        });
    }

    /**
     * Get vendor invoices logs details.
     */
    public function getVendorInvoices()
    {
        return VendorInvoice::with('purchaseOrder.vendor')->get()->map(function ($inv) {
            return [
                'id' => $inv->id,
                'invoice_number' => $inv->invoice_number,
                'amount' => $inv->amount,
                'vendor_name' => $inv->purchaseOrder->vendor->name ?? 'Supplier',
                'status' => $inv->status,
            ];
        });
    }

    /**
     * Get active procurement contracts checklist templates list.
     */
    public function getContractsList()
    {
        return [
            'success' => true,
            'data' => [
                [
                    'contract_name' => 'Transport Service Agreement 2026',
                    'vendor' => 'SafeBus Transport',
                    'expires_at' => '2026-12-31',
                ]
            ]
        ];
    }

    /**
     * Get digital archive office documents repository list.
     */
    public function getDocumentsRepository()
    {
        return Document::all();
    }

    /**
     * Store new document file registry.
     */
    public function uploadDocument(array $params)
    {
        $doc = Document::create([
            'title' => $params['title'] ?? 'Office Memo',
            'category' => $params['category'] ?? 'Policy',
            'filepath' => $params['filepath'] ?? '/documents/memo_101.pdf',
            'status' => 'Draft',
        ]);

        return [
            'success' => true,
            'message' => 'Document uploaded successfully.',
            'data' => $doc,
        ];
    }

    /**
     * Get document historical versions list.
     */
    public function getDocumentVersions($id)
    {
        $doc = Document::findOrFail($id);
        return [
            'success' => true,
            'document' => $doc->title,
            'data' => [
                [
                    'version' => 'V1.0',
                    'updated_at' => $doc->created_at->toDateTimeString(),
                ]
            ]
        ];
    }

    /**
     * Approve document file.
     */
    public function approveDocument($id)
    {
        $doc = Document::findOrFail($id);
        $doc->update(['status' => 'Approved']);
        return [
            'success' => true,
            'message' => 'Document approved successfully: ' . $doc->title
        ];
    }

    /**
     * Record document digital signature checkin audit.
     */
    public function signDocument($id, array $params)
    {
        $doc = Document::findOrFail($id);
        
        $sig = DocumentSignature::create([
            'document_id' => $doc->id,
            'signed_by' => $params['user_id'] ?? 1,
            'signed_at' => now(),
            'status' => 'Signed',
        ]);

        return [
            'success' => true,
            'message' => 'Digital signature recorded for ' . $doc->title,
            'data' => $sig,
        ];
    }

    /**
     * Search documents files registries.
     */
    public function searchDocuments($query)
    {
        return Document::where('title', 'like', '%' . $query . '%')
            ->orWhere('category', 'like', '%' . $query . '%')
            ->get();
    }
}
