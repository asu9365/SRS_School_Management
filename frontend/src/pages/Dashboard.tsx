import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Calendar, Users, Briefcase, Eye, X, BookOpen } from 'lucide-react';
import Toast from '../components/Toast';
import AttendanceManager from '../modules/attendance/AttendanceManager';
import MarksManager from '../modules/assessments/MarksManager';
import NoticeManager from '../modules/communication/NoticeManager';
import UpdateManager from '../modules/communication/UpdateManager';
import HomeworkManager from '../modules/homework/HomeworkManager';
import { approveAppointment, getStudents, getTeachers, getAppointments } from '../lib/api';
import ManagementLayout from '../components/ManagementLayout';
import AdmissionsManager from '../modules/administration/AdmissionsManager';
import FeeManager from '../modules/administration/FeeManager';
import TransportManager from '../modules/administration/TransportManager';
import LibraryManager from '../modules/administration/LibraryManager';
import HostelManager from '../modules/administration/HostelManager';
import InventoryManager from '../modules/administration/InventoryManager';
import ProcurementManager from '../modules/administration/ProcurementManager';
import DocumentManager from '../modules/administration/DocumentManager';
import WorkflowManager from '../modules/administration/WorkflowManager';

export default function Dashboard({ auth }: { auth: any }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [studentsList, setStudentsList] = useState<any[]>([]);
  const [teachersList, setTeachersList] = useState<any[]>([]);
  const [appointmentsList, setAppointmentsList] = useState<any[]>([]);
  const [stats, setStats] = useState({ students: 0, teachers: 0, appointments: 0 });
  
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  
  const navigate = useNavigate();
  const location = useLocation();

  // Active tab comes from URL params, defaulting to 'students'
  const activeTab = new URLSearchParams(location.search).get('tab') || 'students';

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, [auth, navigate]);

  const fetchStats = async () => {
    try {
      const [studentsRes, teachersRes, apptsRes] = await Promise.all([
        getStudents(),
        getTeachers(),
        getAppointments()
      ]);

      setStats({
        students: studentsRes.success ? studentsRes.data.length : 0,
        teachers: teachersRes.success ? teachersRes.data.length : 0,
        appointments: apptsRes.success ? apptsRes.data.length : 0
      });

      if (studentsRes.success) setStudentsList(studentsRes.data);
      if (teachersRes.success) setTeachersList(teachersRes.data);
      if (apptsRes.success) setAppointmentsList(apptsRes.data);
    } catch (err) {
      console.error("Error loading dashboard data", err);
    }
  };

  useEffect(() => {
    if (auth) {
      fetchStats();
    }
  }, [auth]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await getStudents({ name: searchQuery });
      if (res.success) {
        setStudentsList(res.data);
      } else {
        setToastType('error');
        setToastMessage(res.message || 'Search failed');
      }
    } catch (err) {
      setToastType('error');
      setToastMessage('Error connecting to the search service');
    } finally {
      setLoading(false);
    }
  };

  if (!auth) return null;

  return (
    <ManagementLayout auth={auth} title="Dashboard Overview">
      <div className="space-y-6">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
              <Users size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{stats.students}</div>
              <div className="text-sm font-medium text-slate-500">Total Students</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 border-l-4 border-l-orange-500">
            <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
              <Briefcase size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{stats.teachers}</div>
              <div className="text-sm font-medium text-slate-500">Active Teachers</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 border-l-4 border-l-emerald-500">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
              <Calendar size={24} />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{stats.appointments}</div>
              <div className="text-sm font-medium text-slate-500">Appointments</div>
            </div>
          </div>
        </div>

        {/* Tab Content Wrapper */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm min-h-[500px]">
          
          {activeTab === 'notices' && (
            <div className="p-6 bg-slate-50/50">
              <NoticeManager />
            </div>
          )}

          {activeTab === 'updates' && (
            <div className="p-6 bg-slate-50/50">
              <UpdateManager />
            </div>
          )}

          {activeTab === 'homework' && (
            <div className="p-6 bg-slate-50/50">
              <HomeworkManager />
            </div>
          )}
          
          {activeTab === 'attendance' && (
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-6">Attendance Management</h2>
              <AttendanceManager />
            </div>
          )}
          
          {activeTab === 'marks' && (
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-6">Marks & Grades Management</h2>
              <MarksManager />
            </div>
          )}
          
          {activeTab === 'students' && (
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-lg font-bold text-slate-800">Student Directory</h2>
                <form onSubmit={handleSearch} className="w-full sm:w-auto flex gap-2">
                  <div className="relative flex-1 sm:w-64">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search student..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-shadow"
                    />
                  </div>
                  <button type="submit" disabled={loading} className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium rounded-lg transition-colors">
                    {loading ? '...' : 'Search'}
                  </button>
                </form>
              </div>

              {studentsList.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                        <th className="p-4">Roll No</th>
                        <th className="p-4">Class</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Blood Group</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {studentsList.map((std, index) => (
                        <tr key={std.id || std.student_id || index} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 text-sm font-medium text-slate-800">{std.rollno}</td>
                          <td className="p-4 text-sm text-slate-600">Class {std.class}</td>
                          <td className="p-4 text-sm text-slate-800 font-medium">{`${std.Fname} ${std.Mname || ''} ${std.Lname}`}</td>
                          <td className="p-4 text-sm text-slate-600">{std.blood}</td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => setSelectedStudent(std)} 
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md text-xs font-semibold transition-colors"
                              >
                                <Eye size={14} /> Details
                              </button>
                              <button 
                                onClick={() => navigate(`/student-360/${std.id || std.student_id}`)} 
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-md text-xs font-semibold transition-colors"
                                title="Student 360 Profile"
                              >
                                <BookOpen size={14} /> 360°
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users size={48} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-500 font-medium">No student records found.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-6">Recent Appointments</h2>
              {appointmentsList.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                        <th className="p-4">Student</th>
                        <th className="p-4">Class</th>
                        <th className="p-4">Guardian</th>
                        <th className="p-4">Phone</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {appointmentsList.map((appt) => {
                        const dt = new Date(appt.created_at);
                        return (
                          <tr key={appt.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 text-sm font-medium text-slate-800">
                              {appt.SName || 
                               (appt.parent?.student_profile 
                                 ? `${appt.parent.student_profile.Fname} ${appt.parent.student_profile.Lname}` 
                                 : appt.parent?.studentProfile 
                                   ? `${appt.parent.studentProfile.Fname} ${appt.parent.studentProfile.Lname}` 
                                   : appt.parent?.name || 'N/A')}
                            </td>
                            <td className="p-4 text-sm text-slate-600">
                              {appt.Class || appt.parent?.student_profile?.class || appt.parent?.studentProfile?.class || 'N/A'}
                            </td>
                            <td className="p-4 text-sm text-slate-600">
                              {appt.GName || appt.parent?.name || 'N/A'}
                            </td>
                            <td className="p-4 text-sm text-slate-600">
                              {appt.number || appt.parent?.phone || 'N/A'}
                            </td>
                            <td className="p-4 text-sm text-slate-600">{dt.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                            <td className="p-4 text-sm">
                              <span className={`px-2.5 py-1 text-xs rounded-full font-bold uppercase tracking-wider ${appt.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : appt.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                                {appt.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              {appt.status === 'Pending' && (
                                <div className="flex items-center justify-end gap-2">
                                  <button 
                                    onClick={async () => {
                                      try {
                                        await approveAppointment(appt.id, { status: 'Approved' });
                                        fetchStats();
                                        setToastMessage('Appointment Approved');
                                        setToastType('success');
                                      } catch(e) { console.error(e); }
                                    }} 
                                    className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-md transition-colors shadow-sm"
                                  >
                                    Approve
                                  </button>
                                  <button 
                                    onClick={async () => {
                                      try {
                                        await approveAppointment(appt.id, { status: 'Rejected' });
                                        fetchStats();
                                        setToastMessage('Appointment Rejected');
                                        setToastType('success');
                                      } catch(e) { console.error(e); }
                                    }} 
                                    className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-md transition-colors shadow-sm"
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                              {appt.status === 'Approved' && (
                                <button 
                                  onClick={() => navigate(appt.meeting_link || `/meeting/${appt.id}`)}
                                  className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold rounded-md transition-colors shadow-sm"
                                >
                                  Join Meeting
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-500 font-medium">No appointments found.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'teachers' && (
            <div className="p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-6">Teacher Directory</h2>
              {teachersList.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                        <th className="p-4">Name</th>
                        <th className="p-4">Assigned Class</th>
                        <th className="p-4">Phone</th>
                        <th className="p-4">Qualification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {teachersList.map((teacher) => (
                        <tr key={teacher.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 text-sm font-bold text-slate-800">{teacher.Name || `${teacher.Fname} ${teacher.Lname}`}</td>
                          <td className="p-4 text-sm text-slate-600">{teacher.classAssign ? `Class ${teacher.classAssign}` : 'N/A'}</td>
                          <td className="p-4 text-sm text-slate-600">{teacher.Phone}</td>
                          <td className="p-4 text-sm text-slate-600">{teacher.qualification || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-500 font-medium">No teacher records found.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'admissions'  && <div className="p-6"><AdmissionsManager /></div>}
          {activeTab === 'fees'        && <div className="p-6"><FeeManager /></div>}
          {activeTab === 'transport'   && <div className="p-6"><TransportManager /></div>}
          {activeTab === 'library'     && <div className="p-6"><LibraryManager /></div>}
          {activeTab === 'hostel'      && <div className="p-6"><HostelManager /></div>}
          {activeTab === 'inventory'   && <div className="p-6"><InventoryManager /></div>}
          {activeTab === 'procurement' && <div className="p-6"><ProcurementManager /></div>}
          {activeTab === 'documents'   && <div className="p-6"><DocumentManager /></div>}
          {activeTab === 'workflow'    && <div className="p-6"><WorkflowManager /></div>}

        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" onClick={() => setSelectedStudent(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800">Student Profile</h3>
              <button onClick={() => setSelectedStudent(null)} className="text-slate-400 hover:text-slate-600 bg-white p-1.5 rounded-full shadow-sm">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="mb-8">
                <h4 className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-4">Personal Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><span className="text-slate-500 text-sm">Full Name:</span> <div className="font-medium text-slate-800">{`${selectedStudent.Fname} ${selectedStudent.Mname || ''} ${selectedStudent.Lname}`}</div></div>
                  <div><span className="text-slate-500 text-sm">Class:</span> <div className="font-medium text-slate-800">{selectedStudent.class}</div></div>
                  <div><span className="text-slate-500 text-sm">Roll Number:</span> <div className="font-medium text-slate-800">{selectedStudent.rollno}</div></div>
                  <div><span className="text-slate-500 text-sm">Blood Group:</span> <div className="font-medium text-slate-800">{selectedStudent.blood}</div></div>
                  <div><span className="text-slate-500 text-sm">Date of Birth:</span> <div className="font-medium text-slate-800">{selectedStudent.DOB}</div></div>
                  <div><span className="text-slate-500 text-sm">Caste:</span> <div className="font-medium text-slate-800">{selectedStudent.caste || 'N/A'}</div></div>
                  {/* New fields if they exist */}
                  {selectedStudent.email && <div><span className="text-slate-500 text-sm">Email:</span> <div className="font-medium text-slate-800">{selectedStudent.email}</div></div>}
                  {selectedStudent.gender && <div><span className="text-slate-500 text-sm">Gender:</span> <div className="font-medium text-slate-800">{selectedStudent.gender}</div></div>}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-4">Guardian Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><span className="text-slate-500 text-sm">Father's Name:</span> <div className="font-medium text-slate-800">{selectedStudent.Ftname || 'N/A'}</div></div>
                  <div><span className="text-slate-500 text-sm">Father's Contact:</span> <div className="font-medium text-slate-800">{selectedStudent.Fcontact || 'N/A'}</div></div>
                  <div><span className="text-slate-500 text-sm">Mother's Name:</span> <div className="font-medium text-slate-800">{selectedStudent.Mtname || 'N/A'}</div></div>
                  <div><span className="text-slate-500 text-sm">Mother's Contact:</span> <div className="font-medium text-slate-800">{selectedStudent.Mcontact || 'N/A'}</div></div>
                  {selectedStudent.Gurdian && (
                    <>
                      <div><span className="text-slate-500 text-sm">Guardian Name:</span> <div className="font-medium text-slate-800">{selectedStudent.Gurdian}</div></div>
                      <div><span className="text-slate-500 text-sm">Guardian Contact:</span> <div className="font-medium text-slate-800">{selectedStudent.Gcontact || 'N/A'}</div></div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-4">Address Information</h4>
                <p className="text-slate-800 font-medium leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">
                  {selectedStudent.address}, {selectedStudent.POaddress && `P.O: ${selectedStudent.POaddress}, `} 
                  PIN: {selectedStudent.pin}, {selectedStudent.Dist} District, {selectedStudent.State} State.
                </p>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button onClick={() => setSelectedStudent(null)} className="px-6 py-2 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast 
        message={toastMessage} 
        type={toastType} 
        onClose={() => setToastMessage('')} 
      />
    </ManagementLayout>
  );
}
