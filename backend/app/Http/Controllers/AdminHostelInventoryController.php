<?php

namespace App\Http\Controllers;

use App\Services\AdminHostelInventoryService;
use Illuminate\Http\Request;

class AdminHostelInventoryController extends Controller
{
    protected $hostelInventoryService;

    public function __construct(AdminHostelInventoryService $hostelInventoryService)
    {
        $this->hostelInventoryService = $hostelInventoryService;
    }

    /**
     * Get hostel statistics counts.
     * GET /api/admin/hostel
     */
    public function hostelSummary(Request $request)
    {
        $result = $this->hostelInventoryService->getHostelSummary();
        return response()->json($result);
    }

    /**
     * Get active residents lists.
     * GET /api/admin/hostel/residents
     */
    public function residentsList(Request $request)
    {
        $result = $this->hostelInventoryService->getResidentsList();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get hostel rooms list.
     * GET /api/admin/hostel/rooms
     */
    public function roomsList(Request $request)
    {
        $result = $this->hostelInventoryService->getRoomsList();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Allocate student room bed.
     * POST /api/admin/hostel/allocate
     */
    public function allocateRoom(Request $request)
    {
        $result = $this->hostelInventoryService->allocateRoom($request->all());
        return response()->json($result);
    }

    /**
     * Get leaves out passes lists.
     * GET /api/admin/hostel/leaves
     */
    public function leavesList(Request $request)
    {
        $result = $this->hostelInventoryService->getLeavesList();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get visitor registries.
     * GET /api/admin/hostel/visitors
     */
    public function visitorsList(Request $request)
    {
        $result = $this->hostelInventoryService->getVisitorsList();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get mess meal calendars schedules.
     * GET /api/admin/hostel/mess
     */
    public function messSchedule(Request $request)
    {
        $result = $this->hostelInventoryService->getMessSchedule();
        return response()->json($result);
    }

    /**
     * Get hostel facility maintenance requests logs.
     * GET /api/admin/hostel/maintenance
     */
    public function maintenanceLogs(Request $request)
    {
        $result = $this->hostelInventoryService->getMaintenanceLogs();
        return response()->json($result);
    }

    /**
     * Get inventory statistics counts.
     * GET /api/admin/inventory
     */
    public function inventorySummary(Request $request)
    {
        $result = $this->hostelInventoryService->getInventorySummary();
        return response()->json($result);
    }

    /**
     * Get assets checklists list.
     * GET /api/admin/inventory/assets
     */
    public function assetsList(Request $request)
    {
        $result = $this->hostelInventoryService->getAssetsList();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get stock inventory item counts list.
     * GET /api/admin/inventory/stock
     */
    public function stockList(Request $request)
    {
        $result = $this->hostelInventoryService->getStockList();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Allocate asset equipment checkout.
     * POST /api/admin/inventory/allocate
     */
    public function allocateAsset(Request $request)
    {
        $result = $this->hostelInventoryService->allocateAsset($request->all());
        return response()->json($result);
    }

    /**
     * Get inventory hardware maintenance.
     * GET /api/admin/inventory/maintenance
     */
    public function inventoryMaintenance(Request $request)
    {
        $result = $this->hostelInventoryService->getInventoryMaintenance();
        return response()->json($result);
    }

    /**
     * Get stock count inventory audits logs.
     * GET /api/admin/inventory/audits
     */
    public function inventoryAudits(Request $request)
    {
        $result = $this->hostelInventoryService->getInventoryAudits();
        return response()->json($result);
    }

    /**
     * Get asset depreciation calculations checklist logs.
     * GET /api/admin/inventory/depreciation
     */
    public function assetDepreciation(Request $request)
    {
        $result = $this->hostelInventoryService->getAssetDepreciation();
        return response()->json($result);
    }
}
