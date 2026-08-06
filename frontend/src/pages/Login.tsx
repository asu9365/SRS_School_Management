import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, UserCheck } from 'lucide-react';
import Toast from '../components/Toast';
import api from '../lib/api';
import { useAuthStore } from '../lib/authStore';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setToastType('error');
      setToastMessage('Please enter all required fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/login', formData);
      const data = response.data;

      setToastType('success');
      setToastMessage('Successfully logged in! Redirecting...');
      
      setAuth(data.user, data.access_token);

      const roles = data.user.roles?.map((r: any) => r.name) || [];

      setTimeout(() => {
        if (roles.includes('Super Admin')) {
          navigate('/super-admin');
        } else if (roles.includes('Student')) {
          navigate('/student-portal');
        } else if (roles.includes('Parent')) {
          navigate('/parent-portal');
        } else {
          navigate('/dashboard');
        }
      }, 1000);
    } catch (err: any) {
      setToastType('error');
      setToastMessage(err.response?.data?.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 min-h-[calc(100vh-80px)] relative flex justify-center overflow-hidden pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(249,115,22,0.15)]">
              <Shield size={32} />
            </div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-2 tracking-tight">
              Portal Sign In
            </h1>
            <p className="text-sm text-slate-400">
              Enter your credentials to access St. Robert's School portal
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                placeholder="teacher@schoolos.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors pr-12"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-2"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="w-full flex items-center justify-center gap-2 px-8 py-4 mt-2 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
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
    </div>
  );
}
