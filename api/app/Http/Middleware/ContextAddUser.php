<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Context;
use Symfony\Component\HttpFoundation\Response;

/**
 * Ajoute l'utilisateur authentifié au context.
 * Il sera visible dans les logs.
 * A ajouter apres le middleware de sanctum
 */
class ContextAddUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user) {
            Context::add('userName', $user->name);
            Context::add('userEmail', $user->email);
        }

        return $next($request);
    }
}
