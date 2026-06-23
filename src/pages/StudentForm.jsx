import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ArrowLeft, Check, AlertCircle, FileText } from 'lucide-react';
import Toast from '../components/Toast';

export default function StudentForm({ auth }) {
  const [formData, setFormData] = useState({
    Fname: '', Mname: '', Lname: '',
    class: '', rollno: '', caste: '', DOB: '', blood: '',
    Ftname: '', Fcontact: '', Foccupation: '',
    Mtname: '', Mcontact: '', Moccupation: '',
    Gurdian: '', Gcontact: '',
    address: '', POaddress: '', pin: '', Dist: '', State: ''
  });

  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const navigate = useNavigate();

  // Redirect if not logged in
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
      const response = await fetch('/api/students.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.success) {
        setToastType('success');
        setToastMessage('Student registered successfully!');
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
              <p>Student record created with ID: <strong>#{receipt.student_id}</strong></p>
            </div>
            
            <div style={styles.receiptBody}>
              <h4 style={styles.receiptSectionTitle}>Registered Details</h4>
              <div style={styles.receiptGrid}>
                <div style={styles.receiptItem}><span>Student Name:</span> <strong>{`${receipt.Fname} ${receipt.Mname || ''} ${receipt.Lname}`}</strong></div>
                <div style={styles.receiptItem}><span>Class:</span> <strong>{receipt.class}</strong></div>
                <div style={styles.receiptItem}><span>Roll Number:</span> <strong>{receipt.rollno}</strong></div>
                <div style={styles.receiptItem}><span>Blood Group:</span> <strong>{receipt.blood}</strong></div>
                <div style={styles.receiptItem}><span>Date of Birth:</span> <strong>{receipt.DOB}</strong></div>
                <div style={styles.receiptItem}><span>Father's Name:</span> <strong>{receipt.Ftname || 'N/A'}</strong></div>
                <div style={styles.receiptItem}><span>Contact Info:</span> <strong>{receipt.Fcontact || receipt.Mcontact || 'N/A'}</strong></div>
                <div style={styles.receiptItem}><span>Full Address:</span> <strong>{`${receipt.address}, PIN: ${receipt.pin}, ${receipt.Dist}, ${receipt.State}`}</strong></div>
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
        {/* Header Link */}
        <div style={styles.backLinkArea}>
          <Link to="/dashboard" style={styles.backLink}>
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>

        <div style={styles.splitLayout}>
          {/* Form Side */}
          <div className="glass-card" style={styles.formCard}>
            <div style={styles.formHeader}>
              <UserPlus size={24} style={{ color: 'var(--primary)' }} />
              <h2>New Student Registration</h2>
            </div>
            <form onSubmit={handleFormSubmit} style={styles.form}>
              
              {/* Name Details */}
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
                  <label>Class *</label>
                  <input type="text" name="class" placeholder="e.g. 5th Grade" className="form-input" value={formData.class} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Roll No *</label>
                  <input type="number" name="rollno" className="form-input" value={formData.rollno} onChange={handleInputChange} required min="1" />
                </div>
                <div className="form-group">
                  <label>Blood Group *</label>
                  <input type="text" name="blood" placeholder="e.g. A+" className="form-input" value={formData.blood} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Date of Birth *</label>
                  <input type="date" name="DOB" className="form-input" value={formData.DOB} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Caste</label>
                  <input type="text" name="caste" className="form-input" value={formData.caste} onChange={handleInputChange} />
                </div>
              </div>

              {/* Parents Section */}
              <h3 style={{ ...styles.subHeading, marginTop: '30px' }}>Parents / Guardian Details</h3>
              <div className="grid-3">
                <div className="form-group">
                  <label>Father's Name</label>
                  <input type="text" name="Ftname" className="form-input" value={formData.Ftname} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Father's Contact</label>
                  <input type="tel" name="Fcontact" className="form-input" value={formData.Fcontact} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Father's Occupation</label>
                  <input type="text" name="Foccupation" className="form-input" value={formData.Foccupation} onChange={handleInputChange} />
                </div>
              </div>

              <div className="grid-3">
                <div className="form-group">
                  <label>Mother's Name</label>
                  <input type="text" name="Mtname" className="form-input" value={formData.Mtname} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Mother's Contact</label>
                  <input type="tel" name="Mcontact" className="form-input" value={formData.Mcontact} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Mother's Occupation</label>
                  <input type="text" name="Moccupation" className="form-input" value={formData.Moccupation} onChange={handleInputChange} />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label>Guardian Name</label>
                  <input type="text" name="Gurdian" className="form-input" value={formData.Gurdian} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Guardian Contact</label>
                  <input type="tel" name="Gcontact" className="form-input" value={formData.Gcontact} onChange={handleInputChange} />
                </div>
              </div>

              {/* Address Details */}
              <h3 style={{ ...styles.subHeading, marginTop: '30px' }}>Address Details</h3>
              <div className="grid-2">
                <div className="form-group">
                  <label>Village / Town *</label>
                  <input type="text" name="address" className="form-input" value={formData.address} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>P.O. (Post Office)</label>
                  <input type="text" name="POaddress" className="form-input" value={formData.POaddress} onChange={handleInputChange} />
                </div>
              </div>

              <div className="grid-3">
                <div className="form-group">
                  <label>Pin Code *</label>
                  <input type="number" name="pin" className="form-input" value={formData.pin} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>District *</label>
                  <input type="text" name="Dist" className="form-input" value={formData.Dist} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input type="text" name="State" className="form-input" value={formData.State} onChange={handleInputChange} required />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary" style={styles.submitBtn}>
                {loading ? 'Registering Student...' : 'Submit Registration'}
              </button>
            </form>
          </div>

          {/* Interactive Live Card Preview Side */}
          <div style={styles.previewContainer}>
            <div className="glass-card" style={styles.previewCard}>
              <div style={styles.previewCardHeader}>
                <FileText size={18} />
                <h4>Live Registration Card Preview</h4>
              </div>
              <div style={styles.previewCardBody}>
                <div style={styles.previewSchoolName}>St. Robert's High School</div>
                <div style={styles.previewSubName}>Student Registry Card</div>
                
                <div style={styles.previewDivider}></div>
                
                <div style={styles.previewDetailsGrid}>
                  <div><strong>Student Name:</strong> {`${formData.Fname || '---'} ${formData.Mname || ''} ${formData.Lname || '---'}`}</div>
                  <div><strong>Class Assigned:</strong> {formData.class || '---'}</div>
                  <div><strong>Roll Number:</strong> {formData.rollno || '---'}</div>
                  <div><strong>Blood Group:</strong> {formData.blood || '---'}</div>
                  <div><strong>Date of Birth:</strong> {formData.DOB || '---'}</div>
                  <div><strong>Caste Code:</strong> {formData.caste || 'N/A'}</div>
                </div>

                <div style={styles.previewDivider}></div>

                <div style={styles.previewSectionHeader}>Family Contacts</div>
                <div style={styles.previewDetailsGrid}>
                  <div><strong>Father:</strong> {formData.Ftname || 'N/A'}</div>
                  <div><strong>Contact:</strong> {formData.Fcontact || 'N/A'}</div>
                  <div><strong>Mother:</strong> {formData.Mtname || 'N/A'}</div>
                  <div><strong>Contact:</strong> {formData.Mcontact || 'N/A'}</div>
                </div>

                <div style={styles.previewDivider}></div>

                <div style={styles.previewSectionHeader}>Permanent Residence</div>
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
    alignItems: 'flex-start',
    flexWrap: 'wrap'
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
    width: '100%',
    minWidth: '300px'
  },
  previewCard: {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden'
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
    fontSize: '0.85rem'
  },
  previewCardBody: {
    padding: '24px'
  },
  previewSchoolName: {
    fontFamily: 'var(--font-title)',
    fontWeight: '800',
    fontSize: '1.2rem',
    textAlign: 'center',
    color: 'var(--text-primary)',
    lineHeight: '1.1'
  },
  previewSubName: {
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: 'var(--primary)',
    letterSpacing: '0.05em',
    textAlign: 'center',
    marginTop: '4px'
  },
  previewDivider: {
    height: '1px',
    background: 'var(--border)',
    margin: '16px 0'
  },
  previewDetailsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)'
  },
  previewSectionHeader: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--primary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '8px'
  },
  previewAddress: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.4'
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
