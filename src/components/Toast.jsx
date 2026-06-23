import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const getTheme = () => {
    switch (type) {
      case 'error':
        return {
          bg: 'hsl(355, 85%, 97%)',
          color: 'var(--error)',
          border: '1px solid hsl(355, 85%, 90%)',
          icon: <AlertCircle size={20} />
        };
      case 'warning':
        return {
          bg: 'hsl(35, 90%, 97%)',
          color: 'var(--warning)',
          border: '1px solid hsl(35, 90%, 90%)',
          icon: <AlertCircle size={20} />
        };
      case 'info':
        return {
          bg: 'hsl(195, 85%, 97%)',
          color: 'var(--info)',
          border: '1px solid hsl(195, 85%, 90%)',
          icon: <Info size={20} />
        };
      case 'success':
      default:
        return {
          bg: 'hsl(145, 80%, 96%)',
          color: 'var(--success)',
          border: '1px solid hsl(145, 80%, 90%)',
          icon: <CheckCircle2 size={20} />
        };
    }
  };

  const theme = getTheme();

  return (
    <div style={{ ...styles.toast, backgroundColor: theme.bg, color: theme.color, border: theme.border }}>
      {theme.icon}
      <span style={styles.message}>{message}</span>
      <button onClick={onClose} style={{ ...styles.closeBtn, color: theme.color }} aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
}

const styles = {
  toast: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 20px',
    borderRadius: '10px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    fontFamily: 'var(--font-body)',
    fontWeight: '500',
    fontSize: '0.9rem'
  },
  message: {
    marginRight: '8px'
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '2px',
    borderRadius: '4px',
    opacity: 0.7,
    transition: 'opacity 0.2s'
  }
};
