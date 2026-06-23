import React, { useState } from 'react';
import { Clock, Calendar, Check, X, ShieldAlert } from 'lucide-react';
import Toast from '../components/Toast';

export default function OfficeHours() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ SName: '', Class: '', GName: '', number: '' });
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.SName || !formData.Class || !formData.GName || !formData.number) {
      setToastType('error');
      setToastMessage('Please fill all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/appointment.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.success) {
        setToastType('success');
        setToastMessage('Appointment booked successfully!');
        setFormData({ SName: '', Class: '', GName: '', number: '' });
        setIsModalOpen(false);
      } else {
        setToastType('error');
        setToastMessage(data.message || 'Booking failed. Please try again.');
      }
    } catch (err) {
      setToastType('error');
      setToastMessage('Error connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding" style={styles.section}>
      <div className="container">
        <div style={styles.header}>
          <Clock size={36} style={{ color: 'var(--primary)', marginBottom: '12px' }} />
          <h1 style={styles.title}>School & Office Hours</h1>
          <div style={styles.divider}></div>
          <p style={styles.desc}>Review St. Robert's School timing guides and schedule meetings with the administration. Academic session starts in April.</p>
        </div>

        {/* Cards Row */}
        <div className="grid-2" style={styles.cardsGrid}>
          {/* School Hours Card */}
          <div className="glass-card" style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.iconBox}><Clock size={20} /></div>
              <h2 style={styles.cardTitle}>School Hours</h2>
            </div>
            <ul style={styles.hoursList}>
              <li style={styles.hoursItem}>
                <strong>Monday to Friday:</strong>
                <div style={styles.timeDetails}>
                  <span>Montessori: 8:50 AM – 11:30 AM</span>
                  <span>Nursery: 8:50 AM – 12:30 PM</span>
                  <span>Class I to X: 8:50 AM – 2:00 PM</span>
                </div>
              </li>
              <li style={styles.hoursItem}>
                <strong>Saturday:</strong>
                <div style={styles.timeDetails}>
                  <span>Every 3rd Saturday: School Closed</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Office Hours Card */}
          <div className="glass-card" style={styles.card}>
            <div style={styles.cardHeader}>
              <div style={styles.iconBox}><Calendar size={20} /></div>
              <h2 style={styles.cardTitle}>Office Work Hours</h2>
            </div>
            <ul style={styles.hoursList}>
              <li style={styles.hoursItem}>
                <strong>Daily Timings:</strong>
                <div style={styles.timeDetails}>
                  <span>9:15 AM – 12:00 Noon only</span>
                </div>
              </li>
              <li style={{ ...styles.hoursItem, color: 'var(--error)' }}>
                <strong>Important Note:</strong>
                <div style={{ ...styles.timeDetails, fontStyle: 'italic', display: 'flex', gap: '8px', alignItems: 'flex-start', marginTop: '6px' }}>
                  <ShieldAlert size={16} style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>No office work on holidays, Sundays, or during recess periods on working days.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div style={styles.actionArea}>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary" style={styles.actionBtn}>
            <Calendar size={18} />
            Make Appointment
          </button>
        </div>
      </div>

      {/* Appointment Booking Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3>Make Appointment</h3>
              <button onClick={() => setIsModalOpen(false)} style={styles.closeBtn} aria-label="Close modal">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleFormSubmit} style={styles.form}>
              <div className="form-group">
                <label htmlFor="SName">Student Name</label>
                <input
                  type="text"
                  name="SName"
                  id="SName"
                  className="form-input"
                  placeholder="Enter Student Full Name"
                  value={formData.SName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="Class">Class / Grade</label>
                <input
                  type="number"
                  name="Class"
                  id="Class"
                  className="form-input"
                  placeholder="e.g., 5"
                  value={formData.Class}
                  onChange={handleInputChange}
                  required
                  min="1"
                  max="12"
                />
              </div>

              <div className="form-group">
                <label htmlFor="GName">Guardian Name</label>
                <input
                  type="text"
                  name="GName"
                  id="GName"
                  className="form-input"
                  placeholder="Enter Guardian's Name"
                  value={formData.GName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="number">Phone Number</label>
                <input
                  type="tel"
                  name="number"
                  id="number"
                  className="form-input"
                  placeholder="Enter 10-digit mobile number"
                  value={formData.number}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div style={styles.formActions}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" disabled={loading} className="btn btn-primary">
                  {loading ? 'Booking...' : 'Book Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Toast 
        message={toastMessage} 
        type={toastType} 
        onClose={() => setToastMessage('')} 
      />
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
    marginBottom: '40px',
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
  cardsGrid: {
    marginBottom: '40px'
  },
  card: {
    padding: '30px',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '24px'
  },
  iconBox: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'var(--primary-glow)',
    color: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardTitle: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: 'var(--text-primary)'
  },
  hoursList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  hoursItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '0.95rem',
    color: 'var(--text-primary)'
  },
  timeDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    paddingLeft: '16px',
    borderLeft: '2px solid var(--border)',
    color: 'var(--text-secondary)',
    fontSize: '0.9rem'
  },
  actionArea: {
    textAlign: 'center',
    marginTop: '30px'
  },
  actionBtn: {
    boxShadow: '0 4px 16px var(--primary-glow)',
    padding: '12px 28px'
  },
  // Modal Styles
  modalContent: {
    maxWidth: '500px'
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    borderBottom: '1px solid var(--border)'
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-secondary)'
  },
  form: {
    padding: '24px'
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '32px'
  }
};
// Helper to support center/justify inside flex style objects
styles.iconBox.justifyContent = 'center';
