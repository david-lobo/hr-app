<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmployeeController extends Controller
{
    public function index()
    {
        $items = DB::table('employees')
        ->select(
            'employees.id',
            DB::raw('employees.name AS employee_name'),
            'salary',
            'department_id',
            DB::raw('departments.name AS department_name'),
        )
        ->leftJoin('departments', 'departments.id', '=', 'employees.department_id')
        ->orderBy('employees.created_at', 'desc')
        ->paginate(10);

        return $items->toJson();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string'],
            'salary' => ['required', 'numeric'],
            'department_id' => 'required|exists:departments,id'
        ]);

        $model = new Employee();
        $model->name = $validatedData['name'];
        $model->salary = $validatedData['salary'];
        $model->department_id = $validatedData['department_id'];
        $model->save();

        return response()->json('Added Successfully!');
    }

    public function edit($id)
    {
        $item = Employee::find($id);

        return response()->json($item->toArray());
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string'],
            'salary' => ['required', 'numeric'],
            'department_id' => 'required|exists:departments,id'
        ]);

        $model = new Employee($id);
        $model->name = $validatedData['name'];
        $model->salary = $validatedData['salary'];
        $model->department_id = $validatedData['department_id'];
        $model->save();

        return response()->json('Successfully Updated');
    }

    public function destroy($id)
    {
        $model = new Employee($id);
        $model->delete();

        return response()->json('Successfully Deleted');
    }
}
