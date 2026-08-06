<?php

namespace App\Http\Controllers;

use App\Services\AdminTransportLibraryService;
use Illuminate\Http\Request;

class AdminTransportLibraryController extends Controller
{
    protected $transportLibraryService;

    public function __construct(AdminTransportLibraryService $transportLibraryService)
    {
        $this->transportLibraryService = $transportLibraryService;
    }

    /**
     * Get transport stats parameters summary.
     * GET /api/admin/transport
     */
    public function transportSummary(Request $request)
    {
        $result = $this->transportLibraryService->getTransportSummary();
        return response()->json($result);
    }

    /**
     * Get transport vehicles lists.
     * GET /api/admin/transport/vehicles
     */
    public function vehiclesList(Request $request)
    {
        $result = $this->transportLibraryService->getVehiclesList();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get transport routes details.
     * GET /api/admin/transport/routes
     */
    public function routesList(Request $request)
    {
        $result = $this->transportLibraryService->getRoutesList();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get transport vehicles GPS live coordinates telemetry.
     * GET /api/admin/transport/gps
     */
    public function gpsLocations(Request $request)
    {
        $result = $this->transportLibraryService->getGpsLocations();
        return response()->json($result);
    }

    /**
     * Allocate student to transport stops routes.
     * POST /api/admin/transport/allocate
     */
    public function allocateStudent(Request $request)
    {
        $result = $this->transportLibraryService->allocateStudent($request->all());
        return response()->json($result);
    }

    /**
     * Get transport maintenance.
     * GET /api/admin/transport/maintenance
     */
    public function maintenanceLogs(Request $request)
    {
        $result = $this->transportLibraryService->getMaintenanceLogs();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get transport incident reports.
     * GET /api/admin/transport/incidents
     */
    public function incidents(Request $request)
    {
        $result = $this->transportLibraryService->getIncidents();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get library overview counts.
     * GET /api/admin/library
     */
    public function librarySummary(Request $request)
    {
        $result = $this->transportLibraryService->getLibrarySummary();
        return response()->json($result);
    }

    /**
     * Get library book catalog list.
     * GET /api/admin/library/catalog
     */
    public function catalog(Request $request)
    {
        $result = $this->transportLibraryService->getCatalog();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Issue library book checkout copy.
     * POST /api/admin/library/issue
     */
    public function issueBook(Request $request)
    {
        $result = $this->transportLibraryService->issueBook($request->all());
        return response()->json($result);
    }

    /**
     * Return library book copy checkout logs.
     * POST /api/admin/library/return
     */
    public function returnBook(Request $request)
    {
        $result = $this->transportLibraryService->returnBook($request->all());
        return response()->json($result);
    }

    /**
     * Get library reservations listings.
     * GET /api/admin/library/reservations
     */
    public function reservations(Request $request)
    {
        $result = $this->transportLibraryService->getReservations();
        return response()->json($result);
    }

    /**
     * Get digital e-books resources files lists.
     * GET /api/admin/library/digital
     */
    public function digitalResources(Request $request)
    {
        $result = $this->transportLibraryService->getDigitalResources();
        return response()->json($result);
    }

    /**
     * Get library book copies status.
     * GET /api/admin/library/inventory
     */
    public function inventory(Request $request)
    {
        $result = $this->transportLibraryService->getInventory();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }
}
