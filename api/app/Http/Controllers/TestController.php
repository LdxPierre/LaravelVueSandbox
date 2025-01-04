<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function hello(Request $request): JsonResponse
    {
        return new JsonResponse('hello world');
    }
}
