<?php

namespace App\Http\Controllers;

use App\Models\Update;
use Illuminate\Http\Request;

class UpdateController extends Controller
{
    public function index()
    {
        return response()->json(Update::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'class_id' => 'nullable|string',
            'content' => 'required|string',
        ]);

        $validated['user_id'] = auth()->id() ?? 1; // Fallback to 1 if not authenticated (for testing/seeding)

        $update = Update::create($validated);
        return response()->json($update, 201);
    }

    public function show(string $id)
    {
        $update = Update::findOrFail($id);
        return response()->json($update);
    }

    public function update(Request $request, string $id)
    {
        $updateModel = Update::findOrFail($id);
        
        $validated = $request->validate([
            'class_id' => 'nullable|string',
            'content' => 'sometimes|string',
        ]);

        $updateModel->update($validated);
        return response()->json($updateModel);
    }

    public function destroy(string $id)
    {
        $updateModel = Update::findOrFail($id);
        $updateModel->delete();
        return response()->json(null, 204);
    }
}
