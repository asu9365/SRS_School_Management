import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, BookOpen, Monitor, Users, MapPin, Calendar, 
  Laptop, Droplets, Shield, Fence, Zap, GraduationCap, 
  School, Heart, Globe, Award
} from 'lucide-react';

export default function About() {
  const infrastructure = [
    { icon: <Building2 size={22} />, label: 'Private Building', desc: 'Well-maintained private school building with pucca boundary wall' },
    { icon: <School size={22} />, label: '13 Classrooms', desc: 'All classrooms in good condition for instructional purposes' },
    { icon: <Laptop size={22} />, label: '14 Computers', desc: 'Fully functional computer-aided learning lab for digital education' },
    { icon: <BookOpen size={22} />, label: 'Library', desc: 'Rich collection of books and resources for students and staff' },
    { icon: <Users size={22} />, label: 'Playground', desc: 'Spacious playground for sports, recreation, and physical education' },
    { icon: <Droplets size={22} />, label: 'Clean Water', desc: 'Functional tap water supply for safe drinking water access' },
    { icon: <Zap size={22} />, label: 'Electric Connection', desc: 'Reliable electric supply for digital classrooms and campus needs' },
    { icon: <Shield size={22} />, label: 'Separate Toilets', desc: 'Functional separate toilet facilities for boys and girls' },
  ];

  const highlights = [
    { icon: <Calendar size={20} />, label: 'Established', value: '1998' },
    { icon: <GraduationCap size={20} />, label: 'Grades', value: '1 to 10' },
    { icon: <Globe size={20} />, label: 'Medium', value: 'English' },
    { icon: <Users size={20} />, label: 'Type', value: 'Co-educational' },
    { icon: <MapPin size={20} />, label: 'Location', value: 'Kaliabor Block' },
    { icon: <Award size={20} />, label: 'District', value: 'Nagaon, Assam' },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section style={styles.heroBanner}>
        <div style={styles.heroOverlay}></div>
        <div className="container" style={styles.heroContent}>
          <h1 style={styles.heroTitle}>About Our School</h1>
          <p style={styles.heroBreadcrumb}>
            <Link to="/" style={styles.breadcrumbLink}>Home</Link> / <span>About</span>
          </p>
        </div>
      </section>

      {/* About Main Section */}
      <section className="section-padding" style={styles.aboutSec}>
        <div className="container">
          <div style={styles.aboutGrid}>
            {/* Left — Text Content */}
            <div style={styles.aboutText}>
              <span style={styles.tag}>EST. 1998</span>
              <h2 style={styles.aboutTitle}>Saint Robert's School, Jakhalabandha</h2>
              <div style={styles.divider}></div>
              <p style={styles.aboutPara}>
                Saint Robert's School was established in <strong>1998</strong> and is managed as a 
                <strong> Private Unaided</strong> institution. Located in the rural area of 
                <strong> Kaliabor block, Nagaon district, Assam</strong>, the school serves as a 
                beacon of quality education in the region.
              </p>
              <p style={styles.aboutPara}>
                The school offers <strong>English-medium</strong> education from <strong>Grades 1 to 10</strong>, 
                along with an attached <strong>pre-primary section</strong>. It is a <strong>co-educational</strong> institution 
                committed to the holistic development of every child. The academic session commences in <strong>April</strong> each year.
              </p>
              <p style={styles.aboutPara}>
                With a dedicated staff of experienced educators, modern infrastructure including 
                <strong> 14 functional computers</strong> in a dedicated computer-aided learning lab, 
                a well-stocked <strong>library</strong>, and a spacious <strong>playground</strong>, 
                St. Robert's School ensures that students receive a well-rounded education that prepares 
                them for future challenges.
              </p>
              <Link to="/gallery" className="btn btn-primary" style={{ marginTop: '12px' }}>
                Explore Our Campus
              </Link>
            </div>

            {/* Right — Quick Highlights Card */}
            <div style={styles.highlightsCard}>
              <h3 style={styles.highlightsTitle}>School at a Glance</h3>
              <div style={styles.highlightsList}>
                {highlights.map((item, idx) => (
                  <div key={idx} style={styles.highlightItem}>
                    <div style={styles.highlightIcon}>{item.icon}</div>
                    <div>
                      <div style={styles.highlightLabel}>{item.label}</div>
                      <div style={styles.highlightValue}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="section-padding" style={styles.infraSec}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Our Infrastructure</h2>
            <div style={styles.sectionDivider}></div>
            <p style={styles.sectionDesc}>
              Our school building has <strong>13 classrooms</strong> in good condition, 
              <strong> 2 non-teaching rooms</strong>, a separate Head Master room, 
              and is fully accessible by all-weather road.
            </p>
          </div>

          <div className="grid-4">
            {infrastructure.map((item, idx) => (
              <div key={idx} className="glass-card" style={styles.infraCard}>
                <div style={styles.infraIcon}>{item.icon}</div>
                <h4 style={styles.infraLabel}>{item.label}</h4>
                <p style={styles.infraDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding" style={styles.missionSec}>
        <div className="container">
          <div className="grid-2" style={styles.missionGrid}>
            <div className="glass-card" style={styles.missionCard}>
              <div style={styles.missionIcon}>
                <Heart size={28} />
              </div>
              <h3 style={styles.missionTitle}>Our Mission</h3>
              <p style={styles.missionText}>
                To nurture young minds through quality English-medium education, instilling values of 
                discipline, compassion, and excellence. We aim to develop students who are academically 
                strong, morally upright, and socially responsible citizens.
              </p>
            </div>

            <div className="glass-card" style={styles.missionCard}>
              <div style={{ ...styles.missionIcon, background: 'rgba(12, 46, 138, 0.1)', color: 'var(--navy)' }}>
                <Globe size={28} />
              </div>
              <h3 style={styles.missionTitle}>Our Vision</h3>
              <p style={styles.missionText}>
                To be the leading institution of academic excellence in the Kaliabor region — 
                empowering every student with knowledge, skills, and values that enable them to 
                contribute positively to society and thrive in an ever-changing world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="section-padding" style={styles.locationSec}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Find Us</h2>
            <div style={styles.sectionDivider}></div>
          </div>
          <div className="glass-card" style={styles.locationCard}>
            <div style={styles.locationInfo}>
              <MapPin size={24} style={{ color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <h4 style={{ marginBottom: '8px', fontSize: '1.15rem' }}>St. Robert's School Campus</h4>
                <p style={styles.locationText}>
                  Jakhalabandha, Rongaloo<br />
                  Kaliabor Block, Nagaon District<br />
                  Assam, India — 782136
                </p>
                <p style={{ ...styles.locationText, marginTop: '12px', fontStyle: 'italic' }}>
                  Approachable by all-weather road. Located in the heart of the Jakhalabandha community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  heroBanner: {
    position: 'relative',
    height: '320px',
    display: 'flex',
    alignItems: 'center',
    background: 'url("https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1920") center/cover no-repeat',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(4, 9, 30, 0.75) 0%, rgba(12, 46, 138, 0.6) 100%)',
    zIndex: 1,
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    color: '#fff',
  },
  heroTitle: {
    fontSize: '2.8rem',
    fontWeight: '800',
    color: '#fff',
    marginBottom: '8px',
  },
  heroBreadcrumb: {
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.7)',
  },
  breadcrumbLink: {
    color: 'var(--orange)',
    fontWeight: '600',
  },
  // About Section
  aboutSec: {
    background: 'var(--bg-app)',
  },
  aboutGrid: {
    display: 'flex',
    gap: '50px',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  aboutText: {
    flex: 1.2,
    minWidth: '320px',
  },
  tag: {
    display: 'inline-block',
    background: 'var(--primary-glow)',
    color: 'var(--primary)',
    fontSize: '0.75rem',
    fontWeight: '700',
    padding: '4px 14px',
    borderRadius: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '16px',
  },
  aboutTitle: {
    fontSize: '2.2rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    lineHeight: '1.2',
  },
  divider: {
    width: '60px',
    height: '4px',
    background: 'var(--primary)',
    borderRadius: '2px',
    margin: '16px 0 24px',
  },
  aboutPara: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.8',
    marginBottom: '16px',
  },
  // Highlights Card
  highlightsCard: {
    flex: 0.8,
    minWidth: '300px',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '32px',
    boxShadow: 'var(--shadow-md)',
  },
  highlightsTitle: {
    fontSize: '1.3rem',
    fontWeight: '750',
    marginBottom: '24px',
    color: 'var(--text-primary)',
    textAlign: 'center',
  },
  highlightsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  highlightItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '10px 14px',
    borderRadius: 'var(--radius-sm)',
    background: 'var(--bg-muted)',
    border: '1px solid var(--border-light)',
  },
  highlightIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'var(--primary-glow)',
    color: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  highlightLabel: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  highlightValue: {
    fontSize: '1.05rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  // Infrastructure
  infraSec: {
    background: 'var(--bg-muted)',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '50px',
  },
  sectionTitle: {
    fontSize: '2.2rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
  },
  sectionDivider: {
    width: '60px',
    height: '4px',
    background: 'var(--primary)',
    borderRadius: '2px',
    margin: '12px auto',
  },
  sectionDesc: {
    fontSize: '1.05rem',
    color: 'var(--text-secondary)',
    maxWidth: '650px',
    margin: '0 auto',
  },
  infraCard: {
    padding: '28px',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    textAlign: 'center',
    height: '100%',
  },
  infraIcon: {
    width: '52px',
    height: '52px',
    borderRadius: '14px',
    background: 'var(--primary-glow)',
    color: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  },
  infraLabel: {
    fontSize: '1.05rem',
    fontWeight: '700',
    marginBottom: '8px',
    color: 'var(--text-primary)',
  },
  infraDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
  },
  // Mission
  missionSec: {
    background: 'var(--bg-app)',
  },
  missionGrid: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  missionCard: {
    padding: '40px',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    textAlign: 'center',
  },
  missionIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: 'var(--primary-glow)',
    color: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
  },
  missionTitle: {
    fontSize: '1.4rem',
    fontWeight: '750',
    marginBottom: '16px',
    color: 'var(--text-primary)',
  },
  missionText: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.7',
  },
  // Location
  locationSec: {
    background: 'var(--bg-muted)',
  },
  locationCard: {
    padding: '40px',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    maxWidth: '700px',
    margin: '0 auto',
  },
  locationInfo: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
  },
  locationText: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.7',
  },
};
