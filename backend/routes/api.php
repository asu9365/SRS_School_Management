<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\UpdateController;
use App\Http\Controllers\HomeworkController;
use App\Http\Controllers\AcademicSessionController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TimetableController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\AdmissionController;

use Illuminate\Support\Facades\Broadcast;

// =============================================================================
// Public Auth Routes (FR-01)
// =============================================================================
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Broadcast::routes(['middleware' => ['auth:sanctum']]);

// =============================================================================
// Authenticated Routes
// =============================================================================
Route::middleware('auth:sanctum')->group(function () {

    // --- Auth & Session Management (FR-01) ---
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return clone $request->user()->load('roles');
    });
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);
    Route::get('/sessions', [AuthController::class, 'sessions']);
    Route::delete('/sessions/{tokenId}', [AuthController::class, 'revokeSession']);

    Route::get('/users', function () {
        return response()->json([
            'success' => true,
            'data' => \App\Models\User::select('id', 'name', 'email')->get()
        ]);
    });

    // --- Content Management (Legacy) ---
    Route::apiResource('notices', NoticeController::class);
    Route::apiResource('updates', UpdateController::class);
    
    Route::apiResource('homework', HomeworkController::class);
    Route::post('homework/{id}/submit', [HomeworkController::class, 'submit']);
    Route::get('homework/{id}/submissions', [HomeworkController::class, 'submissions']);
    Route::post('submissions/{id}/grade', [HomeworkController::class, 'grade']);

    // --- Phase 2: Attendance, Leaves & Assessments ---
    Route::apiResource('attendance', AttendanceController::class);
    Route::post('attendance/teachers', [AttendanceController::class, 'storeTeacherAttendance']);
    
    Route::apiResource('leaves', LeaveController::class);
    Route::put('leaves/{id}/approve', [LeaveController::class, 'approve']);
    Route::put('leaves/{id}/reject', [LeaveController::class, 'reject']);

    // --- Parent Portal Summaries ---
    Route::get('parent/attendance-summary', [App\Http\Controllers\ParentPortalController::class, 'attendanceSummary']);
    Route::get('parent/assignment-summary', [App\Http\Controllers\ParentPortalController::class, 'assignmentSummary']);
    Route::get('parent/assessment-summary', [App\Http\Controllers\ParentPortalController::class, 'assessmentSummary']);
    Route::get('parent/student360-summary', [App\Http\Controllers\ParentPortalController::class, 'student360Summary']);
    Route::get('parent/fees-summary', [App\Http\Controllers\ParentPortalController::class, 'feesSummary']);

    // --- Teacher Workspace Operational Endpoints ---
    Route::get('teacher/dashboard', [App\Http\Controllers\TeacherWorkspaceController::class, 'dashboard']);
    Route::get('teacher/classes/today', [App\Http\Controllers\TeacherWorkspaceController::class, 'classesToday']);
    Route::get('teacher/tasks', [App\Http\Controllers\TeacherWorkspaceController::class, 'tasks']);
    Route::get('teacher/schedule/today', [App\Http\Controllers\TeacherWorkspaceController::class, 'scheduleToday']);
    Route::get('teacher/schedule/week', [App\Http\Controllers\TeacherWorkspaceController::class, 'scheduleWeek']);
    Route::get('teacher/lesson-plans', [App\Http\Controllers\TeacherWorkspaceController::class, 'indexLessonPlans']);
    Route::post('teacher/lesson-plans', [App\Http\Controllers\TeacherWorkspaceController::class, 'storeLessonPlan']);
    Route::put('teacher/lesson-plans/{id}', [App\Http\Controllers\TeacherWorkspaceController::class, 'updateLessonPlan']);
    Route::get('teacher/attendance/today', [App\Http\Controllers\TeacherWorkspaceController::class, 'attendanceToday']);
    Route::post('teacher/attendance', [App\Http\Controllers\TeacherWorkspaceController::class, 'markAttendance']);

    // --- Teacher Assessment & Gradebook Endpoints ---
    Route::get('teacher/assessments', [App\Http\Controllers\TeacherAssessmentController::class, 'index']);
    Route::post('teacher/assessments', [App\Http\Controllers\TeacherAssessmentController::class, 'store']);
    Route::post('teacher/marks', [App\Http\Controllers\TeacherAssessmentController::class, 'submitMarks']);
    Route::post('teacher/results/publish', [App\Http\Controllers\TeacherAssessmentController::class, 'publishResults']);
    Route::get('teacher/gradebook', [App\Http\Controllers\TeacherAssessmentController::class, 'gradebook']);

    // --- Teacher Reports & Analytics Endpoints ---
    Route::get('teacher/reports/students', [App\Http\Controllers\TeacherReportController::class, 'indexStudents']);
    Route::get('teacher/reports/students/{id}', [App\Http\Controllers\TeacherReportController::class, 'showStudent']);
    Route::get('teacher/reports/students/{id}/growth', [App\Http\Controllers\TeacherReportController::class, 'studentGrowth']);
    Route::get('teacher/reports/students/{id}/competencies', [App\Http\Controllers\TeacherReportController::class, 'studentCompetencies']);
    Route::get('teacher/reports/students/{id}/timeline', [App\Http\Controllers\TeacherReportController::class, 'studentTimeline']);
    Route::get('teacher/reports/classroom', [App\Http\Controllers\TeacherReportController::class, 'classroomOverview']);
    Route::get('teacher/reports/classroom/performance', [App\Http\Controllers\TeacherReportController::class, 'classroomPerformance']);
    Route::get('teacher/reports/classroom/grades', [App\Http\Controllers\TeacherReportController::class, 'classroomGrades']);
    Route::get('teacher/reports/classroom/competencies', [App\Http\Controllers\TeacherReportController::class, 'classroomCompetencies']);
    Route::get('teacher/reports/classroom/attendance', [App\Http\Controllers\TeacherReportController::class, 'classroomAttendance']);
    Route::get('teacher/reports/classroom/ai', [App\Http\Controllers\TeacherReportController::class, 'classroomAi']);

    // --- Teacher AI Generation Endpoints ---
    Route::post('teacher/ai/lesson', [App\Http\Controllers\TeacherAIController::class, 'generateLesson']);
    Route::post('teacher/ai/questions', [App\Http\Controllers\TeacherAIController::class, 'generateQuestions']);
    Route::post('teacher/ai/homework', [App\Http\Controllers\TeacherAIController::class, 'generateHomework']);

    // --- Teacher Productivity Reports Endpoints ---
    Route::get('teacher/productivity', [App\Http\Controllers\TeacherProductivityController::class, 'productivity']);
    Route::get('teacher/effectiveness', [App\Http\Controllers\TeacherProductivityController::class, 'effectiveness']);
    Route::get('teacher/lesson-analytics', [App\Http\Controllers\TeacherProductivityController::class, 'lessonAnalytics']);
    Route::get('teacher/communication-analytics', [App\Http\Controllers\TeacherProductivityController::class, 'communicationAnalytics']);
    Route::get('teacher/institutional-kpis', [App\Http\Controllers\TeacherProductivityController::class, 'institutionalKpis']);
    Route::get('teacher/productivity/ai', [App\Http\Controllers\TeacherProductivityController::class, 'aiAdvisory']);

    // --- Teacher Assessment Analytics Endpoints ---
    Route::get('teacher/analytics/assessments', [App\Http\Controllers\TeacherAssessmentAnalyticsController::class, 'assessments']);
    Route::get('teacher/analytics/questions', [App\Http\Controllers\TeacherAssessmentAnalyticsController::class, 'questions']);
    Route::get('teacher/analytics/competencies', [App\Http\Controllers\TeacherAssessmentAnalyticsController::class, 'competencies']);
    Route::get('teacher/analytics/bloom', [App\Http\Controllers\TeacherAssessmentAnalyticsController::class, 'bloom']);
    Route::get('teacher/analytics/outcomes', [App\Http\Controllers\TeacherAssessmentAnalyticsController::class, 'outcomes']);
    Route::get('teacher/analytics/health', [App\Http\Controllers\TeacherAssessmentAnalyticsController::class, 'health']);
    Route::get('teacher/analytics/assessment-ai', [App\Http\Controllers\TeacherAssessmentAnalyticsController::class, 'assessmentAi']);

    // --- Teacher Profile & Development Endpoints ---
    Route::get('teacher/profile', [App\Http\Controllers\TeacherProfileController::class, 'profile']);
    Route::get('teacher/qualifications', [App\Http\Controllers\TeacherProfileController::class, 'qualifications']);
    Route::get('teacher/training', [App\Http\Controllers\TeacherProfileController::class, 'training']);
    Route::get('teacher/portfolio', [App\Http\Controllers\TeacherProfileController::class, 'portfolio']);
    Route::get('teacher/achievements', [App\Http\Controllers\TeacherProfileController::class, 'achievements']);
    Route::get('teacher/development', [App\Http\Controllers\TeacherProfileController::class, 'development']);

    // --- Teacher Security & Audits Endpoints ---
    Route::get('teacher/security/session', [App\Http\Controllers\TeacherSecurityController::class, 'sessionDetails']);
    Route::get('teacher/security/devices', [App\Http\Controllers\TeacherSecurityController::class, 'activeDevices']);
    Route::get('teacher/security/logins', [App\Http\Controllers\TeacherSecurityController::class, 'loginHistory']);
    Route::get('teacher/security/audit', [App\Http\Controllers\TeacherSecurityController::class, 'auditLogs']);
    Route::post('teacher/security/mfa', [App\Http\Controllers\TeacherSecurityController::class, 'toggleMfa']);

    // --- Principal Workspace Commands Endpoints ---
    Route::get('principal/dashboard', [App\Http\Controllers\PrincipalWorkspaceController::class, 'dashboard']);
    Route::get('principal/school-health', [App\Http\Controllers\PrincipalWorkspaceController::class, 'schoolHealth']);
    Route::get('principal/executive-summary', [App\Http\Controllers\PrincipalWorkspaceController::class, 'executiveSummary']);
    Route::get('principal/alerts', [App\Http\Controllers\PrincipalWorkspaceController::class, 'alerts']);
    Route::get('principal/actions', [App\Http\Controllers\PrincipalWorkspaceController::class, 'actions']);
    Route::put('principal/dashboard/settings', [App\Http\Controllers\PrincipalWorkspaceController::class, 'updateSettings']);

    // --- Principal Academic Governance Endpoints ---
    Route::get('principal/academic/dashboard', [App\Http\Controllers\PrincipalGovernanceController::class, 'academicDashboard']);
    Route::get('principal/curriculum', [App\Http\Controllers\PrincipalGovernanceController::class, 'curriculum']);
    Route::get('principal/departments', [App\Http\Controllers\PrincipalGovernanceController::class, 'departments']);
    Route::get('principal/outcomes', [App\Http\Controllers\PrincipalGovernanceController::class, 'outcomes']);
    Route::get('principal/competencies', [App\Http\Controllers\PrincipalGovernanceController::class, 'competencies']);
    Route::get('principal/policies', [App\Http\Controllers\PrincipalGovernanceController::class, 'policies']);
    Route::get('principal/academic-ai', [App\Http\Controllers\PrincipalGovernanceController::class, 'academicAi']);

    // --- Principal Student Success & Wellbeing Endpoints ---
    Route::get('principal/student-success', [App\Http\Controllers\PrincipalOperationsController::class, 'studentSuccess']);
    Route::get('principal/student-risks', [App\Http\Controllers\PrincipalOperationsController::class, 'studentRisks']);
    Route::get('principal/interventions', [App\Http\Controllers\PrincipalOperationsController::class, 'interventions']);
    Route::get('principal/student360', [App\Http\Controllers\PrincipalOperationsController::class, 'student360']);
    Route::get('principal/wellbeing', [App\Http\Controllers\PrincipalOperationsController::class, 'wellbeing']);
    Route::get('principal/student-ai', [App\Http\Controllers\PrincipalOperationsController::class, 'studentAi']);

    // --- Principal Operations Governance Endpoints ---
    Route::get('principal/operations', [App\Http\Controllers\PrincipalOperationsController::class, 'operations']);
    Route::get('principal/infrastructure', [App\Http\Controllers\PrincipalOperationsController::class, 'infrastructure']);
    Route::get('principal/transport', [App\Http\Controllers\PrincipalOperationsController::class, 'transport']);
    Route::get('principal/maintenance', [App\Http\Controllers\PrincipalOperationsController::class, 'maintenance']);
    Route::get('principal/library', [App\Http\Controllers\PrincipalOperationsController::class, 'library']);
    Route::get('principal/hostel', [App\Http\Controllers\PrincipalOperationsController::class, 'hostel']);
    Route::get('principal/emergency', [App\Http\Controllers\PrincipalOperationsController::class, 'emergency']);
    Route::get('principal/operations-ai', [App\Http\Controllers\PrincipalOperationsController::class, 'operationsAi']);

    // --- Principal Admissions Governance Endpoints ---
    Route::get('principal/admissions', [App\Http\Controllers\PrincipalAdmissionsFinanceController::class, 'admissionsSummary']);
    Route::get('principal/admissions/applications', [App\Http\Controllers\PrincipalAdmissionsFinanceController::class, 'applicationsList']);
    Route::get('principal/admissions/seats', [App\Http\Controllers\PrincipalAdmissionsFinanceController::class, 'seatsMatrix']);
    Route::get('principal/admissions/merit-list', [App\Http\Controllers\PrincipalAdmissionsFinanceController::class, 'meritList']);
    Route::get('principal/admissions/scholarships', [App\Http\Controllers\PrincipalAdmissionsFinanceController::class, 'scholarshipsList']);
    Route::get('principal/admissions/ai', [App\Http\Controllers\PrincipalAdmissionsFinanceController::class, 'admissionsAi']);
    Route::get('principal/admissions/enrollment', [App\Http\Controllers\PrincipalAdmissionsFinanceController::class, 'enrollment']);

    // --- Principal Finance Governance Endpoints ---
    Route::get('principal/finance', [App\Http\Controllers\PrincipalAdmissionsFinanceController::class, 'financeSummary']);
    Route::get('principal/finance/revenue', [App\Http\Controllers\PrincipalAdmissionsFinanceController::class, 'revenue']);
    Route::get('principal/finance/budget', [App\Http\Controllers\PrincipalAdmissionsFinanceController::class, 'budget']);
    Route::get('principal/finance/expenses', [App\Http\Controllers\PrincipalAdmissionsFinanceController::class, 'expenses']);
    Route::get('principal/finance/payroll', [App\Http\Controllers\PrincipalAdmissionsFinanceController::class, 'payroll']);
    Route::get('principal/finance/scholarships', [App\Http\Controllers\PrincipalAdmissionsFinanceController::class, 'financeScholarships']);
    Route::get('principal/finance/forecast', [App\Http\Controllers\PrincipalAdmissionsFinanceController::class, 'financeForecast']);
    Route::get('principal/finance/ai', [App\Http\Controllers\PrincipalAdmissionsFinanceController::class, 'financeAi']);

    // --- Principal HR Governance Endpoints ---
    Route::get('principal/hr', [App\Http\Controllers\PrincipalHrParentsController::class, 'hrSummary']);
    Route::get('principal/hr/employees', [App\Http\Controllers\PrincipalHrParentsController::class, 'employeesList']);
    Route::get('principal/hr/recruitment', [App\Http\Controllers\PrincipalHrParentsController::class, 'recruitmentRequests']);
    Route::get('principal/hr/attendance', [App\Http\Controllers\PrincipalHrParentsController::class, 'hrAttendance']);
    Route::get('principal/hr/leave', [App\Http\Controllers\PrincipalHrParentsController::class, 'hrLeave']);
    Route::get('principal/hr/performance', [App\Http\Controllers\PrincipalHrParentsController::class, 'hrPerformance']);
    Route::get('principal/hr/training', [App\Http\Controllers\PrincipalHrParentsController::class, 'hrTraining']);
    Route::get('principal/hr/ai', [App\Http\Controllers\PrincipalHrParentsController::class, 'hrAi']);

    // --- Principal Parents Feedback Endpoints ---
    Route::get('principal/parents', [App\Http\Controllers\PrincipalHrParentsController::class, 'parentsSummary']);
    Route::get('principal/parents/communication', [App\Http\Controllers\PrincipalHrParentsController::class, 'parentsCommunication']);
    Route::get('principal/parents/ptm', [App\Http\Controllers\PrincipalHrParentsController::class, 'parentsPtm']);
    Route::get('principal/parents/feedback', [App\Http\Controllers\PrincipalHrParentsController::class, 'parentsFeedback']);
    Route::get('principal/parents/complaints', [App\Http\Controllers\PrincipalHrParentsController::class, 'parentsComplaints']);
    Route::get('principal/parents/community', [App\Http\Controllers\PrincipalHrParentsController::class, 'parentsCommunity']);
    Route::get('principal/parents/ai', [App\Http\Controllers\PrincipalHrParentsController::class, 'parentsAi']);

    // --- Principal Safety Compliance Endpoints ---
    Route::get('principal/compliance', [App\Http\Controllers\PrincipalHrParentsController::class, 'complianceSummary']);
    Route::get('principal/compliance/audits', [App\Http\Controllers\PrincipalHrParentsController::class, 'complianceAudits']);
    Route::get('principal/compliance/policies', [App\Http\Controllers\PrincipalHrParentsController::class, 'compliancePolicies']);
    Route::get('principal/compliance/risks', [App\Http\Controllers\PrincipalHrParentsController::class, 'complianceRisks']);
    Route::get('principal/compliance/accreditation', [App\Http\Controllers\PrincipalHrParentsController::class, 'complianceAccreditation']);
    Route::get('principal/compliance/inspections', [App\Http\Controllers\PrincipalHrParentsController::class, 'complianceInspections']);
    Route::get('principal/compliance/ai', [App\Http\Controllers\PrincipalHrParentsController::class, 'complianceAi']);

    // --- Principal AI Advisory Services Endpoints ---
    Route::get('principal/ai', [App\Http\Controllers\PrincipalHrParentsController::class, 'aiSummary']);
    Route::get('principal/ai/briefing', [App\Http\Controllers\PrincipalHrParentsController::class, 'aiBriefing']);
    Route::get('principal/ai/predictions', [App\Http\Controllers\PrincipalHrParentsController::class, 'aiPredictions']);
    Route::get('principal/ai/recommendations', [App\Http\Controllers\PrincipalHrParentsController::class, 'aiRecommendations']);
    Route::post('principal/ai/simulate', [App\Http\Controllers\PrincipalHrParentsController::class, 'aiSimulate']);
    Route::post('principal/ai/chat', [App\Http\Controllers\PrincipalHrParentsController::class, 'aiChat']);
    Route::get('principal/ai/decision-support', [App\Http\Controllers\PrincipalHrParentsController::class, 'aiDecisionSupport']);

    // --- Principal Executive Reports Endpoints ---
    Route::get('principal/reports', [App\Http\Controllers\PrincipalReportsController::class, 'reportsList']);
    Route::get('principal/analytics', [App\Http\Controllers\PrincipalReportsController::class, 'analyticsSummary']);
    Route::post('principal/reports/custom', [App\Http\Controllers\PrincipalReportsController::class, 'customReport']);
    Route::get('principal/reports/scheduled', [App\Http\Controllers\PrincipalReportsController::class, 'scheduledReports']);
    Route::get('principal/kpis', [App\Http\Controllers\PrincipalReportsController::class, 'kpis']);
    Route::get('principal/benchmark', [App\Http\Controllers\PrincipalReportsController::class, 'benchmark']);
    Route::get('principal/datawarehouse', [App\Http\Controllers\PrincipalReportsController::class, 'datawarehouse']);

    // --- System & Administration Portal Endpoints ---
    Route::get('system/health', [App\Http\Controllers\PrincipalReportsController::class, 'systemHealth']);
    Route::get('system/status', [App\Http\Controllers\PrincipalReportsController::class, 'systemStatus']);
    Route::get('system/webhooks', [App\Http\Controllers\PrincipalReportsController::class, 'webhooks']);
    Route::get('system/metrics', [App\Http\Controllers\PrincipalReportsController::class, 'systemMetrics']);
    Route::get('docs', [App\Http\Controllers\PrincipalReportsController::class, 'docs']);

    // --- Database Architecture Monitoring Endpoints ---
    Route::get('database/health', [App\Http\Controllers\PrincipalSecurityDatabaseController::class, 'dbHealth']);
    Route::get('database/statistics', [App\Http\Controllers\PrincipalSecurityDatabaseController::class, 'dbStatistics']);
    Route::get('database/backups', [App\Http\Controllers\PrincipalSecurityDatabaseController::class, 'dbBackups']);
    Route::get('database/replication', [App\Http\Controllers\PrincipalSecurityDatabaseController::class, 'dbReplication']);
    Route::get('database/performance', [App\Http\Controllers\PrincipalSecurityDatabaseController::class, 'dbPerformance']);

    // --- Principal Security Workspace Monitoring Endpoints ---
    Route::get('principal/security', [App\Http\Controllers\PrincipalSecurityDatabaseController::class, 'securitySummary']);
    Route::get('principal/security/audit', [App\Http\Controllers\PrincipalSecurityDatabaseController::class, 'securityAudit']);
    Route::get('principal/security/sessions', [App\Http\Controllers\PrincipalSecurityDatabaseController::class, 'securitySessions']);
    Route::get('principal/security/events', [App\Http\Controllers\PrincipalSecurityDatabaseController::class, 'securityEvents']);
    Route::post('principal/security/mfa', [App\Http\Controllers\PrincipalSecurityDatabaseController::class, 'securityMfa']);
    Route::get('principal/security/devices', [App\Http\Controllers\PrincipalSecurityDatabaseController::class, 'securityDevices']);

    // --- Principal Executive KPIs & Operational Monitoring Endpoints ---
    Route::get('principal/kpis', [App\Http\Controllers\PrincipalKpisController::class, 'kpis']);
    Route::get('principal/operations/metrics', [App\Http\Controllers\PrincipalKpisController::class, 'operationsMetrics']);
    Route::get('principal/benchmark', [App\Http\Controllers\PrincipalKpisController::class, 'benchmark']);
    Route::get('principal/forecast', [App\Http\Controllers\PrincipalKpisController::class, 'forecast']);

    // --- Principal Faculty Workspace Monitoring Endpoints ---
    Route::get('principal/faculty/dashboard', [App\Http\Controllers\PrincipalGovernanceController::class, 'facultyDashboard']);
    Route::get('principal/faculty/performance', [App\Http\Controllers\PrincipalGovernanceController::class, 'facultyPerformance']);
    Route::get('principal/faculty/observations', [App\Http\Controllers\PrincipalGovernanceController::class, 'facultyObservations']);
    Route::get('principal/faculty/development', [App\Http\Controllers\PrincipalGovernanceController::class, 'facultyDevelopment']);
    Route::get('principal/faculty/recognition', [App\Http\Controllers\PrincipalGovernanceController::class, 'facultyRecognition']);
    Route::get('principal/faculty/promotions', [App\Http\Controllers\PrincipalGovernanceController::class, 'facultyPromotions']);
    Route::get('principal/faculty/ai', [App\Http\Controllers\PrincipalGovernanceController::class, 'facultyAi']);

    // --- Administration Workspace Dashboard Endpoints ---
    Route::get('admin/dashboard', [App\Http\Controllers\AdminWorkspaceController::class, 'dashboard']);
    Route::get('admin/dashboard/summary', [App\Http\Controllers\AdminWorkspaceController::class, 'summary']);
    Route::get('admin/dashboard/approvals', [App\Http\Controllers\AdminWorkspaceController::class, 'approvals']);
    Route::get('admin/dashboard/notifications', [App\Http\Controllers\AdminWorkspaceController::class, 'notifications']);
    Route::get('admin/dashboard/activity', [App\Http\Controllers\AdminWorkspaceController::class, 'activity']);
    Route::get('admin/dashboard/kpis', [App\Http\Controllers\AdminWorkspaceController::class, 'kpis']);
    Route::get('admin/dashboard/ai', [App\Http\Controllers\AdminWorkspaceController::class, 'aiInsights']);

    // --- Administration Workspace Student Administration Endpoints ---
    Route::get('admin/students', [App\Http\Controllers\AdminStudentStaffController::class, 'studentsIndex']);
    Route::get('admin/students/{id}', [App\Http\Controllers\AdminStudentStaffController::class, 'studentShow']);
    Route::post('admin/students', [App\Http\Controllers\AdminStudentStaffController::class, 'studentStore']);
    Route::post('admin/students/{id}/transfer', [App\Http\Controllers\AdminStudentStaffController::class, 'studentTransfer']);
    Route::post('admin/students/{id}/promote', [App\Http\Controllers\AdminStudentStaffController::class, 'studentPromote']);
    Route::post('admin/students/{id}/certificate', [App\Http\Controllers\AdminStudentStaffController::class, 'studentCertificate']);
    Route::post('admin/students/{id}/idcard', [App\Http\Controllers\AdminStudentStaffController::class, 'studentIdCard']);
    Route::get('admin/students/{id}/timeline', [App\Http\Controllers\AdminStudentStaffController::class, 'studentTimeline']);

    // --- Administration Workspace Staff Administration Endpoints ---
    Route::get('admin/employees', [App\Http\Controllers\AdminStudentStaffController::class, 'employeesIndex']);
    Route::get('admin/employees/{id}', [App\Http\Controllers\AdminStudentStaffController::class, 'employeeShow']);
    Route::post('admin/employees', [App\Http\Controllers\AdminStudentStaffController::class, 'employeeStore']);
    Route::post('admin/employees/{id}/transfer', [App\Http\Controllers\AdminStudentStaffController::class, 'employeeTransfer']);
    Route::post('admin/employees/{id}/idcard', [App\Http\Controllers\AdminStudentStaffController::class, 'employeeIdCard']);
    Route::get('admin/employees/{id}/timeline', [App\Http\Controllers\AdminStudentStaffController::class, 'employeeTimeline']);
    Route::post('admin/employees/{id}/exit', [App\Http\Controllers\AdminStudentStaffController::class, 'employeeExit']);

    // --- Administration Workspace User Management Endpoints ---
    Route::get('admin/users', [App\Http\Controllers\AdminStudentStaffController::class, 'usersIndex']);
    Route::post('admin/users', [App\Http\Controllers\AdminStudentStaffController::class, 'userStore']);
    Route::post('admin/users/{id}/roles', [App\Http\Controllers\AdminStudentStaffController::class, 'userRolesUpdate']);
    Route::get('admin/permissions', [App\Http\Controllers\AdminStudentStaffController::class, 'permissionsIndex']);
    Route::get('admin/sessions', [App\Http\Controllers\AdminStudentStaffController::class, 'sessionsIndex']);
    Route::get('admin/auth/logs', [App\Http\Controllers\AdminStudentStaffController::class, 'authLogs']);
    Route::get('admin/identity-providers', [App\Http\Controllers\AdminStudentStaffController::class, 'identityProviders']);

    // --- Administration Workspace Academic Administration Endpoints ---
    Route::get('admin/academics', [App\Http\Controllers\AdminStudentStaffController::class, 'academicsIndex']);
    Route::get('admin/academic-sessions', [App\Http\Controllers\AdminStudentStaffController::class, 'academicSessions']);
    Route::get('admin/classes', [App\Http\Controllers\AdminStudentStaffController::class, 'classesIndex']);
    Route::get('admin/subjects', [App\Http\Controllers\AdminStudentStaffController::class, 'subjectsIndex']);
    Route::get('admin/curriculum', [App\Http\Controllers\AdminStudentStaffController::class, 'curriculum']);
    Route::get('admin/promotion', [App\Http\Controllers\AdminStudentStaffController::class, 'promotion']);
    Route::get('admin/calendar', [App\Http\Controllers\AdminStudentStaffController::class, 'calendar']);

    // --- Administration Workspace Admissions Operations Endpoints ---
    Route::get('admin/admissions', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'admissionsSummary']);
    Route::get('admin/admissions/applications', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'applicationsList']);
    Route::get('admin/admissions/verification', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'documentVerifications']);
    Route::get('admin/admissions/merit', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'meritList']);
    Route::post('admin/admissions/allocate-seats', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'allocateSeats']);
    Route::post('admin/admissions/enroll', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'enrollStudent']);
    Route::get('admin/admissions/waitlist', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'waitlist']);

    // --- Administration Workspace Fees Administration Endpoints ---
    Route::get('admin/fees', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'feesSummary']);
    Route::get('admin/fees/invoices', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'invoicesList']);
    Route::get('admin/fees/payments', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'paymentsList']);
    Route::post('admin/fees/invoices', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'createInvoice']);
    Route::post('admin/fees/payments', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'recordPayment']);
    Route::get('admin/fees/scholarships', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'scholarshipsList']);
    Route::get('admin/fees/refunds', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'refundsList']);
    Route::get('admin/fees/outstanding', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'outstandingFees']);

    // --- Administration Workspace Timetable Administration Endpoints ---
    Route::get('admin/timetable', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'timetable']);
    Route::post('admin/timetable/generate', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'generateTimetable']);
    Route::get('admin/timetable/classes/{id}', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'classTimetable']);
    Route::get('admin/timetable/teachers/{id}', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'teacherTimetable']);
    Route::get('admin/timetable/substitutions', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'substitutions']);
    Route::get('admin/timetable/conflicts', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'conflicts']);
    Route::post('admin/timetable/publish', [App\Http\Controllers\AdminAdmissionsFeesController::class, 'publishTimetable']);

    // --- Administration Workspace Transport Management Endpoints ---
    Route::get('admin/transport', [App\Http\Controllers\AdminTransportLibraryController::class, 'transportSummary']);
    Route::get('admin/transport/vehicles', [App\Http\Controllers\AdminTransportLibraryController::class, 'vehiclesList']);
    Route::get('admin/transport/routes', [App\Http\Controllers\AdminTransportLibraryController::class, 'routesList']);
    Route::get('admin/transport/gps', [App\Http\Controllers\AdminTransportLibraryController::class, 'gpsLocations']);
    Route::post('admin/transport/allocate', [App\Http\Controllers\AdminTransportLibraryController::class, 'allocateStudent']);
    Route::get('admin/transport/maintenance', [App\Http\Controllers\AdminTransportLibraryController::class, 'maintenanceLogs']);
    Route::get('admin/transport/incidents', [App\Http\Controllers\AdminTransportLibraryController::class, 'incidents']);

    // --- Administration Workspace Library Management Endpoints ---
    Route::get('admin/library', [App\Http\Controllers\AdminTransportLibraryController::class, 'librarySummary']);
    Route::get('admin/library/catalog', [App\Http\Controllers\AdminTransportLibraryController::class, 'catalog']);
    Route::post('admin/library/issue', [App\Http\Controllers\AdminTransportLibraryController::class, 'issueBook']);
    Route::post('admin/library/return', [App\Http\Controllers\AdminTransportLibraryController::class, 'returnBook']);
    Route::get('admin/library/reservations', [App\Http\Controllers\AdminTransportLibraryController::class, 'reservations']);
    Route::get('admin/library/digital', [App\Http\Controllers\AdminTransportLibraryController::class, 'digitalResources']);
    Route::get('admin/library/inventory', [App\Http\Controllers\AdminTransportLibraryController::class, 'inventory']);

    // --- Administration Workspace Hostel Management Endpoints ---
    Route::get('admin/hostel', [App\Http\Controllers\AdminHostelInventoryController::class, 'hostelSummary']);
    Route::get('admin/hostel/residents', [App\Http\Controllers\AdminHostelInventoryController::class, 'residentsList']);
    Route::get('admin/hostel/rooms', [App\Http\Controllers\AdminHostelInventoryController::class, 'roomsList']);
    Route::post('admin/hostel/allocate', [App\Http\Controllers\AdminHostelInventoryController::class, 'allocateRoom']);
    Route::get('admin/hostel/leaves', [App\Http\Controllers\AdminHostelInventoryController::class, 'leavesList']);
    Route::get('admin/hostel/visitors', [App\Http\Controllers\AdminHostelInventoryController::class, 'visitorsList']);
    Route::get('admin/hostel/mess', [App\Http\Controllers\AdminHostelInventoryController::class, 'messSchedule']);
    Route::get('admin/hostel/maintenance', [App\Http\Controllers\AdminHostelInventoryController::class, 'maintenanceLogs']);

    // --- Administration Workspace Inventory & Asset Management Endpoints ---
    Route::get('admin/inventory', [App\Http\Controllers\AdminHostelInventoryController::class, 'inventorySummary']);
    Route::get('admin/inventory/assets', [App\Http\Controllers\AdminHostelInventoryController::class, 'assetsList']);
    Route::get('admin/inventory/stock', [App\Http\Controllers\AdminHostelInventoryController::class, 'stockList']);
    Route::post('admin/inventory/allocate', [App\Http\Controllers\AdminHostelInventoryController::class, 'allocateAsset']);
    Route::get('admin/inventory/maintenance', [App\Http\Controllers\AdminHostelInventoryController::class, 'inventoryMaintenance']);
    Route::get('admin/inventory/audits', [App\Http\Controllers\AdminHostelInventoryController::class, 'inventoryAudits']);
    Route::get('admin/inventory/depreciation', [App\Http\Controllers\AdminHostelInventoryController::class, 'assetDepreciation']);

    // --- Administration Workspace Procurement & Vendor Endpoints ---
    Route::get('admin/procurement', [App\Http\Controllers\AdminProcurementDocumentController::class, 'procurementSummary']);
    Route::get('admin/procurement/requisitions', [App\Http\Controllers\AdminProcurementDocumentController::class, 'requisitionsList']);
    Route::get('admin/procurement/orders', [App\Http\Controllers\AdminProcurementDocumentController::class, 'purchaseOrdersList']);
    Route::get('admin/procurement/vendors', [App\Http\Controllers\AdminProcurementDocumentController::class, 'vendorsList']);
    Route::get('admin/procurement/grn', [App\Http\Controllers\AdminProcurementDocumentController::class, 'goodsReceiptNotes']);
    Route::get('admin/procurement/invoices', [App\Http\Controllers\AdminProcurementDocumentController::class, 'vendorInvoices']);
    Route::get('admin/procurement/contracts', [App\Http\Controllers\AdminProcurementDocumentController::class, 'contractsList']);

    // --- Administration Workspace Document Management Endpoints ---
    Route::get('admin/documents', [App\Http\Controllers\AdminProcurementDocumentController::class, 'documentsList']);
    Route::get('admin/documents/repository', [App\Http\Controllers\AdminProcurementDocumentController::class, 'repository']);
    Route::post('admin/documents', [App\Http\Controllers\AdminProcurementDocumentController::class, 'uploadDocument']);
    Route::get('admin/documents/{id}/versions', [App\Http\Controllers\AdminProcurementDocumentController::class, 'documentVersions']);
    Route::post('admin/documents/{id}/approve', [App\Http\Controllers\AdminProcurementDocumentController::class, 'approveDocument']);
    Route::post('admin/documents/{id}/sign', [App\Http\Controllers\AdminProcurementDocumentController::class, 'signDocument']);
    Route::get('admin/documents/search', [App\Http\Controllers\AdminProcurementDocumentController::class, 'searchDocuments']);

    // --- Administration Workspace Workflow Automation Endpoints ---
    Route::get('admin/workflows', [App\Http\Controllers\AdminWorkflowCommunicationController::class, 'workflowsSummary']);
    Route::get('admin/workflows/designer', [App\Http\Controllers\AdminWorkflowCommunicationController::class, 'designer']);
    Route::post('admin/workflows', [App\Http\Controllers\AdminWorkflowCommunicationController::class, 'createWorkflow']);
    Route::get('admin/tasks', [App\Http\Controllers\AdminWorkflowCommunicationController::class, 'tasksList']);
    Route::get('admin/approvals', [App\Http\Controllers\AdminWorkflowCommunicationController::class, 'approvalsList']);
    Route::get('admin/workflows/logs', [App\Http\Controllers\AdminWorkflowCommunicationController::class, 'workflowLogs']);
    Route::get('admin/workflows/sla', [App\Http\Controllers\AdminWorkflowCommunicationController::class, 'slaList']);

    // --- Administration Workspace Institutional Communications Endpoints ---
    Route::get('admin/communications', [App\Http\Controllers\AdminWorkflowCommunicationController::class, 'communicationsSummary']);
    Route::get('admin/notifications', [App\Http\Controllers\AdminWorkflowCommunicationController::class, 'notificationsList']);
    Route::post('admin/communications/broadcast', [App\Http\Controllers\AdminWorkflowCommunicationController::class, 'broadcastMessage']);
    Route::get('admin/communications/templates', [App\Http\Controllers\AdminWorkflowCommunicationController::class, 'templatesList']);
    Route::get('admin/announcements', [App\Http\Controllers\AdminWorkflowCommunicationController::class, 'announcementsList']);
    Route::get('admin/communications/delivery', [App\Http\Controllers\AdminWorkflowCommunicationController::class, 'deliveryLogs']);
    Route::get('admin/communications/analytics', [App\Http\Controllers\AdminWorkflowCommunicationController::class, 'communicationsAnalytics']);

    // --- Administration Workspace Reports & Analytics Endpoints ---
    Route::get('admin/reports', [App\Http\Controllers\AdminReportsSecurityController::class, 'reportsSummary']);
    Route::get('admin/analytics', [App\Http\Controllers\AdminReportsSecurityController::class, 'analytics']);
    Route::post('admin/reports/generate', [App\Http\Controllers\AdminReportsSecurityController::class, 'generateReport']);
    Route::get('admin/reports/scheduled', [App\Http\Controllers\AdminReportsSecurityController::class, 'scheduledReports']);
    Route::get('admin/kpis', [App\Http\Controllers\AdminReportsSecurityController::class, 'kpis']);
    Route::get('admin/analytics/ai', [App\Http\Controllers\AdminReportsSecurityController::class, 'aiAnalytics']);
    Route::post('admin/reports/custom', [App\Http\Controllers\AdminReportsSecurityController::class, 'createCustomReport']);

    // --- Administration Workspace Database Administration Endpoints ---
    Route::get('admin/database/health', [App\Http\Controllers\AdminReportsSecurityController::class, 'databaseHealth']);
    Route::get('admin/database/statistics', [App\Http\Controllers\AdminReportsSecurityController::class, 'databaseStatistics']);
    Route::get('admin/database/backups', [App\Http\Controllers\AdminReportsSecurityController::class, 'databaseBackups']);
    Route::get('admin/database/migrations', [App\Http\Controllers\AdminReportsSecurityController::class, 'databaseMigrations']);
    Route::get('admin/database/performance', [App\Http\Controllers\AdminReportsSecurityController::class, 'databasePerformance']);

    // --- Administration Workspace Security Administration Endpoints ---
    Route::get('admin/security', [App\Http\Controllers\AdminReportsSecurityController::class, 'securitySummary']);
    Route::get('admin/security/audit', [App\Http\Controllers\AdminReportsSecurityController::class, 'securityAudit']);
    Route::get('admin/security/roles', [App\Http\Controllers\AdminReportsSecurityController::class, 'securityRoles']);
    Route::get('admin/security/permissions', [App\Http\Controllers\AdminReportsSecurityController::class, 'securityPermissions']);
    Route::get('admin/security/incidents', [App\Http\Controllers\AdminReportsSecurityController::class, 'securityIncidents']);
    Route::get('admin/security/threats', [App\Http\Controllers\AdminReportsSecurityController::class, 'securityThreats']);
    Route::get('admin/security/compliance', [App\Http\Controllers\AdminReportsSecurityController::class, 'securityCompliance']);

    // Admissions Pipeline
    Route::apiResource('admissions', AdmissionController::class);
    Route::put('admissions/{id}/approve', [AdmissionController::class, 'approve']);
    Route::put('admissions/{id}/reject', [AdmissionController::class, 'reject']);

    Route::apiResource('assessments', App\Http\Controllers\API\AssessmentController::class);
    Route::apiResource('marks', App\Http\Controllers\API\MarkController::class);

    // --- Phase 3: Communication ---
    Route::apiResource('messages', App\Http\Controllers\MessageController::class);
    Route::apiResource('notifications', App\Http\Controllers\NotificationController::class);
    Route::patch('notifications/{notification}/read', [App\Http\Controllers\NotificationController::class, 'markAsRead']);
    Route::patch('appointments/{appointment}/approve', [App\Http\Controllers\AppointmentController::class, 'approve']);

    // =========================================================================
    // FR-03: Academic Structure Management
    // =========================================================================
    Route::prefix('academic')->group(function () {
        // Academic Sessions & Terms
        Route::apiResource('sessions', AcademicSessionController::class)
            ->parameters(['sessions' => 'academicSession']);
        Route::get('sessions/current/active', [AcademicSessionController::class, 'current']);
        Route::post('sessions/{academicSession}/terms', [AcademicSessionController::class, 'storeTerm']);
        Route::put('sessions/{academicSession}/terms/{term}', [AcademicSessionController::class, 'updateTerm']);
        Route::delete('sessions/{academicSession}/terms/{term}', [AcademicSessionController::class, 'destroyTerm']);

        // Classes & Sections
        Route::apiResource('classes', ClassController::class)
            ->parameters(['classes' => 'classRoom']);
        Route::post('classes/{classRoom}/sections', [ClassController::class, 'storeSection']);
        Route::put('classes/{classRoom}/sections/{section}', [ClassController::class, 'updateSection']);
        Route::delete('classes/{classRoom}/sections/{section}', [ClassController::class, 'destroySection']);

        // Subjects
        Route::apiResource('subjects', SubjectController::class);
        Route::post('subjects/assign-teacher', [SubjectController::class, 'assignTeacher']);
        Route::get('subject-assignments', [SubjectController::class, 'getAssignments']);

        // Timetable
        Route::get('timetable', [TimetableController::class, 'index']);
        Route::get('timetable/teacher/{teacherId}', [TimetableController::class, 'teacherTimetable']);
        Route::post('timetable', [TimetableController::class, 'store']);
        Route::post('timetable/bulk', [TimetableController::class, 'bulkStore']);
        Route::put('timetable/{timetableSlot}', [TimetableController::class, 'update']);
        Route::delete('timetable/{timetableSlot}', [TimetableController::class, 'destroy']);
        Route::post('timetable/clear', [TimetableController::class, 'clear']);
    });

    // =========================================================================
    // FR-02: Enhanced Student Operations
    // =========================================================================
    Route::post('students/{student}/transfer', [StudentController::class, 'transfer']);
    Route::post('students/promote', [StudentController::class, 'promote']);
    Route::post('students/{student}/archive', [StudentController::class, 'archive']);
    Route::post('students/{student}/guardians', [StudentController::class, 'addGuardian']);
    Route::post('students/{student}/documents', [StudentController::class, 'uploadDocument']);
    Route::get('students/{student}/timeline', [StudentController::class, 'timeline']);

    // Appointment notes & signaling
    Route::post('appointments/{appointment}/notes', [App\Http\Controllers\AppointmentController::class, 'saveNotes']);
    Route::post('appointments/{appointment}/signal', [App\Http\Controllers\AppointmentController::class, 'signal']);

    // --- Phase 5: Student 360 & Analytics ---
    Route::get('student-360/{student}', [App\Http\Controllers\Student360Controller::class, 'show']);
    Route::post('student-360/{student}/portfolio', [App\Http\Controllers\Student360Controller::class, 'addPortfolio']);
    Route::post('student-360/{student}/competency', [App\Http\Controllers\Student360Controller::class, 'addCompetencyScore']);
    Route::post('student-360/{student}/behavior', [App\Http\Controllers\Student360Controller::class, 'addBehaviorRecord']);
    
    Route::post('student-360/achievements', [App\Http\Controllers\Student360Controller::class, 'storeAchievement']);
    Route::post('student-360/interventions', [App\Http\Controllers\Student360Controller::class, 'storeIntervention']);
    Route::put('student-360/interventions/{id}', [App\Http\Controllers\Student360Controller::class, 'updateIntervention']);

    // --- Phase 6: AI Insights & Predictive Analytics ---
    Route::get('ai/student/{student}/insights', [App\Http\Controllers\AIController::class, 'getInsights']);
    Route::post('ai/student/{student}/report-comment', [App\Http\Controllers\AIController::class, 'generateReportComment']);
    Route::post('ai/ptm/{appointment}/summarize', [App\Http\Controllers\AIController::class, 'summarizePTM']);
    Route::post('ai/coach/chat/{student}', [App\Http\Controllers\AIController::class, 'chatWithCoach']);
});

// =============================================================================
// Public/Semi-Public Routes
// =============================================================================
Route::apiResource('students', StudentController::class);
Route::apiResource('teachers', App\Http\Controllers\TeacherController::class);
Route::apiResource('appointments', App\Http\Controllers\AppointmentController::class);

// =============================================================================
// Super Admin Routes (FR-17)
// =============================================================================
Route::middleware(['auth:sanctum', 'role:Super Admin'])->group(function () {
    Route::apiResource('schools', App\Http\Controllers\SchoolController::class);
});
