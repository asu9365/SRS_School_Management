<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthService;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Login with account locking support.
     * FR-01: Secure Login, Account Locking after Failed Attempts
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $result = $this->authService->authenticate($request->only('email', 'password'));

        if (!$result['success']) {
            $response = ['message' => $result['message']];
            if (isset($result['locked_until'])) {
                $response['locked_until'] = $result['locked_until'];
            }
            return response()->json($response, $result['code']);
        }

        return response()->json([
            'user' => $result['user'],
            'access_token' => $result['token'],
            'token_type' => 'Bearer',
        ]);
    }

    /**
     * Logout and revoke current token.
     * FR-01: Logout, Session Management
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Send password reset link via email.
     * FR-01: Password Reset
     */
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $result = $this->authService->sendForgotPasswordLink($request->email);

        if ($result['success']) {
            return response()->json(['message' => $result['message']]);
        }

        return response()->json(['message' => $result['message']], 500);
    }

    /**
     * Reset password with token.
     * FR-01: Password Reset
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $result = $this->authService->resetPassword(
            $request->only('email', 'password', 'password_confirmation', 'token')
        );

        if ($result['success']) {
            return response()->json(['message' => $result['message']]);
        }

        return response()->json(['message' => $result['message']], 400);
    }

    /**
     * Change password (authenticated user).
     */
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password' => 'required|min:8|confirmed',
        ]);

        $result = $this->authService->changePassword(
            $request->user(),
            $request->current_password,
            $request->password
        );

        if ($result['success']) {
            return response()->json(['message' => $result['message']]);
        }

        return response()->json(['message' => $result['message']], 422);
    }

    /**
     * Get current user's active sessions (Sanctum tokens).
     * FR-01: Session Management
     */
    public function sessions(Request $request)
    {
        $tokens = $request->user()->tokens()
            ->orderByDesc('last_used_at')
            ->get()
            ->map(fn($token) => [
                'id' => $token->id,
                'name' => $token->name,
                'last_used_at' => $token->last_used_at,
                'created_at' => $token->created_at,
                'is_current' => $token->id === $request->user()->currentAccessToken()->id,
            ]);

        return response()->json([
            'success' => true,
            'data' => $tokens,
        ]);
    }

    /**
     * Revoke a specific session token.
     * FR-01: Session Management
     */
    public function revokeSession(Request $request, $tokenId)
    {
        $token = $request->user()->tokens()->find($tokenId);

        if (!$token) {
            return response()->json([
                'message' => 'Session not found.',
            ], 404);
        }

        // Prevent revoking current session
        if ($token->id === $request->user()->currentAccessToken()->id) {
            return response()->json([
                'message' => 'Cannot revoke your current session. Use logout instead.',
            ], 422);
        }

        $token->delete();

        return response()->json([
            'message' => 'Session revoked successfully.',
        ]);
    }

    /**
     * Get authenticated user profile.
     */
    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user()->load(['roles', 'school']),
        ]);
    }
}


