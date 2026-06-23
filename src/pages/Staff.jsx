import React, { useState, useEffect } from 'react';
import { BookOpen, Award, GraduationCap, MapPin, Phone, MessageSquare } from 'lucide-react';

export default function Staff() {
  const [teachers, setTeachers] = useState([]);

  const staticStaff = [
    { Name: "Sir Manohar K.", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: 'Teaching is a lifelong journey of learning and inspiring others.', image: "/images/Teachers/DSC_9067.JPG" },
    { Name: "Sir Kanchan", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: 'Education is the light that guides us through life\'s challenges.', image: "/images/Teachers/DSC_9068.JPG" },
    { Name: "Sir Umesh S.", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: 'A good teacher ignites curiosity that lasts a lifetime.', image: "/images/Teachers/DSC_9075.JPG" },
    { Name: "Mam Knisha Kullu", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: "Great teachers inspire, encourage, and empower.", image: "/images/Teachers/DSC_9076.JPG" },
    { Name: "Sir Criyac Kujur", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: "Learning is a treasure that will follow its owner everywhere.", image: "/images/Teachers/DSC_9077.JPG" },
    { Name: "Mam Leena Kujur", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: "Every child deserves a champion—an adult who will never give up on them.", image: "/images/Teachers/DSC_9082.JPG" },
    { Name: "Mam Roshni Kandulna", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: "Teaching is the profession that teaches all other professions.", image: "/images/Teachers/DSC_9084.JPG" },
    { Name: "Miss Prova Aind", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: "A teacher affects eternity; they can never tell where their influence stops.", image: "/images/Teachers/DSC_9085.JPG" },
    { Name: "Mam Chainika", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: "Knowledge is the passport to the future, and teachers are the guides.", image: "/images/Teachers/DSC_9086.JPG" },
    { Name: "Mam Roshlin Kandulna", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: "The best teachers teach from the heart, not from the book.", image: "/images/Teachers/DSC_9087.JPG" },
    { Name: "Mam Anjali Singh", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: "In teaching, you touch the lives of many, forever.", image: "/images/Teachers/DSC_9088.JPG" },
    { Name: "Sir Raphael Lakra", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: "Education is the most powerful weapon to change the world.", image: "/images/Teachers/DSC_9089.JPG" },
    { Name: "Mam Pinky Dey", qualification: "B.Ed", experience: "7 Years", role: "Assistant Teacher", address: "Jakhalabandha", Phone: "67896854789", message: "A teacher's purpose is not to create students in their own image, but to develop students who can create their own future.", image: "/images/Teachers/DSC_9090.JPG" }
  ];

  useEffect(() => {
    fetch('/api/teachers.php')
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data && res.data.length > 0) {
          // Merge dynamic teachers with the static core staff
          const merged = [...res.data, ...staticStaff.filter(s => !res.data.some(d => d.Name === s.Name))];
          setTeachers(merged);
        } else {
          setTeachers(staticStaff);
        }
      })
      .catch(() => setTeachers(staticStaff));
  }, []);

  return (
    <section className="section-padding" style={styles.section}>
      <div className="container">
        <div style={styles.header}>
          <GraduationCap size={36} style={{ color: 'var(--primary)', marginBottom: '12px' }} />
          <h1 style={styles.title}>Our Dedicated Staff</h1>
          <div style={styles.divider}></div>
          <p style={styles.desc}>
            Our experienced teachers are the heart of St. Robert’s High School.
            They inspire academic excellence and holistic growth through patience and commitment.
          </p>
        </div>

        <div className="grid-3" style={styles.grid}>
          {teachers.map((teacher, idx) => {
            const displayName = teacher.Name || `${teacher.Fname} ${teacher.Lname}`;
            const init = displayName.replace('Sir ', '').replace('Mam ', '').replace('Miss ', '').substring(0, 2);
            return (
              <div key={idx} className="glass-card" style={styles.card}>
                <div style={styles.cardHeader}>
                  {teacher.image ? (
                    <img src={teacher.image} alt={displayName} style={styles.avatarImage} />
                  ) : (
                    <div style={styles.avatar}>{init}</div>
                  )}
                  <div>
                    <h3 style={styles.name}>{displayName}</h3>
                    <span style={styles.roleTag}>{teacher.role || 'Assistant Teacher'}</span>
                  </div>
                </div>

                <div style={styles.details}>
                  <div style={styles.detailRow}>
                    <GraduationCap size={16} style={styles.icon} />
                    <span><strong>Qualification:</strong> {teacher.qualification || 'B.Ed'}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <Award size={16} style={styles.icon} />
                    <span><strong>Experience:</strong> {teacher.experience || '7 Years'}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <MapPin size={16} style={styles.icon} />
                    <span><strong>Address:</strong> {teacher.address || 'Jakhalabandha'}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <Phone size={16} style={styles.icon} />
                    <span><strong>Contact:</strong> {teacher.Phone || '67896854789'}</span>
                  </div>
                </div>

                {teacher.message && (
                  <div style={styles.messageBox}>
                    <MessageSquare size={14} style={styles.quoteIcon} />
                    <p style={styles.message}>{teacher.message}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: 'var(--bg-app)',
    minHeight: 'calc(100vh - 70px)',
    transition: 'background-color var(--transition-normal)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: 'var(--text-primary)'
  },
  divider: {
    width: '60px',
    height: '4px',
    background: 'var(--primary)',
    borderRadius: '2px',
    margin: '12px 0 16px'
  },
  desc: {
    fontSize: '1.05rem',
    color: 'var(--text-secondary)',
    maxWidth: '600px'
  },
  grid: {
    marginTop: '20px'
  },
  card: {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '20px'
  },
  avatar: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'var(--primary-glow)',
    color: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '1.1rem'
  },
  avatarImage: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid var(--primary)',
    boxShadow: 'var(--shadow-md)'
  },
  name: {
    fontSize: '1.2rem',
    fontWeight: '750',
    color: 'var(--text-primary)'
  },
  roleTag: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    fontWeight: '600'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
    fontSize: '0.9rem',
    color: 'var(--text-secondary)'
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  icon: {
    color: 'var(--primary)',
    flexShrink: 0
  },
  messageBox: {
    background: 'var(--bg-app)',
    borderRadius: '8px',
    padding: '12px 16px',
    position: 'relative',
    borderLeft: '3px solid var(--primary)'
  },
  quoteIcon: {
    position: 'absolute',
    top: '-8px',
    left: '8px',
    color: 'var(--primary)',
    background: 'var(--bg-surface)',
    padding: '2px',
    borderRadius: '50%',
    boxShadow: 'var(--shadow-sm)'
  },
  message: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    fontStyle: 'italic',
    lineHeight: '1.5'
  }
};
