<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;

class ReportService
{
    public static function report(string $reportName): LengthAwarePaginator
    {
        if (method_exists(self::class, $reportName)) {
            return self::$reportName();
        }
        return [];
    }

    public static function departmentMaxSalary(): LengthAwarePaginator
    {
        return DB::table('departments')
            ->select(
                'id',
                'name',
                'max_salary',
                'created_at',
                'updated_at'
            )
            ->join(
                DB::raw('(
                SELECT
                    department_id ,
                    max(salary) AS max_salary
                FROM
                    employees
                GROUP BY
                    department_id
            ) t '),
                function ($join) {
                    $join->on('t.department_id', '=', 'departments.id');
                }
            )
            //->orderBy('id', 'DESC')
            ->paginate(10);
    }

    public static function departmentOver50k(): LengthAwarePaginator
    {
        return DB::table('employees')
            ->select(
                'department_id',
                'departments.name',
                DB::raw('count(*) AS salary_count')
            )
            ->leftJoin('departments', 'departments.id', '=', 'employees.department_id')
            ->where('salary', '>', 50000)
            ->groupBy('department_id')
            ->having('salary_count', '>=', 2)
            ->orderBy('salary_count', 'DESC')
            ->paginate(10);
    }
}
