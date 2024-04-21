<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class RolesPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $abilities = config('roles-permissions.abilities');
        $roles = config('roles-permissions.roles');

    }
}
