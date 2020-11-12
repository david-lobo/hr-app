<?php

namespace App\Http\Controllers;

use App\Models\Sample;
use Illuminate\Http\Request;

class SampleController extends Controller
{
    public function index()
    {
        $items = Sample::orderBy('created_at', 'desc')->get();

        return $items->toJson();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'body' => 'required',
        ]);

        $item = Sample::create([
            'title' => $validatedData['title'],
            'body' => $validatedData['body'],
        ]);

        return response()->json('  Added Successfully! ');
    }

    public function edit($id)
    {
        $item = Sample::find($id);

        return response()->json($item);
    }

    public function update(Request $request, $id)
    {
        $item = Sample::find($id);
        $item->title = $request->title;
        $item->body = $request->body;
        $item->save();

        return response()->json('Successfully Updated');
    }

    public function destroy($id)
    {
        $item = Sample::find($id);
        $item->delete();

        return response()->json('Successfully Deleted');
    }
}
