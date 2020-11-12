<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use DB;

class DatabaseSeeder extends Seeder
{
    protected $toTruncate = ['employees', 'departments'];

    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        foreach ($this->toTruncate as $table) {
            DB::table($table)->truncate();
        }
        $this->call([
            DepartmentSeeder::class,
            EmployeeSeeder::class
        ]);

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        Model::reguard();
    }
}
