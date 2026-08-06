import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, Users, BarChart3,
  Target, LogOut, Menu, X, TrendingUp, Shield, Briefcase
} from "lucide-react";
import { useAuthStore } from "../lib/authStore";
import NotificationBell from "../modules/communication/NotificationBell";

interface PrincipalLayoutProps {
  children: React.ReactNode;
  auth: any;
  title?: string;
  subtitle?: string;
}

export default function PrincipalLayout({ children, auth, title = "Principal Workspace", subtitle }: PrincipalLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => { logout(); navigate("/login"); };

  const currentTab = new URLSearchParams(location.search).get("tab") || "overview";

  const navItems = [
    { id: "overview",  label: "Executive Overview",  icon: LayoutDashboard, color: "text-amber-400" },
    { id: "academic",  label: "Academic Governance", icon: BookOpen,         color: "text-blue-400" },
    { id: "students",  label: "Student Success",     icon: Users,            color: "text-emerald-400" },
    { id: "hr",        label: "HR & Staff",          icon: Briefcase,        color: "text-purple-400" },
    { id: "reports",   label: "BI & Reports",        icon: BarChart3,        color: "text-rose-400" },
    { id: "kpis",      label: "Executive KPIs",      icon: Target,           color: "text-cyan-400" },
  ];

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-slate-900">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "linear-gradient(180deg,#0f172a 0%,#1a1040 100%)", borderRight: "1px solid rgba(251,191,36,0.1)" }}
      >
        <div className="flex items-center justify-between h-20 px-6 flex-shrink-0" style={{ borderBottom: "1px solid rgba(251,191,36,0.15)" }}>
          <Link to="/principal" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-slate-900" style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>
              <Shield size={20} />
            </div>
            <div>
              <div className="font-bold text-white text-sm tracking-tight">Principal</div>
              <div className="text-amber-400 text-xs font-semibold">Workspace</div>
            </div>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white p-1"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest px-3 mb-3">Navigation</div>
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <Link key={item.id} to={`/principal?tab=${item.id}`} onClick={() => setIsSidebarOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${isActive ? "text-slate-900 shadow-lg" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
                style={isActive ? { background: "linear-gradient(135deg,#f59e0b,#d97706)" } : {}}>
                <item.icon size={18} className={isActive ? "text-slate-900" : item.color} />
                {item.label}
              </Link>
            );
          })}
          <div className="pt-4 pb-2"><div className="h-px bg-amber-400/10" /><div className="text-xs font-bold text-slate-500 uppercase tracking-widest px-3 mt-4 mb-3">Quick Access</div></div>
          <Link to="/dashboard" onClick={() => setIsSidebarOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
            <LayoutDashboard size={18} className="text-orange-400" /> Admin Dashboard
          </Link>
        </div>

        <div className="flex-shrink-0 p-4" style={{ borderTop: "1px solid rgba(251,191,36,0.15)" }}>
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-slate-900 text-sm" style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>
              {(auth?.name || "P").charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-semibold text-white truncate">{auth?.name || "Principal"}</div>
              <div className="text-xs text-amber-400 font-medium truncate">{auth?.roles?.[0]?.name || "Principal"}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-10 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"><Menu size={20} /></button>
            <div>
              <h1 className="text-lg font-bold text-slate-800">{title}</h1>
              {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "linear-gradient(135deg,#f59e0b20,#d9770620)", color: "#d97706", border: "1px solid #f59e0b40" }}>
              <TrendingUp size={12} /> Principal Mode
            </div>
            <NotificationBell />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
