<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $entries = 100;
        $now = Carbon::now();
        for ($count = 0; $count < $entries; $count++) {
            $departmentId = (DB::table('departments')->inRandomOrder()->first())->id;
            $faker = \Faker\Factory::create();
            DB::table('employees')->insert([
                'name' => $faker->name,
                'salary' => $faker->numberBetween($min = 30000, $max = 90000),
                'department_id' => $departmentId,
                'created_at' => $now,
                'updated_at' => $now
            ]);
        }
    }
}
