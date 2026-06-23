import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ArrowLeft, Check, FileText } from 'lucide-react';
import Toast from '../components/Toast';

export default function TeacherForm({ auth }) {
  const [formData, setFormData] = useState({
    Fname: '', Mname: '', Lname: '',
    caste: '', DOB: '', Phone: '', blood: '',
    Ftname: '', Fcontact: '',
    Mtname: '', Mcontact: '',
    address: '', POaddress: '', pin: '', Dist: '', State: '',
    qualification: '', experience: '', classAssign: ''
  });

  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const navigate = useNavigate();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!auth) navigate('/login');
  }, [auth, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/teachers.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.success) {
        setToastType('success');
        setToastMessage('Teacher registered successfully!');
        setReceipt(data.data);
      } else {
        setToastType('error');
        setToastMessage(data.message || 'Registration failed.');
      }
    } catch (err) {
      setToastType('error');
      setToastMessage('Network error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (!auth) return null;

  if (receipt) {
    return (
      <section className="section-padding" style={styles.section}>
        <div className="container" style={styles.container}>
          <div className="glass-card" style={styles.receiptCard}>
            <div style={styles.receiptHeader}>
              <div style={styles.checkIconBox}><Check size={28} /></div>
              <h2>Registration Successful!</h2>
              <p>Teacher profile created with ID: <strong>#{receipt.id}</strong></p>
            </div>

            <div style={styles.receiptBody}>
              <h4 style={styles.receiptSectionTitle}>Registered Details</h4>
              <div style={styles.receiptGrid}>
                <div style={styles.receiptItem}><span>Teacher Name:</span> <strong>{`${receipt.Fname} ${receipt.Mname || ''} ${receipt.Lname}`}</strong></div>
                <div style={styles.receiptItem}><span>Contact Phone:</span> <strong>{receipt.Phone}</strong></div>
                <div style={styles.receiptItem}><span>Class Assigned:</span> <strong>Class {receipt.classAssign || 'N/A'}</strong></div>
                <div style={styles.receiptItem}><span>Blood Group:</span> <strong>{receipt.blood}</strong></div>
                <div style={styles.receiptItem}><span>Date of Birth:</span> <strong>{receipt.DOB}</strong></div>
                <div style={styles.receiptItem}><span>Qualification:</span> <strong>{receipt.qualification || 'N/A'}</strong></div>
                <div style={styles.receiptItem}><span>Experience:</span> <strong>{receipt.experience || 'N/A'}</strong></div>
                <div style={styles.receiptItem}><span>Full Address:</span> <strong>{`${receipt.address || ''}, PIN: ${receipt.pin || ''}, ${receipt.Dist || ''}, ${receipt.State || ''}`}</strong></div>
              </div>
            </div>

            <div style={styles.receiptFooter}>
              <button onClick={() => setReceipt(null)} className="btn btn-secondary">Register Another</button>
              <Link to="/dashboard" className="btn btn-primary">Back to Dashboard</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding" style={styles.section}>
      <div className="container">
        {/* Back Link */}
        <div style={styles.backLinkArea}>
          <Link to="/dashboard" style={styles.backLink}>
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>

        <div className="responsive-flex" style={styles.splitLayout}>
          {/* Form Side */}
          <div className="glass-card" style={styles.formCard}>
            <div style={styles.formHeader}>
              <UserPlus size={24} style={{ color: 'var(--primary)' }} />
              <h2>New Teacher Registration</h2>
            </div>
            <form onSubmit={handleFormSubmit} style={styles.form}>

              {/* Personal Info */}
              <h3 style={styles.subHeading}>Personal Details</h3>
              <div className="grid-3">
                <div className="form-group">
                  <label>First Name *</label>
                  <input type="text" name="Fname" className="form-input" value={formData.Fname} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Middle Name</label>
                  <input type="text" name="Mname" className="form-input" value={formData.Mname} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input type="text" name="Lname" className="form-input" value={formData.Lname} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="grid-3">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" name="Phone" placeholder="Enter Contact Number" className="form-input" value={formData.Phone} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Date of Birth *</label>
                  <input type="date" name="DOB" className="form-input" value={formData.DOB} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Blood Group *</label>
                  <input type="text" name="blood" placeholder="e.g. A+" className="form-input" value={formData.blood} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="form-group">
                <label>Caste</label>
                <input type="text" name="caste" className="form-input" value={formData.caste} onChange={handleInputChange} />
              </div>

              {/* Parent Info */}
              <h3 style={{ ...styles.subHeading, marginTop: '30px' }}>Parents details</h3>
              <div className="grid-2">
                <div className="form-group">
                  <label>Father's Name</label>
                  <input type="text" name="Ftname" className="form-input" value={formData.Ftname} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Father's Contact</label>
                  <input type="tel" name="Fcontact" className="form-input" value={formData.Fcontact} onChange={handleInputChange} />
                </div>
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label>Mother's Name</label>
                  <input type="text" name="Mtname" className="form-input" value={formData.Mtname} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Mother's Contact</label>
                  <input type="tel" name="Mcontact" className="form-input" value={formData.Mcontact} onChange={handleInputChange} />
                </div>
              </div>

              {/* Address Section */}
              <h3 style={{ ...styles.subHeading, marginTop: '30px' }}>Address Details</h3>
              <div className="grid-2">
                <div className="form-group">
                  <label>Village / Town</label>
                  <input type="text" name="address" className="form-input" value={formData.address} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>P.O. (Post Office)</label>
                  <input type="text" name="POaddress" className="form-input" value={formData.POaddress} onChange={handleInputChange} />
                </div>
              </div>

              <div className="grid-3">
                <div className="form-group">
                  <label>Pin Code</label>
                  <input type="number" name="pin" className="form-input" value={formData.pin} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>District</label>
                  <input type="text" name="Dist" className="form-input" value={formData.Dist} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input type="text" name="State" className="form-input" value={formData.State} onChange={handleInputChange} />
                </div>
              </div>

              {/* Qualifications */}
              <h3 style={{ ...styles.subHeading, marginTop: '30px' }}>Qualification & Experience</h3>
              <div className="form-group">
                <label>Qualification Details</label>
                <textarea name="qualification" rows="3" className="form-input" placeholder="e.g. B.Ed, M.Sc in Mathematics" value={formData.qualification} onChange={handleInputChange}></textarea>
              </div>
              <div className="form-group">
                <label>Experience Details</label>
                <textarea name="experience" rows="3" className="form-input" placeholder="e.g. 5 Years teaching at High School level" value={formData.experience} onChange={handleInputChange}></textarea>
              </div>

              <div className="form-group">
                <label>Class Assigned (Grade Number)</label>
                <input type="number" name="classAssign" placeholder="e.g. 5" className="form-input" value={formData.classAssign} onChange={handleInputChange} min="1" max="12" />
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary" style={styles.submitBtn}>
                {loading ? 'Registering Teacher...' : 'Submit Registration'}
              </button>
            </form>
          </div>

          {/* Interactive Live Preview Side */}
          <div className="responsive-sticky" style={styles.previewContainer}>
            <div className="glass-card" style={styles.previewCard}>
              <div style={styles.previewCardHeader}>
                <FileText size={18} />
                <h4>Live Profile Card Preview</h4>
              </div>
              <div style={styles.previewCardBody}>
                <div style={styles.avatarCircle}>
                  {formData.Fname ? formData.Fname.substring(0,1) + (formData.Lname ? formData.Lname.substring(0,1) : '') : 'T'}
                </div>
                
                <h3 style={styles.previewName}>{`${formData.Fname || '---'} ${formData.Mname || ''} ${formData.Lname || '---'}`}</h3>
                <p style={styles.previewRole}>Assistant Teacher</p>
                
                <div style={styles.previewDivider}></div>

                <div style={styles.previewDetailsGrid}>
                  <div><strong>Class Assigned:</strong> Class {formData.classAssign || 'N/A'}</div>
                  <div><strong>Contact Phone:</strong> {formData.Phone || '---'}</div>
                  <div><strong>Blood Group:</strong> {formData.blood || '---'}</div>
                  <div><strong>Qualifications:</strong> {formData.qualification || '---'}</div>
                  <div><strong>Experience:</strong> {formData.experience || '---'}</div>
                </div>

                <div style={styles.previewDivider}></div>

                <div style={styles.previewSectionHeader}>Permanent Address</div>
                <p style={styles.previewAddress}>
                  {formData.address || '---'}, {formData.POaddress && `P.O: ${formData.POaddress}, `}
                  PIN: {formData.pin || '---'}, {formData.Dist || '---'}, {formData.State || '---'}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  backLinkArea: {
    marginBottom: '24px'
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '600',
    color: 'var(--text-secondary)'
  },
  splitLayout: {
    display: 'flex',
    gap: '30px',
    alignItems: 'flex-start'
  },
  formCard: {
    flex: 1.3,
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '40px',
    width: '100%'
  },
  formHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderBottom: '1px solid var(--border)',
    paddingBottom: '16px',
    marginBottom: '24px'
  },
  subHeading: {
    fontSize: '1.1rem',
    fontWeight: '750',
    marginBottom: '16px',
    color: 'var(--primary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  submitBtn: {
    padding: '12px 24px',
    marginTop: '24px',
    alignSelf: 'flex-end'
  },
  // Preview Side
  previewContainer: {
    flex: 0.8,
    position: 'sticky',
    top: '100px',
    width: '100%'
  },
  previewCard: {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  previewCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 20px',
    borderBottom: '1px solid var(--border)',
    background: 'var(--bg-app)',
    color: 'var(--text-secondary)',
    fontWeight: '600',
    fontSize: '0.85rem',
    width: '100%',
    textAlign: 'left'
  },
  previewCardBody: {
    padding: '30px 24px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatarCircle: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'var(--primary)',
    color: 'white',
    fontSize: '1.6rem',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    boxShadow: '0 4px 12px var(--primary-glow)'
  },
  previewName: {
    fontSize: '1.25rem',
    fontWeight: '850',
    color: 'var(--text-primary)',
    lineHeight: '1.2'
  },
  previewRole: {
    fontSize: '0.8rem',
    fontWeight: '700',
    color: 'var(--primary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginTop: '4px'
  },
  previewDivider: {
    height: '1px',
    background: 'var(--border)',
    margin: '16px 0',
    width: '100%'
  },
  previewDetailsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    width: '100%',
    textAlign: 'left'
  },
  previewSectionHeader: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--primary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '8px',
    width: '100%',
    textAlign: 'left'
  },
  previewAddress: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.4',
    width: '100%',
    textAlign: 'left'
  },
  // Receipt Layout
  receiptCard: {
    width: '100%',
    maxWidth: '540px',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '40px',
    boxShadow: 'var(--shadow-lg)',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  receiptHeader: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  checkIconBox: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'hsl(145, 80%, 96%)',
    color: 'var(--success)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px'
  },
  receiptBody: {
    borderTop: '1px solid var(--border)',
    borderBottom: '1px solid var(--border)',
    padding: '24px 0'
  },
  receiptSectionTitle: {
    fontSize: '1rem',
    fontWeight: '750',
    marginBottom: '14px',
    color: 'var(--text-primary)'
  },
  receiptGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  receiptItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    borderBottom: '1px dotted var(--border)',
    paddingBottom: '6px'
  },
  receiptFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px'
  }
};
