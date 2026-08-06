<?php

namespace App\Http\Controllers;

use App\Models\ClassRoom;
use App\Models\Section;
use App\Services\ClassService;
use Illuminate\Http\Request;

class ClassController extends Controller
{
    protected $classService;

    public function __construct(ClassService $classService)
    {
        $this->classService = $classService;
    }

    /**
     * List all classes with sections.
     */
    public function index()
    {
        $classes = $this->classService->listClasses();

        return response()->json([
            'success' => true,
            'data' => $classes,
        ]);
    }

    /**
     * Create a new class.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'numeric_level' => 'required|integer|min:1|max:12',
            'description' => 'nullable|string',
            'sections' => 'nullable|array',
            'sections.*.name' => 'required_with:sections|string|max:10',
            'sections.*.capacity' => 'nullable|integer|min:1',
        ]);

        $classRoom = $this->classService->createClass($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Class created successfully.',
            'data' => $classRoom,
        ], 201);
    }

    /**
     * Show a specific class with sections and subjects.
     */
    public function show(ClassRoom $classRoom)
    {
        return response()->json([
            'success' => true,
            'data' => $classRoom->load(['sections', 'subjects']),
        ]);
    }

    /**
     * Update a class.
     */
    public function update(Request $request, ClassRoom $classRoom)
    {
        $request->validate([
            'name' => 'sometimes|string|max:50',
            'numeric_level' => 'sometimes|integer|min:1|max:12',
            'description' => 'nullable|string',
        ]);

        $updated = $this->classService->updateClass($classRoom->id, $request->all());

        return response()->json([
            'success' => true,
            'message' => 'Class updated successfully.',
            'data' => $updated,
        ]);
    }

    /**
     * Delete a class.
     */
    public function destroy(ClassRoom $classRoom)
    {
        $this->classService->deleteClass($classRoom->id);

        return response()->json([
            'success' => true,
            'message' => 'Class deleted successfully.',
        ]);
    }

    // --- Section Management ---

    /**
     * Add a section to a class.
     */
    public function storeSection(Request $request, ClassRoom $classRoom)
    {
        $request->validate([
            'name' => 'required|string|max:10',
            'capacity' => 'nullable|integer|min:1',
        ]);

        $section = $this->classService->addSection($classRoom->id, $request->all());

        return response()->json([
            'success' => true,
            'message' => 'Section added successfully.',
            'data' => $section,
        ], 201);
    }

    /**
     * Update a section.
     */
    public function updateSection(Request $request, ClassRoom $classRoom, Section $section)
    {
        $request->validate([
            'name' => 'sometimes|string|max:10',
            'capacity' => 'nullable|integer|min:1',
        ]);

        $updated = $this->classService->updateSection($section->id, $request->all());

        return response()->json([
            'success' => true,
            'message' => 'Section updated successfully.',
            'data' => $updated,
        ]);
    }

    /**
     * Delete a section.
     */
    public function destroySection(ClassRoom $classRoom, Section $section)
    {
        $this->classService->deleteSection($section->id);

        return response()->json([
            'success' => true,
            'message' => 'Section deleted successfully.',
        ]);
    }
}

