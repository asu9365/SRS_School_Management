import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Monitor, Award, Heart, Shield, Users, Layers, 
  Star, Sparkles, GraduationCap, Calendar, Laptop, MapPin,
  ArrowRight, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [teachers, setTeachers] = useState([]);
  const [countersVisible, setCountersVisible] = useState(false);

  useEffect(() => {
    fetch('/api/teachers.php')
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data && res.data.length > 0) {
          setTeachers(res.data.slice(0, 3));
        } else {
          setTeachers(fallbackTeachers);
        }
      })
      .catch(() => setTeachers(fallbackTeachers));
  }, []);

  // Animate counters on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCountersVisible(true);
      },
      { threshold: 0.3 }
    );
    const el = document.getElementById('stats-section');
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  const fallbackTeachers = [
    { Name: "Sir Manohar K.", qualification: "B.Ed, M.Sc", experience: "7 Years", role: "Assistant Teacher" },
    { Name: "Sir Umesh S.", qualification: "B.Ed, B.Sc", experience: "7 Years", role: "Assistant Teacher" },
    { Name: "Mam Knisha Kullu", qualification: "B.Ed, B.A", experience: "7 Years", role: "Assistant Teacher" }
  ];

  const stats = [
    { value: '25+', label: 'Years of Excellence', icon: <Calendar size={24} /> },
    { value: '14', label: 'Dedicated Staff', icon: <Users size={24} /> },
    { value: '10', label: 'Grade Levels', icon: <GraduationCap size={24} /> },
    { value: '14', label: 'Computers', icon: <Laptop size={24} /> },
  ];

  const facilities = [
    { title: "Library", desc: "A rich collection of academic books, reference materials, and literary resources to foster a culture of reading.", icon: <BookOpen size={24} /> },
    { title: "Computer Lab", desc: "14 fully functional computers with a dedicated computer-aided learning lab for digital education.", icon: <Monitor size={24} /> },
    { title: "Science Laboratory", desc: "Well-equipped lab providing hands-on experience in sciences, enhancing practical understanding.", icon: <Layers size={24} /> },
    { title: "Playground", desc: "A spacious playground for sports, physical education, and recreational activities during breaks.", icon: <Award size={24} /> },
    { title: "Hostel & Boarding", desc: "Separate hostels for boys and girls with dedicated staff ensuring a safe and comfortable stay.", icon: <Shield size={24} /> },
    { title: "Campus Church", desc: "A serene venue for reflection, prayer, and community gatherings within the campus grounds.", icon: <Heart size={24} /> },
    { title: "Digital Classrooms", desc: "13 classrooms in excellent condition, equipped with modern aids for interactive learning.", icon: <Sparkles size={24} /> },
    { title: "Clean Infrastructure", desc: "Private building with pucca boundary wall, electric connection, functional tap water, and clean toilets.", icon: <Users size={24} /> },
  ];

  return (
    <div>
      {/* ─── HERO SECTION ─── */}
      <header className="hero-section" style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div className="container hero-content-wrapper" style={styles.heroInner}>
          <div style={styles.heroContent}>
            <span style={styles.heroBadge}>Est. 1998 • Jakhalabandha, Assam</span>
            <h1 className="hero-section h1" style={styles.heroTitle}>
              ST. ROBERT'S SCHOOL
            </h1>
            <p style={styles.heroSubtitle}>Ensuring Better Education for a Better World</p>
            <p style={styles.heroText}>
              A co-educational English-medium school providing quality education from 
              Grades 1 to 10, nurturing young minds in the heart of Nagaon district since 1998.
            </p>
            <div className="hero-actions-container" style={styles.heroActions}>
              <Link to="/about" className="btn btn-primary" style={styles.heroBtn}>
                Discover More <ArrowRight size={16} />
              </Link>
              <Link to="/office-hours" className="btn btn-outline-light">
                Office Hours
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Feature Cards */}
        <div className="container feature-cards-container" style={styles.featureCardsContainer}>
          <div className="grid-3" style={styles.featureGrid}>
            <div style={styles.featureCard}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardHeaderTitle}>English Medium</h3>
              </div>
              <div style={styles.cardBody}>
                <p style={styles.cardBodyText}>Complete English-medium instruction from pre-primary through Grade 10 with experienced educators.</p>
                <Link to="/about" style={styles.learnMore}>Learn More <ChevronRight size={14} /></Link>
              </div>
            </div>

            <div style={styles.featureCard}>
              <div style={{ ...styles.cardHeader, background: 'rgba(240, 127, 52, 0.85)' }}>
                <h3 style={styles.cardHeaderTitle}>Computer Lab</h3>
              </div>
              <div style={styles.cardBody}>
                <p style={styles.cardBodyText}>State-of-the-art computer-aided learning lab with 14 functional computers for digital education.</p>
                <Link to="/gallery" style={styles.learnMore}>View Gallery <ChevronRight size={14} /></Link>
              </div>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.cardHeader}>
                <h3 style={styles.cardHeaderTitle}>Holistic Growth</h3>
              </div>
              <div style={styles.cardBody}>
                <p style={styles.cardBodyText}>Sports, cultural programs, spiritual development, and academics — for the complete development of every child.</p>
                <Link to="/staff" style={styles.learnMore}>Meet Staff <ChevronRight size={14} /></Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── STATS COUNTER ─── */}
      <section id="stats-section" style={styles.statsSec}>
        <div className="container">
          <div className="grid-4" style={styles.statsGrid}>
            {stats.map((stat, idx) => (
              <div key={idx} style={{
                ...styles.statItem,
                animation: countersVisible ? `fadeInUp 0.5s ease ${idx * 0.1}s both` : 'none'
              }}>
                <div style={styles.statIcon}>{stat.icon}</div>
                <div style={styles.statValue}>{stat.value}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT SNIPPET ─── */}
      <section className="section-padding" style={styles.aboutSec}>
        <div className="container">
          <div style={styles.aboutGrid}>
            <div style={styles.aboutImageArea}>
              <img 
                src="/images/campus/20210315_121313-01.jpeg" 
                alt="St. Robert's School Campus" 
                style={styles.aboutImage}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div style={styles.aboutImageOverlay}>
                <span style={styles.aboutImageLabel}>Our Campus</span>
              </div>
            </div>
            <div style={styles.aboutTextArea}>
              <span style={styles.sectionTag}>ABOUT US</span>
              <h2 style={styles.aboutTitle}>A Legacy of 25+ Years of Educational Excellence</h2>
              <div style={styles.aboutDivider}></div>
              <p style={styles.aboutPara}>
                Saint Robert's School was established in <strong>1998</strong> as a private unaided 
                institution in the rural area of Kaliabor block, Nagaon district, Assam. We offer 
                co-educational English-medium education from <strong>Grades 1 to 10</strong> with 
                an attached pre-primary section.
              </p>
              <p style={styles.aboutPara}>
                Our campus features <strong>13 well-maintained classrooms</strong>, a modern 
                <strong> computer-aided learning lab</strong> with 14 functional computers, a 
                library, playground, and dedicated hostel facilities for boarding students.
              </p>
              <Link to="/about" className="btn btn-primary" style={{ marginTop: '8px' }}>
                Read Full Story <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FACILITIES ─── */}
      <section className="section-padding" style={styles.facilitiesSec}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Our Campus Facilities</h2>
            <div style={styles.sectionDivider}></div>
            <p style={styles.sectionDesc}>We provide a rich, modern environment supporting our students' academic, physical, and spiritual development.</p>
          </div>

          <div className="grid-4">
            {facilities.map((fac, idx) => (
              <div key={idx} className="glass-card" style={styles.facilityCard}>
                <div style={styles.facilityIcon}>{fac.icon}</div>
                <h3 style={styles.facilityTitle}>{fac.title}</h3>
                <p style={styles.facilityDesc}>{fac.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEACHERS ─── */}
      <section className="section-padding" style={styles.teachersSec}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Our Leading Teachers</h2>
            <div style={styles.sectionDivider}></div>
            <p style={styles.sectionDesc}>Meet some of our highly qualified and passionate educators driving student success.</p>
          </div>

          <div className="grid-3">
            {teachers.map((teacher, idx) => (
              <div key={idx} className="glass-card" style={styles.teacherCard}>
                <div style={styles.teacherHeader}>
                  <div style={styles.teacherAvatar}>
                    {(teacher.Name || `${teacher.Fname} ${teacher.Lname}`).substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 style={styles.teacherName}>{teacher.Name || `${teacher.Fname} ${teacher.Lname}`}</h3>
                    <p style={styles.teacherRole}>{teacher.role || 'Educator'}</p>
                  </div>
                </div>
                <div style={styles.teacherDetails}>
                  <p><strong>Qualification:</strong> {teacher.qualification || 'B.Ed'}</p>
                  <p><strong>Experience:</strong> {teacher.experience || '7 Years'}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/staff" className="btn btn-secondary">View All Staff</Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section-padding" style={styles.testimonialsSec}>
        <div className="container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>What Our Students Say</h2>
            <div style={styles.sectionDivider}></div>
          </div>

          <div className="grid-2">
            <div className="glass-card" style={styles.testimonialCard}>
              <p style={styles.testimonialQuote}>"I love our vibrant library and the continuous support from teachers! They make complex concepts extremely simple to learn."</p>
              <div style={styles.testimonialUser}>
                <div style={styles.stars}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 4 ? "var(--warning)" : "none"} color="var(--warning)" />)}
                </div>
                <h4 style={styles.testimonialName}>Ankita Chetry</h4>
                <p style={styles.testimonialClass}>Class 5 Student</p>
              </div>
            </div>

            <div className="glass-card" style={styles.testimonialCard}>
              <p style={styles.testimonialQuote}>"The digital classes and scientific labs make learning so much fun! I get hands-on experience which helps me understand practical concepts."</p>
              <div style={styles.testimonialUser}>
                <div style={styles.stars}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--warning)" color="var(--warning)" />)}
                </div>
                <h4 style={styles.testimonialName}>Nashir Ansari</h4>
                <p style={styles.testimonialClass}>Class 6 Student</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section style={styles.ctaSec}>
        <div className="container" style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to join St. Robert's School?</h2>
          <p style={styles.ctaText}>Admissions open for the new academic session starting April. Contact us to learn more.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/office-hours" className="btn btn-primary" style={{ boxShadow: '0 4px 20px rgba(240,127,52,0.4)' }}>
              Book an Appointment
            </Link>
            <Link to="/about" className="btn btn-outline-light">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  // Hero
  hero: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'url("https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=1920") center/cover no-repeat',
    paddingTop: '130px',
    paddingBottom: '150px',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'linear-gradient(135deg, rgba(4, 9, 30, 0.7) 0%, rgba(12, 46, 138, 0.4) 100%)',
    zIndex: 1,
  },
  heroInner: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  heroContent: {
    maxWidth: '700px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    color: '#fff',
  },
  heroBadge: {
    display: 'inline-block',
    background: 'rgba(240, 127, 52, 0.2)',
    border: '1px solid rgba(240, 127, 52, 0.4)',
    color: '#f07f34',
    fontSize: '0.75rem',
    fontWeight: '700',
    padding: '6px 16px',
    borderRadius: '20px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    width: 'fit-content',
  },
  heroTitle: {
    fontSize: '3.5rem',
    fontWeight: '900',
    lineHeight: '1.1',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '-0.01em',
  },
  heroSubtitle: {
    fontSize: '1.3rem',
    fontWeight: '300',
    color: 'rgba(255,255,255,0.9)',
    fontStyle: 'italic',
  },
  heroText: {
    fontSize: '1rem',
    fontWeight: '400',
    color: 'rgba(255,255,255,0.75)',
    lineHeight: '1.7',
  },
  heroActions: {
    display: 'flex',
    gap: '16px',
    marginTop: '10px',
    flexWrap: 'wrap',
  },
  heroBtn: {
    boxShadow: '0 4px 20px rgba(240,127,52,0.4)',
  },
  featureCardsContainer: {
    position: 'absolute',
    bottom: '-100px',
    left: 0, right: 0,
    zIndex: 3,
  },
  featureGrid: {
    display: 'grid',
    boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
  },
  featureCard: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    background: 'rgba(4, 9, 30, 0.75)',
    padding: '25px',
    backdropFilter: 'blur(5px)',
    textAlign: 'center',
    minHeight: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeaderTitle: {
    color: '#fff',
    fontSize: '1.2rem',
    fontWeight: '600',
    margin: 0,
  },
  cardBody: {
    background: '#fff',
    padding: '30px 25px',
    textAlign: 'center',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  cardBodyText: {
    color: '#777',
    fontSize: '0.9rem',
    lineHeight: '1.6',
    margin: 0,
  },
  learnMore: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    color: '#222',
    fontWeight: '700',
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    textDecoration: 'none',
    transition: 'color 0.3s',
  },
  // Stats
  statsSec: {
    background: 'var(--navy)',
    padding: '80px 0',
    marginTop: '100px',
  },
  statsGrid: {
    gap: '24px',
  },
  statItem: {
    textAlign: 'center',
    color: '#fff',
  },
  statIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'rgba(240, 127, 52, 0.2)',
    color: '#f07f34',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 14px',
  },
  statValue: {
    fontSize: '2.5rem',
    fontWeight: '900',
    fontFamily: 'var(--font-title)',
    lineHeight: '1',
  },
  statLabel: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '500',
    marginTop: '6px',
  },
  // About Snippet
  aboutSec: {
    background: 'var(--bg-app)',
  },
  aboutGrid: {
    display: 'flex',
    gap: '50px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  aboutImageArea: {
    flex: 1,
    minWidth: '300px',
    position: 'relative',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-lg)',
  },
  aboutImage: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
  },
  aboutImageOverlay: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    padding: '20px',
    background: 'linear-gradient(transparent, rgba(4,9,30,0.7))',
  },
  aboutImageLabel: {
    color: '#fff',
    fontSize: '0.85rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  aboutTextArea: {
    flex: 1.2,
    minWidth: '320px',
  },
  sectionTag: {
    display: 'inline-block',
    color: 'var(--primary)',
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  aboutTitle: {
    fontSize: '2rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    lineHeight: '1.2',
  },
  aboutDivider: {
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
    marginBottom: '14px',
  },
  // Section Header Shared
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
    maxWidth: '600px',
    margin: '0 auto',
  },
  // Facilities
  facilitiesSec: {
    background: 'var(--bg-muted)',
    transition: 'background-color var(--transition-normal)',
  },
  facilityCard: {
    padding: '30px',
    borderRadius: 'var(--radius-md)',
    height: '100%',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
  },
  facilityIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    background: 'var(--primary-glow)',
    color: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  facilityTitle: {
    fontSize: '1.15rem',
    fontWeight: '700',
    marginBottom: '10px',
    color: 'var(--text-primary)',
  },
  facilityDesc: {
    fontSize: '0.88rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
  },
  // Teachers
  teachersSec: {
    background: 'var(--bg-surface)',
    transition: 'background-color var(--transition-normal)',
  },
  teacherCard: {
    padding: '30px',
    borderRadius: 'var(--radius-md)',
    background: 'var(--bg-glass)',
    border: '1px solid var(--border)',
  },
  teacherHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '20px',
  },
  teacherAvatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'var(--primary)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '1.1rem',
  },
  teacherName: {
    fontSize: '1.15rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  teacherRole: {
    fontSize: '0.85rem',
    color: 'var(--primary)',
    fontWeight: '600',
  },
  teacherDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    borderTop: '1px solid var(--border)',
    paddingTop: '16px',
  },
  // Testimonials
  testimonialsSec: {
    background: 'var(--bg-app)',
    transition: 'background-color var(--transition-normal)',
  },
  testimonialCard: {
    padding: '40px',
    borderRadius: 'var(--radius-md)',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '24px',
  },
  testimonialQuote: {
    fontSize: '1.05rem',
    color: 'var(--text-primary)',
    fontStyle: 'italic',
    lineHeight: '1.7',
  },
  testimonialUser: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  stars: {
    display: 'flex',
    gap: '4px',
    marginBottom: '6px',
  },
  testimonialName: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  testimonialClass: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
  },
  // CTA
  ctaSec: {
    background: 'linear-gradient(135deg, #04091e 0%, #0c2e8a 100%)',
    padding: '80px 0',
  },
  ctaContent: {
    textAlign: 'center',
    maxWidth: '650px',
    margin: '0 auto',
  },
  ctaTitle: {
    fontSize: '2.2rem',
    fontWeight: '800',
    color: '#fff',
    marginBottom: '16px',
  },
  ctaText: {
    fontSize: '1.05rem',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '30px',
    lineHeight: '1.6',
  },
};
