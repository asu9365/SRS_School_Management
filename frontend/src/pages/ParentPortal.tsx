import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../lib/authStore';
import { getNotices, getHomework, bookAppointment } from '../lib/api';
import api from '../lib/api';
import { TrendingUp, Bell, CheckCircle, Clock, LogOut, MessageSquare, Calendar as CalendarIcon, Users, Check, BookOpen } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Analytics from '../components/Analytics';
import AIAcademicCoach from '../modules/ai/AIAcademicCoach';
import NotificationBell from '../modules/communication/NotificationBell';

export default function ParentPortal() {
  const { user, logout } = useAuthStore();
  const [notices, setNotices] = useState([]);
  const [homework, setHomework] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // PTM State
  const [teachers, setTeachers] = useState<any[]>([]);
  const [ptmForm, setPtmForm] = useState({ teacher_id: '', appointment_date: '', reason: '' });
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'booking' | 'success' | 'error'>('idle');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    Promise.all([getNotices(), getHomework(), api.get('/teachers')])
      .then(([nData, hData, tData]) => {
        setNotices(nData);
        setHomework(hData);
        if (tData.data?.success) setTeachers(tData.data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleBookPTM = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingStatus('booking');
    try {
      // Backend expects parent_id, teacher_id, appointment_date, status, reason
      await bookAppointment({
        parent_id: user?.id,
        teacher_id: ptmForm.teacher_id,
        appointment_date: ptmForm.appointment_date,
        reason: ptmForm.reason,
        status: 'Pending'
      });
      setBookingStatus('success');
      setPtmForm({ teacher_id: '', appointment_date: '', reason: '' });
      setTimeout(() => setBookingStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setBookingStatus('error');
      setTimeout(() => setBookingStatus('idle'), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      
      {/* Topbar */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 md:px-6 py-3 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/vite.svg" alt="Logo" className="w-8 h-8 object-contain" />
          <div className="flex flex-col">
            <span className="text-slate-800 dark:text-white text-lg font-extrabold tracking-tight leading-none group-hover:text-orange-500 transition-colors">St. Robert's</span>
            <span className="text-orange-500 text-[0.6rem] font-bold tracking-[0.2em] uppercase mt-0.5">Parent Portal</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-sm font-semibold text-slate-600 dark:text-slate-300">
            {user?.name}
          </div>
          <Link to="/messages" className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <MessageSquare size={20} className="dark:text-slate-300" />
          </Link>
          <Link to="/meeting-history" className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors" title="Meeting History">
            <CalendarIcon size={20} className="dark:text-slate-300" />
          </Link>
          <NotificationBell />
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-sm rounded-lg hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">LOGOUT</span>
          </button>
        </div>
      </div>

      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6 animate-fade-in-up">
        
        {/* Parent Header */}
        <div className="glass-panel p-6 flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
              Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">{user?.name}</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Monitor your child's academic progress and stay updated.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <div className="text-center px-4 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Attendance</div>
              <div className="text-xl font-black text-emerald-500">94%</div>
            </div>
            <div className="text-center px-4 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Grade</div>
              <div className="text-xl font-black text-emerald-500">A-</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Homework Monitoring */}
          <section className="glass-card p-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-teal-100 dark:bg-teal-900/50 rounded-lg text-teal-600 dark:text-teal-400">
                <TrendingUp size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Homework Tracking</h2>
            </div>
            <div className="space-y-4">
              {homework.map((hw: any, idx: number) => (
                <div key={hw.id} className="flex items-start justify-between p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 hover-lift">
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 ${idx === 0 ? 'text-amber-500' : 'text-emerald-500'}`}>
                      {idx === 0 ? <Clock size={20} /> : <CheckCircle size={20} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-200">{hw.title} <span className="text-xs text-slate-500 ml-2 font-normal">({hw.subject})</span></h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{hw.description}</p>
                    </div>
                  </div>
                  <div className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-md whitespace-nowrap">
                    Due {new Date(hw.due_date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* School Notices */}
          <section className="glass-card p-5">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
                <Bell size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Official Notices</h2>
            </div>
            <div className="grid gap-4">
              {notices.map((notice: any) => (
                <div key={notice.id} className="p-5 bg-gradient-to-r from-indigo-50 to-white dark:from-slate-800 dark:to-slate-800/50 rounded-xl border border-indigo-100 dark:border-slate-700 shadow-sm hover-lift">
                  <h3 className="font-bold text-lg text-indigo-900 dark:text-indigo-300 mb-2">{notice.title}</h3>
                  <p className="text-slate-700 dark:text-slate-300">{notice.content}</p>
                  <div className="mt-3 text-sm text-indigo-500 dark:text-indigo-400 font-semibold">
                    Published: {new Date(notice.publish_date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Phase 3: PTM Booking Section */}
        <section className="glass-card p-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-rose-100 dark:bg-rose-900/50 rounded-lg text-rose-600 dark:text-rose-400">
              <CalendarIcon size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Schedule Parent-Teacher Meeting</h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
                Request a dedicated time to discuss your child's academic performance, behavioral growth, or any concerns directly with their teachers. Meetings are subject to approval.
              </p>
              <form onSubmit={handleBookPTM} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wide">Select Teacher</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Users size={16} className="text-slate-400" />
                      </div>
                      <select 
                        value={ptmForm.teacher_id}
                        onChange={(e) => setPtmForm({...ptmForm, teacher_id: e.target.value})}
                        className="w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-slate-800 dark:text-white outline-none"
                        required
                      >
                        <option value="" disabled>Choose a teacher...</option>
                        {teachers.map(t => (
                          <option key={t.id || t.teacher_id} value={t.id || t.teacher_id}>
                            {t.Fname} {t.Lname} {t.Department ? `(${t.Department})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wide">Proposed Date & Time</label>
                    <input 
                      type="datetime-local" 
                      value={ptmForm.appointment_date}
                      onChange={(e) => setPtmForm({...ptmForm, appointment_date: e.target.value})}
                      className="w-full px-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-slate-800 dark:text-white outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wide">Reason for Meeting</label>
                  <textarea 
                    value={ptmForm.reason}
                    onChange={(e) => setPtmForm({...ptmForm, reason: e.target.value})}
                    placeholder="Briefly describe what you'd like to discuss..."
                    className="w-full px-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 bg-white dark:bg-slate-800 dark:text-white outline-none resize-none"
                    rows={3}
                    required
                  />
                </div>
                
                <div className="flex items-center gap-4 pt-2">
                  <button 
                    type="submit" 
                    disabled={bookingStatus === 'booking' || bookingStatus === 'success'}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm flex items-center gap-2
                      ${bookingStatus === 'success' ? 'bg-emerald-500 text-white' : 
                        bookingStatus === 'booking' ? 'bg-slate-200 text-slate-500 cursor-not-allowed' : 
                        'bg-slate-800 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-900 dark:hover:bg-slate-100'}`}
                  >
                    {bookingStatus === 'success' ? <><Check size={16} /> Request Sent!</> : 
                     bookingStatus === 'booking' ? 'Submitting...' : 
                     'Request Meeting'}
                  </button>
                  {bookingStatus === 'error' && (
                    <span className="text-sm font-bold text-rose-500">Failed to submit request. Please try again.</span>
                  )}
                </div>
              </form>
            </div>
            
            <div className="hidden md:flex flex-col gap-3 w-64">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                <h4 className="font-bold text-emerald-800 dark:text-emerald-400 text-sm mb-1">Approval Required</h4>
                <p className="text-xs text-emerald-600 dark:text-emerald-500 leading-relaxed">
                  Teachers will review your request and confirm the meeting time. You'll receive a notification here once approved.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 2: Analytics Integration */}
        {user?.id && <Analytics userId={user.id} />}

      </div>
      
      {user && (
        <AIAcademicCoach studentId={user.id} />
      )}
    </div>
  );
}
