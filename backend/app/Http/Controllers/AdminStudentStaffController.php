<?php

namespace App\Http\Controllers;

use App\Services\AdminStudentStaffService;
use Illuminate\Http\Request;

class AdminStudentStaffController extends Controller
{
    protected $studentStaffService;

    public function __construct(AdminStudentStaffService $studentStaffService)
    {
        $this->studentStaffService = $studentStaffService;
    }

    /**
     * Get students.
     * GET /api/admin/students
     */
    public function studentsIndex(Request $request)
    {
        $result = $this->studentStaffService->getStudentsList();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get student details.
     * GET /api/admin/students/{id}
     */
    public function studentShow($id)
    {
        $result = $this->studentStaffService->getStudentById($id);
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Store new student registration details.
     * POST /api/admin/students
     */
    public function studentStore(Request $request)
    {
        $result = $this->studentStaffService->registerStudent($request->all());
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Transfer student.
     * POST /api/admin/students/{id}/transfer
     */
    public function studentTransfer($id, Request $request)
    {
        $result = $this->studentStaffService->transferStudent($id, $request->all());
        return response()->json($result);
    }

    /**
     * Promote student.
     * POST /api/admin/students/{id}/promote
     */
    public function studentPromote($id, Request $request)
    {
        $result = $this->studentStaffService->promoteStudent($id, $request->all());
        return response()->json($result);
    }

    /**
     * Issue certificates.
     * POST /api/admin/students/{id}/certificate
     */
    public function studentCertificate($id, Request $request)
    {
        $result = $this->studentStaffService->issueCertificate($id, $request->all());
        return response()->json($result);
    }

    /**
     * Issue student ID card.
     * POST /api/admin/students/{id}/idcard
     */
    public function studentIdCard($id)
    {
        $result = $this->studentStaffService->issueStudentIdCard($id);
        return response()->json($result);
    }

    /**
     * Get student timeline events.
     * GET /api/admin/students/{id}/timeline
     */
    public function studentTimeline($id)
    {
        $result = $this->studentStaffService->getStudentTimeline($id);
        return response()->json($result);
    }

    /**
     * Get employees.
     * GET /api/admin/employees
     */
    public function employeesIndex(Request $request)
    {
        $result = $this->studentStaffService->getEmployeesList();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get employee details.
     * GET /api/admin/employees/{id}
     */
    public function employeeShow($id)
    {
        $result = $this->studentStaffService->getEmployeeById($id);
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Store new employee registration details.
     * POST /api/admin/employees
     */
    public function employeeStore(Request $request)
    {
        $result = $this->studentStaffService->registerEmployee($request->all());
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Transfer staff to different departments.
     * POST /api/admin/employees/{id}/transfer
     */
    public function employeeTransfer($id, Request $request)
    {
        $result = $this->studentStaffService->transferEmployee($id, $request->all());
        return response()->json($result);
    }

    /**
     * Issue employee ID card.
     * POST /api/admin/employees/{id}/idcard
     */
    public function employeeIdCard($id)
    {
        $result = $this->studentStaffService->issueEmployeeIdCard($id);
        return response()->json($result);
    }

    /**
     * Get employee service history timeline.
     * GET /api/admin/employees/{id}/timeline
     */
    public function employeeTimeline($id)
    {
        $result = $this->studentStaffService->getEmployeeTimeline($id);
        return response()->json($result);
    }

    /**
     * Terminate employee contracts.
     * POST /api/admin/employees/{id}/exit
     */
    public function employeeExit($id)
    {
        $result = $this->studentStaffService->exitEmployee($id);
        return response()->json($result);
    }

    /**
     * Get system users.
     * GET /api/admin/users
     */
    public function usersIndex(Request $request)
    {
        $result = $this->studentStaffService->getUsersList();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Create user.
     * POST /api/admin/users
     */
    public function userStore(Request $request)
    {
        $result = $this->studentStaffService->createUser($request->all());
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Update user RBAC roles.
     * POST /api/admin/users/{id}/roles
     */
    public function userRolesUpdate($id, Request $request)
    {
        $result = $this->studentStaffService->updateUserRoles($id, $request->all());
        return response()->json($result);
    }

    /**
     * Get lists of security permissions.
     * GET /api/admin/permissions
     */
    public function permissionsIndex(Request $request)
    {
        $result = $this->studentStaffService->getPermissionsList();
        return response()->json($result);
    }

    /**
     * Get active browser sessions details.
     * GET /api/admin/sessions
     */
    public function sessionsIndex(Request $request)
    {
        $result = $this->studentStaffService->getSessionsList();
        return response()->json($result);
    }

    /**
     * Get user audit history logs.
     * GET /api/admin/auth/logs
     */
    public function authLogs(Request $request)
    {
        $result = $this->studentStaffService->getAuthLogs();
        return response()->json($result);
    }

    /**
     * Get federated SSO identity providers configurations.
     * GET /api/admin/identity-providers
     */
    public function identityProviders(Request $request)
    {
        $result = $this->studentStaffService->getIdentityProviders();
        return response()->json($result);
    }

    /**
     * Get academics.
     * GET /api/admin/academics
     */
    public function academicsIndex(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => [
                'total_classrooms' => ClassRoom::count(),
            ]
        ]);
    }

    /**
     * Get academic sessions.
     * GET /api/admin/academic-sessions
     */
    public function academicSessions(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => [
                'active_session' => '2026-2027 Session',
            ]
        ]);
    }

    /**
     * Get classes.
     * GET /api/admin/classes
     */
    public function classesIndex(Request $request)
    {
        $result = $this->studentStaffService->getClassrooms();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get subjects.
     * GET /api/admin/subjects
     */
    public function subjectsIndex(Request $request)
    {
        $result = $this->studentStaffService->getSubjects();
        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    /**
     * Get curriculum.
     * GET /api/admin/curriculum
     */
    public function curriculum(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => [
                'curriculum_version' => 'V1.4',
            ]
        ]);
    }

    /**
     * Get promotions list.
     * GET /api/admin/promotion
     */
    public function promotion(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => StudentPromotion::all()
        ]);
    }

    /**
     * Get school calendar.
     * GET /api/admin/calendar
     */
    public function calendar(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => [
                'term_start_date' => '2026-06-01',
                'term_end_date' => '2026-12-15',
            ]
        ]);
    }
}
