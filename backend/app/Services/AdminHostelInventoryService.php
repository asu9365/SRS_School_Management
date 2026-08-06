<?php

namespace App\Services;

use App\Models\Hostel;
use App\Models\HostelRoom;
use App\Models\HostelRoomAllocation;
use App\Models\HostelLeaveRequest;
use App\Models\HostelVisitor;
use App\Models\InventoryItem;
use App\Models\AssetAllocation;
use App\Models\Student;
use App\Models\Teacher;

class AdminHostelInventoryService
{
    /**
     * Get hostel statistics counts.
     */
    public function getHostelSummary()
    {
        return [
            'success' => true,
            'data' => [
                'total_hostels' => Hostel::count(),
                'total_residents' => HostelRoomAllocation::where('status', 'Active')->count(),
                'vacant_rooms' => HostelRoom::where('status', 'Available')->count(),
            ]
        ];
    }

    /**
     * Get active residents lists.
     */
    public function getResidentsList()
    {
        return HostelRoomAllocation::with('student', 'room.hostel')->get()->map(function ($alloc) {
            return [
                'id' => $alloc->id,
                'resident_name' => $alloc->student->Fname ?? 'Resident',
                'room_number' => $alloc->room->room_number ?? 'N/A',
                'hostel_name' => $alloc->room->hostel->name ?? 'Hostel',
            ];
        });
    }

    /**
     * Get hostel rooms list.
     */
    public function getRoomsList()
    {
        return HostelRoom::with('hostel')->get();
    }

    /**
     * Allocate student room bed.
     */
    public function allocateRoom(array $params)
    {
        $allocation = HostelRoomAllocation::create([
            'student_id' => $params['student_id'] ?? 1,
            'hostel_room_id' => $params['hostel_room_id'] ?? 1,
            'status' => 'Active',
        ]);

        return [
            'success' => true,
            'message' => 'Room allocated to resident successfully.',
            'data' => $allocation,
        ];
    }

    /**
     * Get leaves out passes lists.
     */
    public function getLeavesList()
    {
        return HostelLeaveRequest::with('student')->get()->map(function ($leave) {
            return [
                'id' => $leave->id,
                'student_name' => $leave->student->Fname ?? 'Resident',
                'reason' => $leave->reason,
                'start_date' => $leave->start_date->toDateString(),
                'end_date' => $leave->end_date->toDateString(),
                'status' => $leave->status,
            ];
        });
    }

    /**
     * Get visitor registries.
     */
    public function getVisitorsList()
    {
        return HostelVisitor::with('resident')->get()->map(function ($vis) {
            return [
                'id' => $vis->id,
                'resident_name' => $vis->resident->Fname ?? 'Resident',
                'visitor_name' => $vis->visitor_name,
                'relationship' => $vis->relationship,
                'visit_date' => $vis->visit_date->toDateString(),
            ];
        });
    }

    /**
     * Get mess meal calendars schedules.
     */
    public function getMessSchedule()
    {
        return [
            'success' => true,
            'data' => [
                'breakfast' => 'Oatmeal & Fruits',
                'lunch' => 'Rice & Lentils',
                'dinner' => 'Baked Vegetables & Bread',
            ]
        ];
    }

    /**
     * Get hostel facility maintenance requests logs.
     */
    public function getMaintenanceLogs()
    {
        return [
            'success' => true,
            'data' => [
                [
                    'item' => 'Room 204 Fan Repair',
                    'status' => 'Completed',
                ]
            ]
        ];
    }

    /**
     * Get inventory statistics counts.
     */
    public function getInventorySummary()
    {
        return [
            'success' => true,
            'data' => [
                'total_inventory_items' => InventoryItem::count(),
                'total_allocated_assets' => AssetAllocation::where('status', 'Allocated')->count(),
            ]
        ];
    }

    /**
     * Get assets checklists list.
     */
    public function getAssetsList()
    {
        return AssetAllocation::with('teacher')->get()->map(function ($asset) {
            return [
                'id' => $asset->id,
                'allocated_to' => $asset->teacher->Fname ?? 'Staff',
                'item_name' => $asset->item_name,
                'quantity' => $asset->quantity,
                'allocated_at' => $asset->allocated_at->toDateTimeString(),
            ];
        });
    }

    /**
     * Get stock inventory item counts list.
     */
    public function getStockList()
    {
        return InventoryItem::all();
    }

    /**
     * Allocate asset equipment checkout.
     */
    public function allocateAsset(array $params)
    {
        $allocation = AssetAllocation::create([
            'teacher_id' => $params['teacher_id'] ?? 1,
            'item_name' => $params['item_name'] ?? 'Laptop',
            'quantity' => $params['quantity'] ?? 1,
            'status' => 'Allocated',
        ]);

        return [
            'success' => true,
            'message' => 'Asset allocated to teacher successfully.',
            'data' => $allocation,
        ];
    }

    /**
     * Get inventory hardware maintenance.
     */
    public function getInventoryMaintenance()
    {
        return [
            'success' => true,
            'data' => []
        ];
    }

    /**
     * Get stock count inventory audits logs.
     */
    public function getInventoryAudits()
    {
        return [
            'success' => true,
            'data' => [
                [
                    'audit_date' => now()->toDateString(),
                    'audited_by' => 'Admin Staff',
                    'remarks' => 'All items verified and accounted for.',
                ]
            ]
        ];
    }

    /**
     * Get asset depreciation calculations checklist logs.
     */
    public function getAssetDepreciation()
    {
        return [
            'success' => true,
            'data' => [
                [
                    'item' => 'Projectors Pack',
                    'initial_value' => 12000.00,
                    'depreciated_value' => 8400.00,
                ]
            ]
        ];
    }
}
