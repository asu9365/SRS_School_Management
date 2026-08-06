<?php

namespace App\Services;

use App\Models\TransportVehicle;
use App\Models\TransportStudentAllocation;
use App\Models\TransportMaintenance;
use App\Models\TransportIncident;
use App\Models\LibraryBook;
use App\Models\LibraryIssueRecord;
use App\Models\TransportRoute;
use App\Models\Student;

class AdminTransportLibraryService
{
    /**
     * Get transport general stats.
     */
    public function getTransportSummary()
    {
        return [
            'success' => true,
            'data' => [
                'total_vehicles' => TransportVehicle::count(),
                'active_routes' => TransportRoute::count(),
                'allocated_students' => TransportStudentAllocation::where('status', 'Active')->count(),
            ]
        ];
    }

    /**
     * Get transport vehicles lists.
     */
    public function getVehiclesList()
    {
        return TransportVehicle::all();
    }

    /**
     * Get transport routes details.
     */
    public function getRoutesList()
    {
        return TransportRoute::all();
    }

    /**
     * Get transport vehicles GPS live coordinates telemetry.
     */
    public function getGpsLocations()
    {
        return [
            'success' => true,
            'data' => [
                [
                    'vehicle_number' => 'BUS-01',
                    'latitude' => 28.6139,
                    'longitude' => 77.2090,
                    'speed' => '45 km/h',
                ]
            ]
        ];
    }

    /**
     * Allocate student to transport stops routes.
     */
    public function allocateStudent(array $params)
    {
        $allocation = TransportStudentAllocation::create([
            'student_id' => $params['student_id'] ?? 1,
            'transport_route_id' => $params['transport_route_id'] ?? 1,
            'status' => 'Active',
        ]);

        return [
            'success' => true,
            'message' => 'Student allocated to route successfully.',
            'data' => $allocation,
        ];
    }

    /**
     * Get transport maintenance.
     */
    public function getMaintenanceLogs()
    {
        return TransportMaintenance::with('vehicle')->get()->map(function ($maint) {
            return [
                'id' => $maint->id,
                'vehicle_number' => $maint->vehicle->vehicle_number ?? 'BUS',
                'maintenance_details' => $maint->maintenance_details,
                'cost' => $maint->cost,
                'date' => $maint->date->toDateString(),
            ];
        });
    }

    /**
     * Get transport incident reports.
     */
    public function getIncidents()
    {
        return TransportIncident::with('vehicle')->get()->map(function ($inc) {
            return [
                'id' => $inc->id,
                'vehicle_number' => $inc->vehicle->vehicle_number ?? 'BUS',
                'description' => $inc->description,
                'severity' => $inc->severity,
                'date' => $inc->date->toDateString(),
            ];
        });
    }

    /**
     * Get library overview counts.
     */
    public function getLibrarySummary()
    {
        return [
            'success' => true,
            'data' => [
                'total_books' => LibraryBook::count(),
                'issued_books' => LibraryIssueRecord::where('status', 'Issued')->count(),
            ]
        ];
    }

    /**
     * Get library book catalog list.
     */
    public function getCatalog()
    {
        return LibraryBook::all();
    }

    /**
     * Issue library book checkout copy.
     */
    public function issueBook(array $params)
    {
        $book = LibraryBook::findOrFail($params['library_book_id'] ?? 1);
        
        $issue = LibraryIssueRecord::create([
            'library_book_id' => $book->id,
            'student_id' => $params['student_id'] ?? 1,
            'issued_at' => now(),
            'return_due_date' => now()->addDays(14)->toDateString(),
            'status' => 'Issued',
        ]);

        $book->update(['status' => 'Issued']);

        return [
            'success' => true,
            'message' => 'Book issued successfully.',
            'data' => $issue,
        ];
    }

    /**
     * Return library book copy checkout logs.
     */
    public function returnBook(array $params)
    {
        $record = LibraryIssueRecord::findOrFail($params['issue_record_id'] ?? 1);
        
        $record->update([
            'status' => 'Returned',
        ]);

        $record->book->update(['status' => 'Available']);

        return [
            'success' => true,
            'message' => 'Book returned successfully.',
            'data' => $record,
        ];
    }

    /**
     * Get library reservations listings.
     */
    public function getReservations()
    {
        return [
            'success' => true,
            'data' => []
        ];
    }

    /**
     * Get digital e-books resources files lists.
     */
    public function getDigitalResources()
    {
        return [
            'success' => true,
            'data' => [
                [
                    'title' => 'Digital Physics Reference Handbook',
                    'format' => 'PDF',
                    'download_url' => '/resources/digital/physics_handbook.pdf',
                ]
            ]
        ];
    }

    /**
     * Get library book copies status.
     */
    public function getInventory()
    {
        return LibraryBook::where('status', 'Available')->get();
    }
}
