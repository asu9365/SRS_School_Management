import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, ClipboardCheck, GraduationCap, Calendar, BookOpen, UserPlus, LogOut, Menu, X, Bell, MessageSquare, Megaphone, CheckSquare, DollarSign, Home, Package, ShoppingCart, GitBranch, FileText, ShieldCheck, Bus } from 'lucide-react';
import { useAuthStore } from '../lib/authStore';
import NotificationBell from '../modules/communication/NotificationBell';

interface ManagementLayoutProps {
  children: React.ReactNode;
  auth: any;
  title?: string;
}

export default function ManagementLayout({ children, auth, title = 'Dashboard Overview' }: ManagementLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const currentPath = location.pathname;
  const currentTab = new URLSearchParams(location.search).get('tab') || 'students';

  const isDashboard = currentPath === '/dashboard';

  const navItems = [
    { id: 'students',    label: 'Directory',    icon: Users,         path: '/dashboard?tab=students' },
    { id: 'notices',     label: 'Notices',      icon: Megaphone,     path: '/dashboard?tab=notices' },
    { id: 'updates',     label: 'Updates',      icon: Bell,          path: '/dashboard?tab=updates' },
    { id: 'homework',    label: 'Homework',     icon: CheckSquare,   path: '/dashboard?tab=homework' },
    { id: 'attendance',  label: 'Attendance',   icon: ClipboardCheck,path: '/dashboard?tab=attendance' },
    { id: 'marks',       label: 'Marks',        icon: GraduationCap, path: '/dashboard?tab=marks' },
    { id: 'appointments',label: 'Appointments', icon: Calendar,      path: '/dashboard?tab=appointments' },
    { id: 'teachers',    label: 'Teachers',     icon: BookOpen,      path: '/dashboard?tab=teachers' },
    { id: 'messages',    label: 'Messages',     icon: MessageSquare, path: '/messages' },
  ];

  const adminItems = [
    { id: 'admissions',  label: 'Admissions',   icon: ShieldCheck,   path: '/dashboard?tab=admissions' },
    { id: 'fees',        label: 'Fee Mgmt',     icon: DollarSign,    path: '/dashboard?tab=fees' },
    { id: 'transport',   label: 'Transport',    icon: Bus,           path: '/dashboard?tab=transport' },
    { id: 'library',     label: 'Library',      icon: BookOpen,      path: '/dashboard?tab=library' },
    { id: 'hostel',      label: 'Hostel',       icon: Home,          path: '/dashboard?tab=hostel' },
    { id: 'inventory',   label: 'Inventory',    icon: Package,       path: '/dashboard?tab=inventory' },
    { id: 'procurement', label: 'Procurement',  icon: ShoppingCart,  path: '/dashboard?tab=procurement' },
    { id: 'documents',   label: 'Documents',    icon: FileText,      path: '/dashboard?tab=documents' },
    { id: 'workflow',    label: 'Workflow',     icon: GitBranch,     path: '/dashboard?tab=workflow' },
  ];

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800 flex-shrink-0">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-white">SR</div>
            <span className="font-bold text-lg tracking-tight text-white">Management</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Navigation</div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = isDashboard && currentTab === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${isActive ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 mt-8 px-2">Administration</div>
          <nav className="space-y-1">
            {adminItems.map((item) => {
              const isActive = isDashboard && currentTab === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${isActive ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 mt-8 px-2">Quick Actions</div>
          <nav className="space-y-1">
            <Link 
              to="/add-student" 
              onClick={() => setIsSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${currentPath === '/add-student' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <UserPlus size={18} /> Add Student
            </Link>
            <Link 
              to="/add-teacher" 
              onClick={() => setIsSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${currentPath === '/add-teacher' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <UserPlus size={18} /> Add Teacher
            </Link>
            <Link 
              to="/principal" 
              onClick={() => setIsSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${currentPath === '/principal' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <GraduationCap size={18} /> Principal Workspace
            </Link>
            <Link 
              to="/admin" 
              onClick={() => setIsSidebarOpen(false)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${currentPath === '/admin' ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
            >
              <ShieldCheck size={18} /> Admin Workspace
            </Link>
          </nav>
        </div>
        
        <div className="flex-shrink-0 p-4 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-300 uppercase">
              {(auth?.name || auth?.username || 'U').charAt(0)}
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-semibold text-white truncate">{auth?.name || auth?.username}</div>
              <div className="text-xs text-emerald-400 font-medium truncate">{auth?.roles?.[0]?.name || auth?.role || 'Admin'}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-300 rounded-lg transition-colors text-sm font-bold">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-10 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
              <Menu size={20} />
            </button>
            <h1 className="text-xl font-bold text-slate-800 hidden sm:block">{title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <NotificationBell />
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}
