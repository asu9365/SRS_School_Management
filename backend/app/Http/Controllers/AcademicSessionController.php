<?php

namespace App\Http\Controllers;

use App\Models\AcademicSession;
use App\Models\Term;
use App\Services\AcademicSessionService;
use Illuminate\Http\Request;

class AcademicSessionController extends Controller
{
    protected $sessionService;

    public function __construct(AcademicSessionService $sessionService)
    {
        $this->sessionService = $sessionService;
    }

    /**
     * List all academic sessions for the current school.
     */
    public function index()
    {
        $sessions = $this->sessionService->listSessions();

        return response()->json([
            'success' => true,
            'data' => $sessions,
        ]);
    }

    /**
     * Create a new academic session.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'is_current' => 'boolean',
            'terms' => 'nullable|array',
            'terms.*.name' => 'required_with:terms|string',
            'terms.*.start_date' => 'required_with:terms|date',
            'terms.*.end_date' => 'required_with:terms|date',
            'terms.*.sequence' => 'nullable|integer',
        ]);

        $session = $this->sessionService->createSession($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Academic session created successfully.',
            'data' => $session,
        ], 201);
    }

    /**
     * Show a specific academic session.
     */
    public function show(AcademicSession $academicSession)
    {
        return response()->json([
            'success' => true,
            'data' => $academicSession->load('terms'),
        ]);
    }

    /**
     * Update an academic session.
     */
    public function update(Request $request, AcademicSession $academicSession)
    {
        $request->validate([
            'name' => 'sometimes|string|max:50',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after:start_date',
            'is_current' => 'boolean',
        ]);

        $session = $this->sessionService->updateSession($academicSession->id, $request->all());

        return response()->json([
            'success' => true,
            'message' => 'Academic session updated successfully.',
            'data' => $session,
        ]);
    }

    /**
     * Delete an academic session.
     */
    public function destroy(AcademicSession $academicSession)
    {
        $this->sessionService->deleteSession($academicSession->id);

        return response()->json([
            'success' => true,
            'message' => 'Academic session deleted successfully.',
        ]);
    }

    /**
     * Get the current active session.
     */
    public function current()
    {
        $session = $this->sessionService->getCurrentSession();

        if (!$session) {
            return response()->json([
                'success' => false,
                'message' => 'No active academic session found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $session,
        ]);
    }

    // --- Term Management ---

    /**
     * Add a term to an academic session.
     */
    public function storeTerm(Request $request, AcademicSession $academicSession)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'sequence' => 'nullable|integer',
        ]);

        $term = $this->sessionService->addTerm($academicSession->id, $request->all());

        return response()->json([
            'success' => true,
            'message' => 'Term added successfully.',
            'data' => $term,
        ], 201);
    }

    /**
     * Update a term.
     */
    public function updateTerm(Request $request, AcademicSession $academicSession, Term $term)
    {
        $request->validate([
            'name' => 'sometimes|string|max:50',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date',
            'sequence' => 'nullable|integer',
        ]);

        $updated = $this->sessionService->updateTerm($term->id, $request->all());

        return response()->json([
            'success' => true,
            'message' => 'Term updated successfully.',
            'data' => $updated,
        ]);
    }

    /**
     * Delete a term.
     */
    public function destroyTerm(AcademicSession $academicSession, Term $term)
    {
        $this->sessionService->deleteTerm($term->id);

        return response()->json([
            'success' => true,
            'message' => 'Term deleted successfully.',
        ]);
    }
}

