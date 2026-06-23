import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer" style={styles.footer}>
      <div className="container footer-grid">
        {/* Left Column */}
        <div style={styles.column}>
          <h4 style={styles.heading}>St. Robert's School</h4>
          <div style={styles.contactItem}>
            <MapPin size={18} style={styles.icon} />
            <address style={styles.address}>
              Jakhalabandha, Rongaloo,<br />
              Kaliabor Block, Nagaon District,<br />
              Assam — 782136
            </address>
          </div>
          <div style={styles.contactItem}>
            <Mail size={18} style={styles.icon} />
            <a href="mailto:strobertschool@gmail.com" style={styles.link}>strobertschool@gmail.com</a>
          </div>
          <div style={styles.contactItem}>
            <Phone size={18} style={styles.icon} />
            <span style={styles.text}>+91 82364 86349</span>
          </div>
        </div>

        {/* Center Column */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Connect With Us</h4>
          <ul style={styles.socialList}>
            <li style={styles.socialItem}>
              <Facebook size={18} style={styles.socialIcon} />
              <a href="https://www.facebook.com/SaintRobertsHighSchool/" target="_blank" rel="noopener noreferrer" style={styles.link}>Facebook</a>
            </li>
            <li style={styles.socialItem}>
              <Twitter size={18} style={styles.socialIcon} />
              <a href="#" style={styles.link}>Twitter</a>
            </li>
            <li style={styles.socialItem}>
              <Instagram size={18} style={styles.socialIcon} />
              <a href="#" style={styles.link}>Instagram</a>
            </li>
            <li style={styles.socialItem}>
              <Youtube size={18} style={styles.socialIcon} />
              <a href="#" style={styles.link}>YouTube</a>
            </li>
          </ul>
        </div>

        {/* Right Column */}
        <div style={styles.column}>
          <h4 style={styles.heading}>About This Project</h4>
          <p style={styles.aboutText}>
            BCA Final Year Project<br />
            <strong>Ashish Aind</strong><br />
            Roll: UT-201-300-0004
          </p>
          <div style={styles.bar}></div>
          <p style={styles.smallText}>
            St. Robert's School, est. 1998 — Providing quality English-medium education 
            for Grades 1 to 10 in the heart of Jakhalabandha.
          </p>
        </div>
      </div>

      <div style={styles.bottomBar}>
        <div className="container" style={styles.bottomText}>
          &copy; {new Date().getFullYear()} St. Robert's School, Jakhalabandha | All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: 'var(--bg-surface)',
    borderTop: '1px solid var(--border)',
    paddingTop: '60px',
    color: 'var(--text-primary)',
    transition: 'background-color var(--transition-normal)'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  heading: {
    fontFamily: 'var(--font-title)',
    fontWeight: 700,
    fontSize: '1.2rem',
    marginBottom: '8px',
    color: 'var(--text-primary)'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px'
  },
  icon: {
    color: 'var(--primary)',
    marginTop: '3px'
  },
  address: {
    fontStyle: 'normal',
    color: 'var(--text-secondary)',
    fontSize: '0.95rem'
  },
  text: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem'
  },
  link: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    transition: 'color var(--transition-fast)'
  },
  socialList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  socialItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  socialIcon: {
    color: 'var(--primary)'
  },
  aboutText: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    lineHeight: '1.6'
  },
  smallText: {
    color: 'var(--text-muted)',
    fontSize: '0.82rem',
    lineHeight: '1.5',
    fontStyle: 'italic'
  },
  bar: {
    width: '60px',
    height: '4px',
    background: 'var(--primary)',
    borderRadius: '2px',
    marginTop: '4px'
  },
  bottomBar: {
    borderTop: '1px solid var(--border)',
    padding: '20px 0',
    background: 'var(--bg-app)',
    transition: 'background-color var(--transition-normal)'
  },
  bottomText: {
    textAlign: 'center',
    fontSize: '0.85rem',
    color: 'var(--text-muted)'
  }
};
