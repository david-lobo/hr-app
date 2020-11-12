<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DepartmentController extends Controller
{
    public function index()
    {
        $perPage = request()->input('perPage', 10);
        $items = DB::table('departments')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return $items->toJson();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
        ]);

        $model = new Department();
        $model->name = $validatedData['name'];
        $model->save();

        return response()->json('  Added Successfully! ');
    }

    public function edit($id)
    {
        $item = Department::find($id);

        return response()->json($item->toArray());
    }

    public function update(Request $request, $id)
    {
        $model = new Department($id);
        $model->name = $request->name;
        $model->save();

        return response()->json('Successfully Updated');
    }

    public function destroy($id)
    {
        $model = new Department($id);
        $model->delete();

        return response()->json('Successfully Deleted');
    }
}
