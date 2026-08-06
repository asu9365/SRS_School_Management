<?php

namespace App\Http\Controllers;

use App\Services\TeacherProfileService;
use Illuminate\Http\Request;

class TeacherProfileController extends Controller
{
    protected $profileService;

    public function __construct(TeacherProfileService $profileService)
    {
        $this->profileService = $profileService;
    }

    /**
     * Get teacher profile details.
     * GET /api/teacher/profile
     */
    public function profile(Request $request)
    {
        $result = $this->profileService->getProfileSummary(auth()->id());
        return response()->json($result);
    }

    /**
     * Get qualifications.
     * GET /api/teacher/qualifications
     */
    public function qualifications(Request $request)
    {
        $result = $this->profileService->getQualifications(auth()->id());
        return response()->json($result);
    }

    /**
     * Get training.
     * GET /api/teacher/training
     */
    public function training(Request $request)
    {
        $result = $this->profileService->getTrainingLogs(auth()->id());
        return response()->json($result);
    }

    /**
     * Get portfolio.
     * GET /api/teacher/portfolio
     */
    public function portfolio(Request $request)
    {
        $result = $this->profileService->getTeachingPortfolio(auth()->id());
        return response()->json($result);
    }

    /**
     * Get achievements.
     * GET /api/teacher/achievements
     */
    public function achievements(Request $request)
    {
        $result = $this->profileService->getAchievements(auth()->id());
        return response()->json($result);
    }

    /**
     * Get professional development goals.
     * GET /api/teacher/development
     */
    public function development(Request $request)
    {
        $result = $this->profileService->getDevelopmentPlans(auth()->id());
        return response()->json($result);
    }
}
