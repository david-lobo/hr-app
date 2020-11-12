<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $entries = 20;

        for ($count = 0; $count < $entries; $count++) {
            $faker = \Faker\Factory::create();
            $now = Carbon::now();
            DB::table('departments')->insert([
                'name' => 'Department ' . ($count +1),
                'created_at' => $now,
                'updated_at' => $now
            ]);
        }
    }
}
