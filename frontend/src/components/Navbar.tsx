import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Twitter, Instagram, Youtube, MessageSquare } from 'lucide-react';
import NotificationBell from '../modules/communication/NotificationBell';

export default function Navbar({ auth, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isPortal = location.pathname.startsWith('/student-portal') || 
                   location.pathname.startsWith('/parent-portal') ||
                   location.pathname.startsWith('/dashboard') ||
                   location.pathname.startsWith('/messages');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); setShowNotifications(false); }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (auth) {
      import('../lib/api').then(({ getNotifications }) => {
        getNotifications().then(res => setNotifications(res.data || [])).catch(() => {});
      });
    }
  }, [auth]);

  const handleMarkRead = async (id) => {
    try {
      const { markNotificationRead } = await import('../lib/api');
      await markNotificationRead(id);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (e) { console.error(e); }
  };

  const handleLogout = () => { onLogout(); navigate('/login'); };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/about', label: 'ABOUT' },
    { to: '/gallery', label: 'GALLERY' },
    { to: '/staff', label: 'STAFF' },
    { to: '/office-hours', label: 'OFFICE HOURS' },
  ];

  let portalLink = '/dashboard';
  let portalName = 'DASHBOARD';
  if (auth?.roles?.some((r: any) => r.name === 'Super Admin')) {
    portalLink = '/super-admin';
    portalName = 'SYSTEM ADMIN';
  } else if (auth?.roles?.some((r: any) => r.name === 'Student')) {
    portalLink = '/student-portal';
    portalName = 'STUDENT PORTAL';
  } else if (auth?.roles?.some((r: any) => r.name === 'Parent')) {
    portalLink = '/parent-portal';
    portalName = 'PARENT PORTAL';
  }

  return (
    <>
      {/* ─── TOP UTILITY BAR ─── */}
      <div className="bg-slate-950 py-2 border-b border-white/5 text-white text-xs">
        <div className="container flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <a href="https://www.facebook.com/SaintRobertsHighSchool/" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity"><Facebook size={12} /></a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity"><Twitter size={12} /></a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity"><Instagram size={12} /></a>
            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity"><Youtube size={12} /></a>
          </div>
          <span className="opacity-50 tracking-wide hidden sm:block">Est. 1998 | Jakhalabandha, Nagaon, Assam</span>
        </div>
      </div>

      {/* ─── MAIN NAVIGATION ─── */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-slate-900/95 backdrop-blur-md border-orange-500/20 shadow-lg shadow-black/20 py-2' : 'bg-slate-900/90 backdrop-blur-sm border-white/10 py-4'}`}>
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/vite.svg" alt="Vite Logo" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="text-white text-xl font-extrabold tracking-tight leading-none group-hover:text-orange-400 transition-colors">St. Robert's</span>
              <span className="text-orange-500 text-[0.65rem] font-bold tracking-[0.2em] uppercase mt-0.5">School</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-xs font-bold px-4 py-2 rounded-md uppercase tracking-wider transition-all duration-200 ${isActive(link.to) ? 'text-orange-500 bg-orange-500/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
              >
                {link.label}
              </Link>
            ))}

            {auth ? (
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-white/10 relative">
                
                {/* Messages Link */}
                <Link to="/messages" className="p-2 text-slate-300 hover:text-white transition-colors relative" title="Messages">
                  <MessageSquare size={20} />
                </Link>

                {/* Notifications Bell */}
                <div className="hidden md:block">
                  <NotificationBell />
                </div>

                <Link to={portalLink} className="text-xs font-bold px-4 py-2 rounded-md uppercase tracking-wider text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 transition-colors ml-2">
                  {portalName}
                </Link>
                <button onClick={handleLogout} className="text-xs font-bold px-4 py-2 rounded-md uppercase tracking-wider text-rose-400 bg-rose-400/10 hover:bg-rose-400/20 transition-colors" title="Logout">
                  LOGOUT
                </button>
              </div>
            ) : (
              <div className="ml-4 pl-4 border-l border-white/10">
                <Link to="/login" className="text-xs font-bold px-6 py-2 rounded-md uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 to-rose-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300">
                  LOGIN
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-300 hover:text-white transition-colors">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-orange-500/20 shadow-2xl transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}`}>
          <div className="flex flex-col container gap-2">
            {navLinks.map(link => (
              <Link 
                key={link.to} 
                to={link.to} 
                className={`text-sm font-bold p-3 rounded-lg uppercase tracking-wider transition-colors ${isActive(link.to) ? 'text-orange-500 bg-orange-500/10' : 'text-slate-300 hover:bg-white/5'}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2" />
            {auth ? (
              <>
                <Link to={portalLink} className="text-sm font-bold p-3 rounded-lg uppercase tracking-wider text-emerald-400 bg-emerald-400/10">{portalName}</Link>
                <button onClick={handleLogout} className="text-sm font-bold p-3 rounded-lg uppercase tracking-wider text-rose-400 bg-rose-400/10 text-left">LOGOUT</button>
              </>
            ) : (
              <Link to="/login" className="text-sm font-bold p-3 rounded-lg uppercase tracking-wider text-center text-white bg-gradient-to-r from-orange-500 to-rose-500 mt-2">LOGIN</Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
