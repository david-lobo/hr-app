<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ReportService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function index(ReportService $reportService)
    {
        $results = $reportService::report(request()->input('report', ''));
        return response()->json($results);
    }
}
