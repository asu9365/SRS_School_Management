import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, UserCheck } from 'lucide-react';
import Toast from '../components/Toast';

export default function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({ username: '', userid: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.userid || !formData.password) {
      setToastType('error');
      setToastMessage('Please enter all required fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.success) {
        setToastType('success');
        setToastMessage('Successfully logged in! Redirecting...');
        
        // Save auth to state and localStorage
        onLoginSuccess({
          username: data.username,
          userid: data.userid,
          role: data.role
        });

        // Delay navigation to let the toast display
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setToastType('error');
        setToastMessage(data.message || 'Authentication failed. Please verify credentials.');
      }
    } catch (err) {
      setToastType('error');
      setToastMessage('Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding" style={styles.section}>
      <div className="container" style={styles.container}>
        <div className="glass-card" style={styles.loginCard}>
          <div style={styles.cardHeader}>
            <div style={styles.iconBox}><Shield size={24} /></div>
            <h1 style={styles.title}>Portal Sign In</h1>
            <p style={styles.subtitle}>Enter your credentials to access St. Robert's School portal</p>
          </div>

          <form onSubmit={handleFormSubmit} style={styles.form}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-input"
                placeholder="e.g., clerk or admin"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="userid">User ID / Code</label>
              <input
                type="text"
                name="userid"
                id="userid"
                className="form-input"
                placeholder="e.g., 101"
                value={formData.userid}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div style={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  style={styles.passwordInput}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.togglePasswordBtn}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={styles.submitBtn}>
              <UserCheck size={18} />
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
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
    background: 'radial-gradient(circle at 90% 10%, hsla(var(--hue), 85%, 57%, 0.04) 0%, transparent 50%), var(--bg-app)',
    minHeight: 'calc(100vh - 70px)',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color var(--transition-normal)'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  loginCard: {
    width: '100%',
    maxWidth: '440px',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '40px 30px',
    boxShadow: 'var(--shadow-lg)',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  cardHeader: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  iconBox: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'var(--primary-glow)',
    color: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px'
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '800',
    color: 'var(--text-primary)'
  },
  subtitle: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.4'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  passwordWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  passwordInput: {
    paddingRight: '48px'
  },
  togglePasswordBtn: {
    position: 'absolute',
    right: '12px',
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  submitBtn: {
    width: '100%',
    padding: '12px',
    marginTop: '16px',
    boxShadow: '0 4px 12px var(--primary-glow)'
  }
};
