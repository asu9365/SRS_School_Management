<?php

namespace App\Services;

use App\Repositories\AcademicSessionRepository;

class AcademicSessionService
{
    protected $sessionRepository;

    public function __construct(AcademicSessionRepository $sessionRepository)
    {
        $this->sessionRepository = $sessionRepository;
    }

    public function listSessions()
    {
        return $this->sessionRepository->getOrderedSessions();
    }

    public function createSession(array $data)
    {
        if (!empty($data['is_current']) && $data['is_current']) {
            $this->sessionRepository->resetCurrentSessionsExcept(0);
        }

        $session = $this->sessionRepository->create($data);

        // Add terms if present
        if (!empty($data['terms'])) {
            foreach ($data['terms'] as $index => $termData) {
                $session->terms()->create([
                    'name' => $termData['name'],
                    'start_date' => $termData['start_date'],
                    'end_date' => $termData['end_date'],
                    'sequence' => $termData['sequence'] ?? ($index + 1),
                ]);
            }
        }

        return $session->load('terms');
    }

    public function updateSession($id, array $data)
    {
        if (!empty($data['is_current']) && $data['is_current']) {
            $this->sessionRepository->resetCurrentSessionsExcept($id);
        }

        $session = $this->sessionRepository->update($id, $data);
        return $session ? $session->load('terms') : null;
    }

    public function deleteSession($id)
    {
        return $this->sessionRepository->delete($id);
    }

    public function getCurrentSession()
    {
        return $this->sessionRepository->getCurrentSession();
    }

    // --- Term Management ---

    public function addTerm($sessionId, array $data)
    {
        $session = $this->sessionRepository->find($sessionId);
        if (!$session) return null;

        return $session->terms()->create($data);
    }

    public function updateTerm($termId, array $data)
    {
        $term = \App\Models\Term::find($termId);
        if ($term) {
            $term->update($data);
            return $term;
        }
        return null;
    }

    public function deleteTerm($termId)
    {
        $term = \App\Models\Term::find($termId);
        return $term ? $term->delete() : false;
    }
}
