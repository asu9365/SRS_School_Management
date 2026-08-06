<?php

namespace App\Http\Controllers;

use App\Services\AdminProcurementDocumentService;
use Illuminate\Http\Request;

class AdminProcurementDocumentController extends Controller
{
    protected $procurementDocumentService;

    public function __construct(AdminProcurementDocumentService $procurementDocumentService)
    {
        $this->procurementDocumentService = $procurementDocumentService;
    }

    /**
     * Get procurement statistics.
     * GET /api/admin/procurement
     */
    public function procurementSummary(Request $request)
    {
        $result = $this->procurementDocumentService->getProcurementSummary();
        return response()->json($result);
    }

    /**
     * Get requisitions list.
     * GET /api/admin/procurement/requisitions
     */
    public function requisitionsList(Request $request)
    {
        $result = $this->procurementDocumentService->getRequisitionsList();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get purchase orders raised list.
     * GET /api/admin/procurement/orders
     */
    public function purchaseOrdersList(Request $request)
    {
        $result = $this->procurementDocumentService->getPurchaseOrdersList();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get registered commercial vendors list.
     * GET /api/admin/procurement/vendors
     */
    public function vendorsList(Request $request)
    {
        $result = $this->procurementDocumentService->getVendorsList();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get delivery notes GRNs logs.
     * GET /api/admin/procurement/grn
     */
    public function goodsReceiptNotes(Request $request)
    {
        $result = $this->procurementDocumentService->getGoodsReceiptNotes();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get vendor invoices logs details.
     * GET /api/admin/procurement/invoices
     */
    public function vendorInvoices(Request $request)
    {
        $result = $this->procurementDocumentService->getVendorInvoices();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get active procurement contracts.
     * GET /api/admin/procurement/contracts
     */
    public function contractsList(Request $request)
    {
        $result = $this->procurementDocumentService->getContractsList();
        return response()->json($result);
    }

    /**
     * Get digital archive office documents repository list.
     * GET /api/admin/documents
     */
    public function documentsList(Request $request)
    {
        $result = $this->procurementDocumentService->getDocumentsRepository();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get digital archive office documents repository list.
     * GET /api/admin/documents/repository
     */
    public function repository(Request $request)
    {
        $result = $this->procurementDocumentService->getDocumentsRepository();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Store new document file registry.
     * POST /api/admin/documents
     */
    public function uploadDocument(Request $request)
    {
        $result = $this->procurementDocumentService->uploadDocument($request->all());
        return response()->json($result);
    }

    /**
     * Get document historical versions list.
     * GET /api/admin/documents/{id}/versions
     */
    public function documentVersions($id)
    {
        $result = $this->procurementDocumentService->getDocumentVersions($id);
        return response()->json($result);
    }

    /**
     * Approve document file.
     * POST /api/admin/documents/{id}/approve
     */
    public function approveDocument($id)
    {
        $result = $this->procurementDocumentService->approveDocument($id);
        return response()->json($result);
    }

    /**
     * Record document digital signature checkin audit.
     * POST /api/admin/documents/{id}/sign
     */
    public function signDocument($id, Request $request)
    {
        $result = $this->procurementDocumentService->signDocument($id, $request->all());
        return response()->json($result);
    }

    /**
     * Search documents files registries.
     * GET /api/admin/documents/search
     */
    public function searchDocuments(Request $request)
    {
        $result = $this->procurementDocumentService->searchDocuments($request->query('query', ''));
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }
}
