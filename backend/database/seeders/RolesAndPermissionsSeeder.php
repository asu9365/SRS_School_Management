<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * FR-01: Role & Permission Management
     * Implements the full RBAC Permission Matrix from plan_enhance1.md
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // =====================================================================
        // Create Permissions (grouped by module)
        // =====================================================================

        // Dashboard
        Permission::firstOrCreate(['name' => 'view dashboard']);

        // Student Management
        Permission::firstOrCreate(['name' => 'view students']);
        Permission::firstOrCreate(['name' => 'manage students']);
        Permission::firstOrCreate(['name' => 'transfer students']);
        Permission::firstOrCreate(['name' => 'promote students']);
        Permission::firstOrCreate(['name' => 'archive students']);

        // Teacher Management
        Permission::firstOrCreate(['name' => 'view teachers']);
        Permission::firstOrCreate(['name' => 'manage teachers']);

        // Academic Structure
        Permission::firstOrCreate(['name' => 'view academic structure']);
        Permission::firstOrCreate(['name' => 'manage academic structure']);
        Permission::firstOrCreate(['name' => 'manage timetable']);

        // Attendance
        Permission::firstOrCreate(['name' => 'view attendance']);
        Permission::firstOrCreate(['name' => 'manage attendance']);

        // Marks & Assessments
        Permission::firstOrCreate(['name' => 'view marks']);
        Permission::firstOrCreate(['name' => 'manage marks']);
        Permission::firstOrCreate(['name' => 'publish results']);

        // Homework & Assignments
        Permission::firstOrCreate(['name' => 'view homework']);
        Permission::firstOrCreate(['name' => 'submit homework']);
        Permission::firstOrCreate(['name' => 'manage homework']);

        // Reports
        Permission::firstOrCreate(['name' => 'view reports']);
        Permission::firstOrCreate(['name' => 'generate reports']);

        // Communication
        Permission::firstOrCreate(['name' => 'view messages']);
        Permission::firstOrCreate(['name' => 'send messages']);
        Permission::firstOrCreate(['name' => 'manage notices']);
        Permission::firstOrCreate(['name' => 'broadcast messages']);

        // PTM
        Permission::firstOrCreate(['name' => 'join ptm']);
        Permission::firstOrCreate(['name' => 'manage ptm']);

        // Fees
        Permission::firstOrCreate(['name' => 'view fees']);
        Permission::firstOrCreate(['name' => 'pay fees']);
        Permission::firstOrCreate(['name' => 'manage fees']);

        // Users & Admin
        Permission::firstOrCreate(['name' => 'view users']);
        Permission::firstOrCreate(['name' => 'manage users']);
        Permission::firstOrCreate(['name' => 'manage schools']);

        // AI & Analytics
        Permission::firstOrCreate(['name' => 'view analytics']);
        Permission::firstOrCreate(['name' => 'view ai insights']);

        // =====================================================================
        // Create Roles and Assign Permissions
        // =====================================================================

        // --- Super Admin ---
        $superAdmin = Role::firstOrCreate(['name' => 'Super Admin']);
        $superAdmin->givePermissionTo(Permission::all());

        // --- School Admin ---
        $admin = Role::firstOrCreate(['name' => 'Admin']);
        $admin->givePermissionTo([
            'view dashboard', 'view students', 'manage students',
            'transfer students', 'promote students', 'archive students',
            'view teachers', 'manage teachers',
            'view academic structure', 'manage academic structure', 'manage timetable',
            'view attendance', 'manage attendance',
            'view marks', 'manage marks', 'publish results',
            'view homework', 'manage homework',
            'view reports', 'generate reports',
            'view messages', 'send messages', 'manage notices', 'broadcast messages',
            'manage ptm',
            'view fees', 'manage fees',
            'view users', 'manage users',
            'view analytics', 'view ai insights',
        ]);

        // --- Principal ---
        $principal = Role::firstOrCreate(['name' => 'Principal']);
        $principal->givePermissionTo([
            'view dashboard',
            'view students', 'view teachers',
            'view academic structure',
            'view attendance',
            'view marks',
            'view homework',
            'view reports', 'generate reports',
            'view messages', 'send messages',
            'view fees',
            'view users',
            'view analytics', 'view ai insights',
        ]);

        // --- Vice Principal ---
        $vicePrincipal = Role::firstOrCreate(['name' => 'Vice Principal']);
        $vicePrincipal->givePermissionTo([
            'view dashboard',
            'view students', 'view teachers',
            'view academic structure',
            'view attendance',
            'view marks',
            'view homework',
            'view reports', 'generate reports',
            'view messages', 'send messages',
            'view analytics',
        ]);

        // --- Teacher ---
        $teacher = Role::firstOrCreate(['name' => 'Teacher']);
        $teacher->givePermissionTo([
            'view dashboard',
            'view students',
            'view academic structure',
            'view attendance', 'manage attendance',
            'view marks', 'manage marks',
            'view homework', 'manage homework',
            'view reports', 'generate reports',
            'view messages', 'send messages',
            'manage ptm',
            'view analytics',
        ]);

        // --- Class Teacher ---
        $classTeacher = Role::firstOrCreate(['name' => 'Class Teacher']);
        $classTeacher->givePermissionTo([
            'view dashboard',
            'view students',
            'view academic structure',
            'view attendance', 'manage attendance',
            'view marks', 'manage marks',
            'view homework', 'manage homework',
            'view reports', 'generate reports',
            'view messages', 'send messages',
            'manage ptm',
            'view analytics', 'view ai insights',
        ]);

        // --- Student ---
        $student = Role::firstOrCreate(['name' => 'Student']);
        $student->givePermissionTo([
            'view dashboard',
            'view attendance',
            'view marks',
            'view homework', 'submit homework',
            'view reports',
            'view messages', 'send messages',
            'join ptm',
            'view fees',
        ]);

        // --- Parent ---
        $parent = Role::firstOrCreate(['name' => 'Parent']);
        $parent->givePermissionTo([
            'view dashboard',
            'view attendance',
            'view marks',
            'view homework',
            'view reports',
            'view messages', 'send messages',
            'join ptm',
            'view fees', 'pay fees',
        ]);

        // --- Accountant ---
        $accountant = Role::firstOrCreate(['name' => 'Accountant']);
        $accountant->givePermissionTo([
            'view dashboard',
            'view fees', 'manage fees',
            'view reports', 'generate reports',
        ]);

        // --- Librarian ---
        $librarian = Role::firstOrCreate(['name' => 'Librarian']);
        $librarian->givePermissionTo([
            'view dashboard',
            'view students',
            'view reports',
        ]);

        // --- Transport Manager ---
        $transportManager = Role::firstOrCreate(['name' => 'Transport Manager']);
        $transportManager->givePermissionTo([
            'view dashboard',
            'view students',
            'view reports',
        ]);

        // --- Counselor ---
        $counselor = Role::firstOrCreate(['name' => 'Counselor']);
        $counselor->givePermissionTo([
            'view dashboard',
            'view students',
            'view attendance',
            'view marks',
            'view reports',
            'view messages', 'send messages',
            'view ai insights',
        ]);
    }
}

