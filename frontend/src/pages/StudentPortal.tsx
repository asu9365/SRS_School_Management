import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../lib/authStore';
import { getNotices, getUpdates, getHomework } from '../lib/api';
import { BookOpen, Bell, Calendar, ChevronRight, LogOut, MessageSquare } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Analytics from '../components/Analytics';
import NotificationBell from '../modules/communication/NotificationBell';

export default function StudentPortal() {
  const { user, logout } = useAuthStore();
  const [notices, setNotices] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [homework, setHomework] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    Promise.all([getNotices(), getUpdates(), getHomework()])
      .then(([nData, uData, hData]) => {
        setNotices(nData);
        setUpdates(uData);
        setHomework(hData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
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
            <span className="text-orange-500 text-[0.6rem] font-bold tracking-[0.2em] uppercase mt-0.5">Student Portal</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-sm font-semibold text-slate-600 dark:text-slate-300">
            {user?.name}
          </div>
          <Link to="/messages" className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <MessageSquare size={20} className="dark:text-slate-300" />
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
        
        {/* Header Section */}
        <div className="glass-panel p-6 flex justify-between items-center bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
              Welcome back, <span className="premium-gradient-text">{user?.name}</span>!
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Here is your academic overview for today.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Class</div>
            <div className="text-xl font-bold text-slate-800 dark:text-white">10-A</div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Homework Section */}
            <section className="glass-card p-5">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-3 text-slate-800 dark:text-white">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg text-orange-600 dark:text-orange-400">
                    <BookOpen size={24} />
                  </div>
                  Pending Homework
                </h2>
                <button className="text-orange-600 dark:text-orange-400 font-medium flex items-center hover:underline">
                  View All <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="grid gap-4">
                {homework.length === 0 ? (
                  <p className="text-slate-500 italic">No pending homework. Great job!</p>
                ) : (
                  homework.map((hw: any) => (
                    <div key={hw.id} className="p-4 border border-slate-200 dark:border-slate-700/50 rounded-xl hover-lift bg-white/50 dark:bg-slate-800/50">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-orange-500 mb-1 block">
                            {hw.subject}
                          </span>
                          <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-200">{hw.title}</h3>
                          <p className="text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{hw.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300">
                            Due {new Date(hw.due_date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Class Updates */}
            <section className="glass-card p-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400">
                  <Calendar size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Class Updates</h2>
              </div>
              <div className="space-y-4">
                {updates.map((update: any) => (
                  <div key={update.id} className="pl-4 border-l-4 border-blue-500 relative">
                    <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-slate-50 dark:bg-slate-900 border-4 border-blue-500"></div>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">{update.content}</p>
                    <span className="text-xs text-slate-500 mt-1 block">
                      {new Date(update.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Phase 2: Analytics Integration */}
            {user?.id && <Analytics userId={user.id} />}

          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Notices Sidebar */}
            <section className="glass-card p-5 bg-gradient-to-b from-rose-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/80 border-rose-100 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-rose-500 text-white rounded-lg shadow-lg shadow-rose-500/30">
                  <Bell size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">School Notices</h2>
              </div>
              <div className="space-y-4">
                {notices.map((notice: any) => (
                  <div key={notice.id} className="bg-white dark:bg-slate-900/50 p-4 rounded-xl shadow-sm hover-lift">
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 leading-tight mb-2">
                      {notice.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                      {notice.content}
                    </p>
                    <div className="mt-3 text-xs font-semibold text-rose-500">
                      {new Date(notice.publish_date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
