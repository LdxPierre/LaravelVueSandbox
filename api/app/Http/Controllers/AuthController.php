<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => 'email',
            'password' => 'string'
        ]);

        if (!Auth::attempt($credentials)) {
            return new JsonResponse('Invalid credentials', 400);
        }

        $request->session()->regenerate();

        return new JsonResponse(Auth::user());
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return new JsonResponse();
    }
}
