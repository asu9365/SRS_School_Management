<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'Super Admin', 'guard_name' => 'web']);

        $user = \App\Models\User::firstOrCreate(
            ['email' => 'superadmin@schoolos.com'],
            [
                'name' => 'Super Admin',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'school_id' => null
            ]
        );

        $user->assignRole($role);
    }
}
