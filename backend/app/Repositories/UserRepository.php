<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends BaseRepository
{
    public function __construct(User $user)
    {
        $this->model = $user;
    }

    /**
     * Find user by email.
     */
    public function findByEmail(string $email)
    {
        return $this->model->where('email', $email)->first();
    }
}
