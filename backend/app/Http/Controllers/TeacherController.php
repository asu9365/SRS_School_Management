<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Teacher::all()
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        try {
            $teacher = Teacher::create($data);
            return response()->json([
                'success' => true,
                'data' => $teacher,
                'message' => 'Teacher registered successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
