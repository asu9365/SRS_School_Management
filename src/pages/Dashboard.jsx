import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, UserPlus, FileSpreadsheet, Calendar, Users, Briefcase, Bell, Eye, X, BookOpen } from 'lucide-react';
import Toast from '../components/Toast';

export default function Dashboard({ auth }) {
  const [activeTab, setActiveTab] = useState('students'); // 'students', 'appointments', 'teachers'
  const [searchQuery, setSearchQuery] = useState('');
  const [studentsList, setStudentsList] = useState([]);
  const [teachersList, setTeachersList] = useState([]);
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [stats, setStats] = useState({ students: 0, teachers: 0, appointments: 0 });
  
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, [auth, navigate]);

  // Load dashboard statistics and lists
  const fetchStats = async () => {
    try {
      const [studentsRes, teachersRes, apptsRes] = await Promise.all([
        fetch('/api/students.php').then(r => r.json()),
        fetch('/api/teachers.php').then(r => r.json()),
        fetch('/api/appointment.php').then(r => r.json())
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

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/students.php?name=${encodeURIComponent(searchQuery)}`);
      const res = await response.json();
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
    <section className="section-padding" style={styles.section}>
      <div className="container">
        {/* Welcome Banner */}
        <div className="glass-card" style={styles.welcomeBanner}>
          <div>
            <h1 style={styles.welcomeTitle}>Counter Desk Dashboard</h1>
            <p style={styles.welcomeText}>Welcome back, <strong>{auth.username}</strong> ({auth.role}). You have full administrative access to student registries and appointment schedules.</p>
          </div>
          <div style={styles.badge}>{auth.role} Portal</div>
        </div>

        {/* Stats Grid */}
        <div className="grid-3" style={styles.statsGrid}>
          <div className="glass-card" style={styles.statCard}>
            <div style={styles.statIconBox}><Users size={24} /></div>
            <div>
              <div style={styles.statVal}>{stats.students}</div>
              <div style={styles.statLabel}>Registered Students</div>
            </div>
          </div>
          <div className="glass-card" style={{ ...styles.statCard, borderLeft: '4px solid var(--primary)' }}>
            <div style={{ ...styles.statIconBox, color: 'var(--primary)', background: 'var(--primary-glow)' }}><Briefcase size={24} /></div>
            <div>
              <div style={styles.statVal}>{stats.teachers}</div>
              <div style={styles.statLabel}>Active Teachers</div>
            </div>
          </div>
          <div className="glass-card" style={{ ...styles.statCard, borderLeft: '4px solid var(--success)' }}>
            <div style={{ ...styles.statIconBox, color: 'var(--success)', background: 'hsl(145, 80%, 96%)' }}><Calendar size={24} /></div>
            <div>
              <div style={styles.statVal}>{stats.appointments}</div>
              <div style={styles.statLabel}>Appointments Booked</div>
            </div>
          </div>
        </div>

        {/* Workspace Layout */}
        <div style={styles.workspace}>
          {/* Left Panel - Quick Actions */}
          <div style={styles.actionsPanel}>
            <div className="glass-card" style={styles.panelCard}>
              <h3 style={styles.panelTitle}>Quick Actions</h3>
              <div style={styles.btnStack}>
                <Link to="/add-student" className="btn btn-primary" style={styles.actionBtn}>
                  <UserPlus size={16} /> Add Student
                </Link>
                <Link to="/add-teacher" className="btn btn-secondary" style={styles.actionBtn}>
                  <UserPlus size={16} /> Add Teacher
                </Link>
              </div>
            </div>

            <div className="glass-card" style={{ ...styles.panelCard, marginTop: '20px' }}>
              <h3 style={styles.panelTitle}>System Alerts</h3>
              <ul style={styles.alertList}>
                <li style={styles.alertItem}>
                  <Bell size={14} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '3px' }} />
                  <span>Verified database connection successful.</span>
                </li>
                <li style={styles.alertItem}>
                  <Bell size={14} style={{ color: 'var(--success)', flexShrink: 0, marginTop: '3px' }} />
                  <span>{stats.appointments} total scheduling sessions logged.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Panel - Tabbed Data Lists */}
          <div style={styles.dataPanel}>
            <div className="glass-card" style={styles.tabsCard}>
              {/* Tab Navigation */}
              <div className="tab-headers">
                <button 
                  onClick={() => setActiveTab('students')} 
                  className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}
                >
                  <Users size={16} /> Students Directory
                </button>
                <button 
                  onClick={() => setActiveTab('appointments')} 
                  className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
                >
                  <Calendar size={16} /> Appointments
                </button>
                <button 
                  onClick={() => setActiveTab('teachers')} 
                  className={`tab-btn ${activeTab === 'teachers' ? 'active' : ''}`}
                >
                  <BookOpen size={16} /> Teachers Directory
                </button>
              </div>

              {/* Tab Content */}
              <div style={styles.tabContent}>
                {activeTab === 'students' && (
                  <div>
                    {/* Student Search Form */}
                    <form onSubmit={handleSearch} style={styles.searchBar}>
                      <div style={styles.searchInputWrapper}>
                        <Search size={18} style={styles.searchIcon} />
                        <input
                          type="text"
                          placeholder="Search student by first or last name..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          style={styles.searchInput}
                        />
                      </div>
                      <button type="submit" disabled={loading} className="btn btn-primary">
                        {loading ? 'Searching...' : 'Search'}
                      </button>
                    </form>

                    {/* Students Table */}
                    {studentsList.length > 0 ? (
                      <div className="table-wrapper">
                        <table>
                          <thead>
                            <tr>
                              <th>Roll No</th>
                              <th>Class</th>
                              <th>Name</th>
                              <th>Blood Group</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {studentsList.map((std) => (
                              <tr key={std.student_id}>
                                <td>{std.rollno}</td>
                                <td>{std.class}</td>
                                <td>{`${std.Fname} ${std.Mname || ''} ${std.Lname}`}</td>
                                <td>{std.blood}</td>
                                <td>
                                  <button onClick={() => setSelectedStudent(std)} style={styles.viewBtn} title="View Details">
                                    <Eye size={16} />
                                    <span>Details</span>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div style={styles.emptyState}>No student records found.</div>
                    )}
                  </div>
                )}

                {activeTab === 'appointments' && (
                  <div>
                    <h3 style={styles.tabTitle}>Recent Booked Appointments</h3>
                    {appointmentsList.length > 0 ? (
                      <div className="table-wrapper">
                        <table>
                          <thead>
                            <tr>
                              <th>Student Name</th>
                              <th>Class</th>
                              <th>Guardian Name</th>
                              <th>Contact Phone</th>
                              <th>Booking Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {appointmentsList.map((appt) => {
                              const dt = new Date(appt.created_at);
                              return (
                                <tr key={appt.id}>
                                  <td><strong>{appt.SName}</strong></td>
                                  <td>Class {appt.Class}</td>
                                  <td>{appt.GName}</td>
                                  <td>{appt.number}</td>
                                  <td>{dt.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div style={styles.emptyState}>No appointments found.</div>
                    )}
                  </div>
                )}

                {activeTab === 'teachers' && (
                  <div>
                    <h3 style={styles.tabTitle}>Teacher Directory</h3>
                    {teachersList.length > 0 ? (
                      <div className="table-wrapper">
                        <table>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Assigned Class</th>
                              <th>Phone Number</th>
                              <th>Qualification</th>
                            </tr>
                          </thead>
                          <tbody>
                            {teachersList.map((teacher) => (
                              <tr key={teacher.id}>
                                <td><strong>{teacher.Name || `${teacher.Fname} ${teacher.Lname}`}</strong></td>
                                <td>{teacher.classAssign ? `Class ${teacher.classAssign}` : 'N/A'}</td>
                                <td>{teacher.Phone}</td>
                                <td>{teacher.qualification || 'N/A'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div style={styles.emptyState}>No teacher records found.</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Details Popup Modal */}
      {selectedStudent && (
        <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3>Student Registry Details</h3>
              <button onClick={() => setSelectedStudent(null)} style={styles.closeModalBtn} aria-label="Close modal">
                <X size={20} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.detailsSection}>
                <h4>Personal Information</h4>
                <div style={styles.detailsGrid}>
                  <div><strong>Full Name:</strong> {`${selectedStudent.Fname} ${selectedStudent.Mname || ''} ${selectedStudent.Lname}`}</div>
                  <div><strong>Class:</strong> {selectedStudent.class}</div>
                  <div><strong>Roll Number:</strong> {selectedStudent.rollno}</div>
                  <div><strong>Blood Group:</strong> {selectedStudent.blood}</div>
                  <div><strong>Date of Birth:</strong> {selectedStudent.DOB}</div>
                  <div><strong>Caste:</strong> {selectedStudent.caste || 'N/A'}</div>
                </div>
              </div>

              <div style={{ ...styles.detailsSection, marginTop: '20px' }}>
                <h4>Parent & Contact Details</h4>
                <div style={styles.detailsGrid}>
                  <div><strong>Father's Name:</strong> {selectedStudent.Ftname || 'N/A'}</div>
                  <div><strong>Father's Contact:</strong> {selectedStudent.Fcontact || 'N/A'}</div>
                  <div><strong>Mother's Name:</strong> {selectedStudent.Mtname || 'N/A'}</div>
                  <div><strong>Mother's Contact:</strong> {selectedStudent.Mcontact || 'N/A'}</div>
                  {selectedStudent.Gurdian && (
                    <>
                      <div><strong>Guardian Name:</strong> {selectedStudent.Gurdian}</div>
                      <div><strong>Guardian Contact:</strong> {selectedStudent.Gcontact || 'N/A'}</div>
                    </>
                  )}
                </div>
              </div>

              <div style={{ ...styles.detailsSection, marginTop: '20px' }}>
                <h4>Address Information</h4>
                <p>
                  {selectedStudent.address}, {selectedStudent.POaddress && `P.O: ${selectedStudent.POaddress}, `} 
                  PIN: {selectedStudent.pin}, {selectedStudent.Dist} District, {selectedStudent.State} State.
                </p>
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button onClick={() => setSelectedStudent(null)} className="btn btn-primary">Close Details</button>
            </div>
          </div>
        </div>
      )}

      <Toast 
        message={toastMessage} 
        type={toastType} 
        onClose={() => setToastMessage('')} 
      />
    </section>
  );
}

const styles = {
  section: {
    background: 'var(--bg-app)',
    minHeight: 'calc(100vh - 70px)',
    transition: 'background-color var(--transition-normal)'
  },
  welcomeBanner: {
    padding: '30px 40px',
    background: 'linear-gradient(135deg, var(--bg-surface) 0%, hsla(var(--hue), 85%, 57%, 0.03) 100%)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '32px'
  },
  welcomeTitle: {
    fontSize: '2rem',
    fontWeight: '850',
    color: 'var(--text-primary)',
    marginBottom: '8px'
  },
  welcomeText: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    maxWidth: '750px'
  },
  badge: {
    background: 'var(--primary)',
    color: 'white',
    padding: '6px 14px',
    borderRadius: '20px',
    fontWeight: '700',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  statsGrid: {
    marginBottom: '32px'
  },
  statCard: {
    padding: '24px',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  statIconBox: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    background: 'hsla(35, 90%, 52%, 0.1)',
    color: 'var(--warning)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  statVal: {
    fontSize: '2rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    lineHeight: '1.1'
  },
  statLabel: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    fontWeight: '600'
  },
  workspace: {
    display: 'flex',
    gap: '30px',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  actionsPanel: {
    width: '280px',
    flexShrink: 0,
    minWidth: '240px'
  },
  panelCard: {
    padding: '24px',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)'
  },
  panelTitle: {
    fontSize: '1.1rem',
    fontWeight: '750',
    marginBottom: '18px',
    color: 'var(--text-primary)'
  },
  btnStack: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  actionBtn: {
    width: '100%',
    padding: '10px 16px',
    fontSize: '0.9rem'
  },
  alertList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  alertItem: {
    display: 'flex',
    gap: '10px',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.4'
  },
  dataPanel: {
    flex: 1,
    width: '100%'
  },
  tabsCard: {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden'
  },
  tabHeaders: {
    display: 'flex',
    borderBottom: '1px solid var(--border)',
    background: 'var(--bg-app)',
    overflowX: 'auto'
  },
  tabHeaderBtn: {
    background: 'transparent',
    border: 'none',
    borderBottom: '3px solid transparent',
    padding: '16px 24px',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all var(--transition-fast)',
    whiteSpace: 'nowrap'
  },
  tabContent: {
    padding: '24px'
  },
  tabTitle: {
    fontSize: '1.25rem',
    fontWeight: '750',
    marginBottom: '18px',
    color: 'var(--text-primary)'
  },
  searchBar: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    flexWrap: 'wrap'
  },
  searchInputWrapper: {
    position: 'relative',
    flex: 1,
    minWidth: '240px'
  },
  searchIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-muted)'
  },
  searchInput: {
    width: '100%',
    padding: '10px 16px 10px 42px',
    borderRadius: 'var(--radius-sm)',
    border: '2px solid var(--border)',
    background: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    transition: 'all var(--transition-fast)',
    outline: 'none',
    ':focus': {
      borderColor: 'var(--primary)'
    }
  },
  viewBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: 'var(--primary-glow)',
    border: '1px solid hsla(var(--hue), 85%, 57%, 0.15)',
    color: 'var(--primary)',
    padding: '6px 12px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 0',
    color: 'var(--text-secondary)',
    fontSize: '0.95rem'
  },
  // Modal Detailed View
  modalContent: {
    maxWidth: '650px'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid var(--border)'
  },
  closeModalBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-secondary)'
  },
  modalBody: {
    padding: '24px',
    maxHeight: '70vh',
    overflowY: 'auto'
  },
  detailsSection: {
    borderBottom: '1px solid var(--border)',
    paddingBottom: '20px'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '14px',
    marginTop: '12px',
    fontSize: '0.95rem',
    color: 'var(--text-secondary)'
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '16px 24px',
    borderTop: '1px solid var(--border)',
    background: 'var(--bg-app)'
  }
};
