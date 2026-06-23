import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Navbar({ auth, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const handleLogout = () => { onLogout(); navigate('/'); };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/about', label: 'ABOUT' },
    { to: '/gallery', label: 'GALLERY' },
    { to: '/staff', label: 'STAFF' },
    { to: '/office-hours', label: 'OFFICE HOURS' },
  ];

  return (
    <>
      {/* ─── TOP UTILITY BAR ─── */}
      <div style={s.topBar}>
        <div className="container" style={s.topBarInner}>
          <div style={s.topSocial}>
            <a href="https://www.facebook.com/SaintRobertsHighSchool/" target="_blank" rel="noopener noreferrer" style={s.topSocialLink}><Facebook size={12} /></a>
            <a href="#" style={s.topSocialLink}><Twitter size={12} /></a>
            <a href="#" style={s.topSocialLink}><Instagram size={12} /></a>
            <a href="#" style={s.topSocialLink}><Youtube size={12} /></a>
          </div>
          <span style={s.topInfo}>Est. 1998 | Jakhalabandha, Nagaon, Assam</span>
        </div>
      </div>

      {/* ─── MAIN NAVIGATION ─── */}
      <nav style={{ ...s.nav, ...(scrolled ? s.navScrolled : {}) }}>
        <div className="container" style={s.navInner}>
          {/* Logo */}
          <Link to="/" style={s.logo}>
            <img src="/images/Srhs logo.png" alt="SRS Logo" style={s.logoImg} />
            <div>
              <div style={s.logoText}>St. Robert's</div>
              <div style={s.logoSubText}>School</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div style={s.desktopNav} className="desktop-nav">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  ...s.navLink,
                  ...(isActive(link.to) ? s.navLinkActive : {})
                }}
              >
                {link.label}
              </Link>
            ))}

            {auth ? (
              <>
                <Link to="/dashboard" style={s.navLink}>
                  DASHBOARD ({auth.role.toUpperCase()})
                </Link>
                <button onClick={handleLogout} style={s.logoutBtn} title="Logout">
                  LOGOUT
                </button>
              </>
            ) : (
              <Link to="/login" style={s.navLink}>
                LOGIN
              </Link>
            )}
          </div>

          {/* Mobile */}
          <div style={s.mobileRow} className="mobile-toggle">
            <button onClick={() => setIsOpen(!isOpen)} style={s.hamburger}>
              {isOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div style={s.mobileDrawer}>
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} style={{ ...s.mobileLink, ...(isActive(link.to) ? s.mobileLinkActive : {}) }}>
                {link.label}
              </Link>
            ))}
            <div style={s.mobileDivider} />
            {auth ? (
              <>
                <Link to="/dashboard" style={s.mobileLink}>DASHBOARD</Link>
                <button onClick={handleLogout} style={s.mobileLogoutBtn}>LOGOUT</button>
              </>
            ) : (
              <Link to="/login" style={s.mobileLink}>LOGIN</Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

const s = {
  /* ── Top Bar ── */
  topBar: {
    background: '#04091e',
    padding: '8px 0',
    fontSize: '0.7rem',
    color: '#ffffff',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  topBarInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
  },
  topSocial: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  topSocialLink: {
    color: '#ffffff',
    transition: 'opacity 0.2s',
    display: 'flex',
    opacity: 0.7,
  },
  topInfo: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.7rem',
    letterSpacing: '0.03em',
  },

  /* ── Main Nav ── */
  nav: {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: 'linear-gradient(180deg, rgba(4, 9, 30, 0.98) 0%, rgba(4, 9, 30, 0.95) 100%)',
    borderBottom: '1px solid rgba(240, 127, 52, 0.2)',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },
  navScrolled: {
    background: 'linear-gradient(180deg, rgba(4, 9, 30, 0.99) 0%, rgba(4, 9, 30, 0.98) 100%)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },
  navInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '72px',
    paddingTop: '0',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
  },
  logoImg: {
    width: '36px',
    height: '36px',
    filter: 'brightness(0) invert(1)',
    objectFit: 'contain'
  },
  logoText: {
    color: '#ffffff',
    fontSize: '1.15rem',
    fontWeight: '700',
    letterSpacing: '0px',
    fontFamily: 'var(--font-title)',
    lineHeight: '1.1',
  },
  logoSubText: {
    color: 'rgba(240, 127, 52, 0.9)',
    fontSize: '0.65rem',
    fontWeight: '600',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    fontFamily: 'var(--font-title)',
  },
  desktopNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
  },
  navLink: {
    color: '#ffffff',
    fontSize: '0.7rem',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.2s',
    padding: '10px 14px',
    borderRadius: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  navLinkActive: {
    color: '#f07f34',
    background: 'rgba(240, 127, 52, 0.1)',
  },
  logoutBtn: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: '0.7rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'color 0.3s',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    padding: '10px 14px',
  },
  mobileRow: {
    display: 'none',
  },
  hamburger: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  mobileDrawer: {
    background: 'linear-gradient(180deg, rgba(4, 9, 30, 0.95) 0%, rgba(4, 9, 30, 0.9) 100%)',
    padding: '16px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    borderTop: '1px solid rgba(240, 127, 52, 0.2)',
  },
  mobileLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: '500',
    padding: '12px 20px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  mobileLinkActive: {
    color: '#f07f34',
    background: 'rgba(240, 127, 52, 0.08)',
  },
  mobileDivider: {
    height: '1px',
    background: 'rgba(240, 127, 52, 0.15)',
    margin: '8px 0',
  },
  mobileLogoutBtn: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
    textAlign: 'left',
    padding: '12px 20px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  }
};
