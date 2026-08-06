<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;
use App\Models\User;

class AuthService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Authenticate and return credentials/tokens.
     */
    public function authenticate(array $credentials)
    {
        $user = $this->userRepository->findByEmail($credentials['email']);

        if (!$user) {
            return ['success' => false, 'message' => 'Invalid credentials', 'code' => 401];
        }

        // Lock check
        if ($user->isLocked()) {
            $minutesLeft = now()->diffInMinutes($user->locked_until);
            return [
                'success' => false,
                'message' => "Account is locked. Try again in {$minutesLeft} minutes.",
                'code' => 423,
                'locked_until' => $user->locked_until
            ];
        }

        // Active check
        if (!$user->is_active) {
            return [
                'success' => false,
                'message' => 'Your account has been deactivated. Please contact administration.',
                'code' => 403
            ];
        }

        // Verify password
        if (!Hash::check($credentials['password'], $user->password)) {
            $user->incrementFailedAttempts();
            $attemptsLeft = max(0, 5 - $user->failed_login_attempts);

            if ($user->isLocked()) {
                return [
                    'success' => false,
                    'message' => 'Too many failed attempts. Account locked for 30 minutes.',
                    'code' => 423,
                    'locked_until' => $user->locked_until
                ];
            }

            return [
                'success' => false,
                'message' => "Invalid credentials. {$attemptsLeft} attempts remaining.",
                'code' => 401
            ];
        }

        // Success
        $user->resetFailedAttempts();
        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'success' => true,
            'user' => $user->load(['roles', 'school']),
            'token' => $token
        ];
    }

    /**
     * Forgot password link sender.
     */
    public function sendForgotPasswordLink(string $email)
    {
        $status = Password::sendResetLink(['email' => $email]);

        if ($status === Password::RESET_LINK_SENT) {
            return ['success' => true, 'message' => 'Password reset link sent to your email.'];
        }

        return ['success' => false, 'message' => 'Unable to send reset link. Please try again.'];
    }

    /**
     * Reset password execution.
     */
    public function resetPassword(array $data)
    {
        $status = Password::reset(
            $data,
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'failed_login_attempts' => 0,
                    'locked_until' => null,
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return ['success' => true, 'message' => 'Password has been reset successfully.'];
        }

        return ['success' => false, 'message' => 'Invalid or expired reset token.'];
    }

    /**
     * Change password.
     */
    public function changePassword(User $user, string $currentPassword, string $newPassword)
    {
        if (!Hash::check($currentPassword, $user->password)) {
            return ['success' => false, 'message' => 'Current password is incorrect.'];
        }

        $user->update([
            'password' => Hash::make($newPassword),
        ]);

        return ['success' => true, 'message' => 'Password changed successfully.'];
    }
}
