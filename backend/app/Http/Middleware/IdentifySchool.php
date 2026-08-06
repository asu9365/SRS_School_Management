<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IdentifySchool
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $schoolId = $request->header('X-School-ID');

        // If authenticated user exists, and we aren't bypassing (Super Admin), enforce user's school
        if ($request->user() && !$request->user()->hasRole('Super Admin')) {
            $schoolId = $request->user()->school_id;
        }

        // Default to SRHS (id 1) if not provided for now to not break public pages
        if (!$schoolId) {
            $schoolId = 1; 
        }

        app()->instance('current_school_id', $schoolId);

        return $next($request);
    }
}
