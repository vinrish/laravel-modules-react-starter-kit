<?php

namespace Modules\Role\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Roles\Database\Seeders\RolesAndPermissionsSeeder;

class RoleDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $this->call([
             RolesAndPermissionsSeeder::class,
         ]);
    }
}
