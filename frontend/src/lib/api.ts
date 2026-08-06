import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  const schoolId = localStorage.getItem('school_id') || '1'; // Default to SRHS for public pages

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  if (schoolId) {
    config.headers['X-School-ID'] = schoolId;
  }
  
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (localStorage.getItem('access_token')) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('auth_user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// =============================================================================
// Content Management (Legacy)
// =============================================================================
export const getNotices = () => api.get('/notices').then(res => res.data);
export const createNotice = (data: any) => api.post('/notices', data).then(res => res.data);
export const updateNotice = (id: string|number, data: any) => api.put(`/notices/${id}`, data).then(res => res.data);
export const deleteNotice = (id: string|number) => api.delete(`/notices/${id}`).then(res => res.data);

export const getUpdates = () => api.get('/updates').then(res => res.data);
export const createUpdate = (data: any) => api.post('/updates', data).then(res => res.data);
export const updateClassUpdate = (id: string|number, data: any) => api.put(`/updates/${id}`, data).then(res => res.data);
export const deleteUpdate = (id: string|number) => api.delete(`/updates/${id}`).then(res => res.data);

export const getHomework = () => api.get('/homework').then(res => res.data);
export const createHomework = (data: any) => api.post('/homework', data).then(res => res.data);
export const updateHomeworkItem = (id: string|number, data: any) => api.put(`/homework/${id}`, data).then(res => res.data);
export const deleteHomework = (id: string|number) => api.delete(`/homework/${id}`).then(res => res.data);

// =============================================================================
// Phase 2: Attendance & Assessments
// =============================================================================
export const getAttendance = (params = {}) => api.get('/attendance', { params }).then(res => res.data);
export const saveAttendance = (data: any) => api.post('/attendance', data).then(res => res.data);
export const getAssessments = (params = {}) => api.get('/assessments', { params }).then(res => res.data);
export const getMarks = (params = {}) => api.get('/marks', { params }).then(res => res.data);
export const saveMark = (data: any) => api.post('/marks', data).then(res => res.data);

// =============================================================================
// Phase 3: Communication
// =============================================================================
export const getUsers = () => api.get('/users').then(res => res.data);
export const createUser = (data: any) => api.post('/users', data).then(res => res.data);
export const updateUserStatus = (id: number|string, status: string) => api.patch(`/users/${id}/status`, { status }).then(res => res.data);
export const getMessages = () => api.get('/messages').then(res => res.data);
export const sendMessage = (data: any) => api.post('/messages', data).then(res => res.data);
export const getNotifications = () => api.get('/notifications').then(res => res.data);
export const markNotificationRead = (id: string|number) => api.patch(`/notifications/${id}/read`).then(res => res.data);
export const getAppointments = () => api.get('/appointments').then(res => res.data);
export const bookAppointment = (data: any) => api.post('/appointments', data).then(res => res.data);
export const approveAppointment = (id: string|number, data: any) => api.patch(`/appointments/${id}/approve`, data).then(res => res.data);

// =============================================================================
// FR-01: Enhanced Auth & Session Management
// =============================================================================
export const forgotPassword = (email: string) =>
  api.post('/forgot-password', { email }).then(res => res.data);

export const resetPassword = (data: { token: string; email: string; password: string; password_confirmation: string }) =>
  api.post('/reset-password', data).then(res => res.data);

export const changePassword = (data: { current_password: string; password: string; password_confirmation: string }) =>
  api.post('/change-password', data).then(res => res.data);

export const getSessions = () =>
  api.get('/sessions').then(res => res.data);

export const revokeSession = (tokenId: number) =>
  api.delete(`/sessions/${tokenId}`).then(res => res.data);

// =============================================================================
// FR-03: Academic Structure Management
// =============================================================================

// Academic Sessions
export const getAcademicSessions = () =>
  api.get('/academic/sessions').then(res => res.data);

export const createAcademicSession = (data: any) =>
  api.post('/academic/sessions', data).then(res => res.data);

export const updateAcademicSession = (id: number, data: any) =>
  api.put(`/academic/sessions/${id}`, data).then(res => res.data);

export const deleteAcademicSession = (id: number) =>
  api.delete(`/academic/sessions/${id}`).then(res => res.data);

export const getCurrentSession = () =>
  api.get('/academic/sessions/current/active').then(res => res.data);

// Terms
export const addTerm = (sessionId: number, data: any) =>
  api.post(`/academic/sessions/${sessionId}/terms`, data).then(res => res.data);

export const updateTerm = (sessionId: number, termId: number, data: any) =>
  api.put(`/academic/sessions/${sessionId}/terms/${termId}`, data).then(res => res.data);

export const deleteTerm = (sessionId: number, termId: number) =>
  api.delete(`/academic/sessions/${sessionId}/terms/${termId}`).then(res => res.data);

// Classes & Sections
export const getClasses = () =>
  api.get('/academic/classes').then(res => res.data);

export const createClass = (data: any) =>
  api.post('/academic/classes', data).then(res => res.data);

export const updateClass = (id: number, data: any) =>
  api.put(`/academic/classes/${id}`, data).then(res => res.data);

export const deleteClass = (id: number) =>
  api.delete(`/academic/classes/${id}`).then(res => res.data);

export const addSection = (classId: number, data: any) =>
  api.post(`/academic/classes/${classId}/sections`, data).then(res => res.data);

export const updateSection = (classId: number, sectionId: number, data: any) =>
  api.put(`/academic/classes/${classId}/sections/${sectionId}`, data).then(res => res.data);

export const deleteSection = (classId: number, sectionId: number) =>
  api.delete(`/academic/classes/${classId}/sections/${sectionId}`).then(res => res.data);

// Subjects
export const getSubjects = (params = {}) =>
  api.get('/academic/subjects', { params }).then(res => res.data);

export const createSubject = (data: any) =>
  api.post('/academic/subjects', data).then(res => res.data);

export const updateSubject = (id: number, data: any) =>
  api.put(`/academic/subjects/${id}`, data).then(res => res.data);

export const deleteSubject = (id: number) =>
  api.delete(`/academic/subjects/${id}`).then(res => res.data);

export const assignSubjectTeacher = (data: any) =>
  api.post('/academic/subjects/assign-teacher', data).then(res => res.data);

export const getSubjectAssignments = (sessionId: number) =>
  api.get('/academic/subject-assignments', { params: { academic_session_id: sessionId } }).then(res => res.data);

// Timetable
export const getTimetable = (classRoomId: number, sectionId: number, sessionId?: number) =>
  api.get('/academic/timetable', { params: { class_room_id: classRoomId, section_id: sectionId, academic_session_id: sessionId } }).then(res => res.data);

export const getTeacherTimetable = (teacherId: number, sessionId?: number) =>
  api.get(`/academic/timetable/teacher/${teacherId}`, { params: { academic_session_id: sessionId } }).then(res => res.data);

export const createTimetableSlot = (data: any) =>
  api.post('/academic/timetable', data).then(res => res.data);

export const createBulkTimetable = (slots: any[]) =>
  api.post('/academic/timetable/bulk', { slots }).then(res => res.data);

export const updateTimetableSlot = (id: number, data: any) =>
  api.put(`/academic/timetable/${id}`, data).then(res => res.data);

export const deleteTimetableSlot = (id: number) =>
  api.delete(`/academic/timetable/${id}`).then(res => res.data);

export const clearTimetable = (classRoomId: number, sectionId: number, sessionId: number) =>
  api.post('/academic/timetable/clear', { class_room_id: classRoomId, section_id: sectionId, academic_session_id: sessionId }).then(res => res.data);

// =============================================================================
// FR-02: Enhanced Student Operations
// =============================================================================
export const getStudents = (params = {}) =>
  api.get('/students', { params }).then(res => res.data);

export const getStudent = (id: number) =>
  api.get(`/students/${id}`).then(res => res.data);

export const createStudent = (data: any) =>
  api.post('/students', data).then(res => res.data);

export const updateStudent = (id: number, data: any) =>
  api.put(`/students/${id}`, data).then(res => res.data);

export const deleteStudent = (id: number) =>
  api.delete(`/students/${id}`).then(res => res.data);

export const transferStudent = (studentId: number, data: any) =>
  api.post(`/students/${studentId}/transfer`, data).then(res => res.data);

export const promoteStudents = (data: any) =>
  api.post('/students/promote', data).then(res => res.data);

export const archiveStudent = (studentId: number, data: any) =>
  api.post(`/students/${studentId}/archive`, data).then(res => res.data);

export const addGuardian = (studentId: number, data: any) =>
  api.post(`/students/${studentId}/guardians`, data).then(res => res.data);

export const uploadStudentDocument = (studentId: number, formData: FormData) =>
  api.post(`/students/${studentId}/documents`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(res => res.data);

// =============================================================================
// FR-04: Enhanced Teacher Operations
// =============================================================================
export const getTeachers = (params = {}) =>
  api.get('/teachers', { params }).then(res => res.data);

export const getTeacher = (id: number) =>
  api.get(`/teachers/${id}`).then(res => res.data);

export const createTeacher = (data: any) =>
  api.post('/teachers', data).then(res => res.data);

export const updateTeacher = (id: number, data: any) =>
  api.put(`/teachers/${id}`, data).then(res => res.data);

export const deleteTeacher = (id: number) =>
  api.delete(`/teachers/${id}`).then(res => res.data);

// =============================================================================
// Principal Workspace APIs
// =============================================================================
export const getPrincipalOverview = () =>
  api.get('/principal/overview').then(res => res.data);

export const getPrincipalAcademic = () =>
  api.get('/principal/academic').then(res => res.data);

export const getPrincipalStudentSuccess = () =>
  api.get('/principal/student-success').then(res => res.data);

export const getPrincipalHR = () =>
  api.get('/principal/hr').then(res => res.data);

export const getPrincipalReports = () =>
  api.get('/principal/reports').then(res => res.data);

export const getPrincipalKPIs = () =>
  api.get('/principal/kpis').then(res => res.data);

// =============================================================================
// Admissions APIs
// =============================================================================
export const getAdmissions = (params = {}) =>
  api.get('/admissions', { params }).then(res => res.data);

export const getAdmission = (id: number) =>
  api.get(`/admissions/${id}`).then(res => res.data);

export const createAdmission = (data: any) =>
  api.post('/admissions', data).then(res => res.data);

export const updateAdmission = (id: number, data: any) =>
  api.put(`/admissions/${id}`, data).then(res => res.data);

export const deleteAdmission = (id: number) =>
  api.delete(`/admissions/${id}`).then(res => res.data);

export const updateAdmissionStatus = (id: number, status: string) =>
  api.patch(`/admissions/${id}/status`, { status }).then(res => res.data);

// =============================================================================
// Fee Administration APIs
// =============================================================================
export const getFeeStructures = () =>
  api.get('/fees/structures').then(res => res.data);

export const createFeeStructure = (data: any) =>
  api.post('/fees/structures', data).then(res => res.data);

export const updateFeeStructure = (id: number, data: any) =>
  api.put(`/fees/structures/${id}`, data).then(res => res.data);

export const deleteFeeStructure = (id: number) =>
  api.delete(`/fees/structures/${id}`).then(res => res.data);

export const getFeePayments = (params = {}) =>
  api.get('/fees/payments', { params }).then(res => res.data);

export const recordFeePayment = (data: any) =>
  api.post('/fees/payments', data).then(res => res.data);

export const getFeeDefaulters = () =>
  api.get('/fees/defaulters').then(res => res.data);

// =============================================================================
// Transport Management APIs
// =============================================================================
export const getTransportRoutes = () =>
  api.get('/transport/routes').then(res => res.data);

export const createTransportRoute = (data: any) =>
  api.post('/transport/routes', data).then(res => res.data);

export const updateTransportRoute = (id: number, data: any) =>
  api.put(`/transport/routes/${id}`, data).then(res => res.data);

export const deleteTransportRoute = (id: number) =>
  api.delete(`/transport/routes/${id}`).then(res => res.data);

export const getVehicles = () =>
  api.get('/transport/vehicles').then(res => res.data);

export const createVehicle = (data: any) =>
  api.post('/transport/vehicles', data).then(res => res.data);

export const updateVehicle = (id: number, data: any) =>
  api.put(`/transport/vehicles/${id}`, data).then(res => res.data);

export const deleteVehicle = (id: number) =>
  api.delete(`/transport/vehicles/${id}`).then(res => res.data);

// =============================================================================
// Library APIs
// =============================================================================
export const getLibraryBooks = (params = {}) =>
  api.get('/library/books', { params }).then(res => res.data);

export const createLibraryBook = (data: any) =>
  api.post('/library/books', data).then(res => res.data);

export const updateLibraryBook = (id: number, data: any) =>
  api.put(`/library/books/${id}`, data).then(res => res.data);

export const deleteLibraryBook = (id: number) =>
  api.delete(`/library/books/${id}`).then(res => res.data);

export const getLibraryIssues = (params = {}) =>
  api.get('/library/issues', { params }).then(res => res.data);

export const issueBook = (data: any) =>
  api.post('/library/issues', data).then(res => res.data);

export const returnBook = (id: number) =>
  api.patch(`/library/issues/${id}/return`).then(res => res.data);

// =============================================================================
// Hostel Administration APIs
// =============================================================================
export const getHostelRooms = () =>
  api.get('/hostel/rooms').then(res => res.data);

export const createHostelRoom = (data: any) =>
  api.post('/hostel/rooms', data).then(res => res.data);

export const updateHostelRoom = (id: number, data: any) =>
  api.put(`/hostel/rooms/${id}`, data).then(res => res.data);

export const getHostelAllocations = () =>
  api.get('/hostel/allocations').then(res => res.data);

export const allocateHostelRoom = (data: any) =>
  api.post('/hostel/allocations', data).then(res => res.data);

export const deallocateHostelRoom = (id: number) =>
  api.delete(`/hostel/allocations/${id}`).then(res => res.data);

// =============================================================================
// Inventory & Asset APIs
// =============================================================================
export const getInventoryItems = (params = {}) =>
  api.get('/inventory/items', { params }).then(res => res.data);

export const createInventoryItem = (data: any) =>
  api.post('/inventory/items', data).then(res => res.data);

export const updateInventoryItem = (id: number, data: any) =>
  api.put(`/inventory/items/${id}`, data).then(res => res.data);

export const deleteInventoryItem = (id: number) =>
  api.delete(`/inventory/items/${id}`).then(res => res.data);

export const getInventoryTransactions = () =>
  api.get('/inventory/transactions').then(res => res.data);

export const createInventoryTransaction = (data: any) =>
  api.post('/inventory/transactions', data).then(res => res.data);

// =============================================================================
// Procurement & Vendor APIs
// =============================================================================
export const getVendors = () =>
  api.get('/procurement/vendors').then(res => res.data);

export const createVendor = (data: any) =>
  api.post('/procurement/vendors', data).then(res => res.data);

export const updateVendor = (id: number, data: any) =>
  api.put(`/procurement/vendors/${id}`, data).then(res => res.data);

export const deleteVendor = (id: number) =>
  api.delete(`/procurement/vendors/${id}`).then(res => res.data);

export const getPurchaseOrders = (params = {}) =>
  api.get('/procurement/orders', { params }).then(res => res.data);

export const createPurchaseOrder = (data: any) =>
  api.post('/procurement/orders', data).then(res => res.data);

export const updatePurchaseOrder = (id: number, data: any) =>
  api.put(`/procurement/orders/${id}`, data).then(res => res.data);

export const approvePurchaseOrder = (id: number) =>
  api.patch(`/procurement/orders/${id}/approve`).then(res => res.data);

// =============================================================================
// Document Management APIs
// =============================================================================
export const getDocuments = (params = {}) =>
  api.get('/documents', { params }).then(res => res.data);

export const uploadDocument = (formData: FormData) =>
  api.post('/documents', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(res => res.data);

export const deleteDocument = (id: number) =>
  api.delete(`/documents/${id}`).then(res => res.data);

// =============================================================================
// Workflow Automation APIs
// =============================================================================
export const getWorkflowRequests = (params = {}) =>
  api.get('/workflow/requests', { params }).then(res => res.data);

export const createWorkflowRequest = (data: any) =>
  api.post('/workflow/requests', data).then(res => res.data);

export const approveWorkflowRequest = (id: number, data: any) =>
  api.patch(`/workflow/requests/${id}/approve`, data).then(res => res.data);

export const rejectWorkflowRequest = (id: number, data: any) =>
  api.patch(`/workflow/requests/${id}/reject`, data).then(res => res.data);

export const getApprovalQueues = () =>
  api.get('/workflow/queues').then(res => res.data);

// =============================================================================
// Teacher Profile & Professional Development APIs
// =============================================================================
export const getTeacherProfile = (id: number) =>
  api.get(`/teachers/${id}/profile`).then(res => res.data);

export const updateTeacherProfile = (id: number, data: any) =>
  api.put(`/teachers/${id}/profile`, data).then(res => res.data);

export const getTeacherPD = (id: number) =>
  api.get(`/teachers/${id}/professional-development`).then(res => res.data);

export const addTeacherPD = (id: number, data: any) =>
  api.post(`/teachers/${id}/professional-development`, data).then(res => res.data);

export default api;

