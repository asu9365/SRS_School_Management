import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Users, GraduationCap, DollarSign, Truck, BookOpen, Home, Package, ShoppingCart, GitBranch, FileText, Clock, LogOut, Menu, X, Bell, UserCheck, Calendar, ClipboardList, BarChart3, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../lib/authStore';
import NotificationBell from '../modules/communication/NotificationBell';

interface AdminLayoutProps {
  children: React.ReactNode;
  auth: any;
  title?: string;
  subtitle?: string;
}

export default function AdminLayout({ children, auth, title = 'Admin Dashboard', subtitle = '' }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const currentPath = location.pathname;
  const currentTab = new URLSearchParams(location.search).get('tab') || 'dashboard';

  const handleLogout = () => { logout(); navigate('/login'); };

  const navGroups = [
    { label: 'Overview', items: [
      { id: 'dashboard',   label: 'Dashboard',       icon: BarChart3,     path: '/admin?tab=dashboard' },
      { id: 'workflow',    label: 'Workflow',        icon: GitBranch,     path: '/admin?tab=workflow' },
      { id: 'reports',     label: 'Reports',         icon: ClipboardList, path: '/admin?tab=reports' },
    ]},
    { label: 'People', items: [
      { id: 'students',    label: 'Students',        icon: Users,         path: '/admin?tab=students' },
      { id: 'staff',       label: 'Staff',           icon: UserCheck,     path: '/admin?tab=staff' },
      { id: 'teachers',    label: 'Teachers',        icon: GraduationCap, path: '/admin?tab=teachers' },
      { id: 'users',       label: 'Users & Identity', icon: Shield,        path: '/admin?tab=users' },
    ]},
    { label: 'Finance & Operations', items: [
      { id: 'admissions',  label: 'Admissions',      icon: ClipboardList, path: '/admin?tab=admissions' },
      { id: 'fees',        label: 'Fee Management',  icon: DollarSign,    path: '/admin?tab=fees' },
      { id: 'timetable',   label: 'Timetable',       icon: Calendar,      path: '/admin?tab=timetable' },
      { id: 'academics',   label: 'Academic Structure', icon: GraduationCap, path: '/admin?tab=academics' },
      { id: 'transport',   label: 'Transport',       icon: Truck,         path: '/admin?tab=transport' },
    ]},
    { label: 'Resources', items: [
      { id: 'library',     label: 'Library',         icon: BookOpen,      path: '/admin?tab=library' },
      { id: 'hostel',      label: 'Hostel',          icon: Home,          path: '/admin?tab=hostel' },
      { id: 'inventory',   label: 'Inventory',       icon: Package,       path: '/admin?tab=inventory' },
      { id: 'procurement', label: 'Procurement',     icon: ShoppingCart,  path: '/admin?tab=procurement' },
    ]},
    { label: 'Documents', items: [
      { id: 'documents',   label: 'Documents',       icon: FileText,      path: '/admin?tab=documents' },
    ]},
  ];

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Overlay */}
      {isSidebarOpen && <div className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden" onClick={() => setIsSidebarOpen(false)}/>}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-5 border-b border-slate-700/60">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-500 flex items-center justify-center font-bold text-white text-sm"><Shield size={16}/></div>
            <span className="font-bold text-lg tracking-tight text-white">Admin</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white"><X size={20}/></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {navGroups.map(group => (
            <div key={group.label}>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 px-2">{group.label}</div>
              <nav className="space-y-0.5">
                {group.items.map(item => {
                  const isActive = currentPath === '/admin' && currentTab === item.id;
                  return (
                    <Link key={item.id} to={item.path} onClick={() => setIsSidebarOpen(false)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${isActive ? 'bg-violet-600 text-white shadow-md shadow-violet-900/40' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}>
                      <item.icon size={16}/>{item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-700/60 space-y-1">
          <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg text-sm font-medium transition-colors">
            <GraduationCap size={16}/> Management
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg text-sm font-medium transition-colors">
            <LogOut size={16}/> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-4 lg:px-6 h-14 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg"><Menu size={20}/></button>
            <div>
              <h1 className="text-base font-bold text-slate-800">{title}</h1>
              {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <NotificationBell />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-violet-100 border border-violet-200 flex items-center justify-center"><span className="text-xs font-bold text-violet-700">{auth?.name?.[0]||'A'}</span></div>
              <div className="hidden sm:block"><div className="text-xs font-bold text-slate-800">{auth?.name||'Admin'}</div><div className="text-xs text-violet-500 font-semibold">Administrator</div></div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
