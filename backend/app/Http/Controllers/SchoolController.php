<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SchoolController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => \App\Models\School::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'subdomain' => 'nullable|string|unique:schools',
            'contact_email' => 'nullable|email',
            'subscription_plan' => 'required|string',
            'status' => 'required|in:active,suspended'
        ]);

        // Start transaction
        \Illuminate\Support\Facades\DB::beginTransaction();

        try {
            $school = \App\Models\School::create($validated);
            
            // Auto-provision an Admin user
            $adminPassword = \Illuminate\Support\Str::random(10);
            $emailPrefix = $validated['subdomain'] ?: strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $validated['name']));
            
            // We use DB::table to avoid global scopes just in case, though User doesn't have it yet.
            $adminUser = \App\Models\User::create([
                'name' => $validated['name'] . ' Admin',
                'email' => "admin@{$emailPrefix}.schoolos.com",
                'password' => \Illuminate\Support\Facades\Hash::make($adminPassword),
                'school_id' => $school->id,
            ]);

            $adminUser->assignRole('Admin');
            
            \Illuminate\Support\Facades\DB::commit();

            return response()->json([
                'success' => true,
                'data' => $school,
                'admin_credentials' => [
                    'email' => $adminUser->email,
                    'password' => $adminPassword
                ]
            ]);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to create school',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, \App\Models\School $school)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string',
            'subdomain' => 'nullable|string|unique:schools,subdomain,' . $school->id,
            'contact_email' => 'nullable|email',
            'subscription_plan' => 'sometimes|string',
            'status' => 'sometimes|in:active,suspended'
        ]);

        $school->update($validated);
        
        return response()->json([
            'success' => true,
            'data' => $school
        ]);
    }}
