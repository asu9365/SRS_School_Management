import React, { useState, useEffect } from 'react';
import { Plus, Search, FileText, Users, Clock, Check } from 'lucide-react';
import { getAdmissions, createAdmission, updateAdmissionStatus } from '../../lib/api';

const STATUSES = ['Pending', 'Under Review', 'Approved', 'Rejected', 'Enrolled'];
const STATUS_COLORS: any = { 
  Pending: 'bg-amber-100 text-amber-700', 
  'Under Review': 'bg-blue-100 text-blue-700', 
  Approved: 'bg-emerald-100 text-emerald-700', 
  Rejected: 'bg-rose-100 text-rose-700', 
  Enrolled: 'bg-purple-100 text-purple-700' 
};

const SAMPLE: any[] = [
  { id: 1, applicant: 'Rohan Sharma',    class: 'VI',  dob: '2014-03-15', parent: 'Ankit Sharma',    phone: '9876543210', status: 'Pending',       date: '2026-06-25' },
  { id: 2, applicant: 'Priya Borah',     class: 'VIII',dob: '2012-07-22', parent: 'Dilip Borah',     phone: '9876512345', status: 'Approved',      date: '2026-06-20' },
  { id: 3, applicant: 'Amit Das',        class: 'X',   dob: '2010-11-05', parent: 'Sunil Das',       phone: '9876567890', status: 'Under Review',  date: '2026-06-28' },
  { id: 4, applicant: 'Sneha Kalita',    class: 'XI',  dob: '2009-01-12', parent: 'Ranjit Kalita',   phone: '9876598765', status: 'Enrolled',      date: '2026-06-15' },
  { id: 5, applicant: 'Dipjyoti Nath',   class: 'IX',  dob: '2011-09-30', parent: 'Prabin Nath',     phone: '9876534567', status: 'Rejected',      date: '2026-06-10' },
];

export default function AdmissionsManager() {
  const [admissions, setAdmissions] = useState<any[]>(SAMPLE);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ applicant: '', class: 'VI', dob: '', parent: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getAdmissions().then(r => { if (r.success && r.data?.length) setAdmissions(r.data); }).catch(() => {});
  }, []);

  const filtered = admissions.filter(a => {
    const matchSearch = a.applicant.toLowerCase().includes(search.toLowerCase()) || a.parent.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: admissions.length,
    pending: admissions.filter(a => a.status === 'Pending').length,
    approved: admissions.filter(a => a.status === 'Approved').length,
    enrolled: admissions.filter(a => a.status === 'Enrolled').length,
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault(); setLoading(true);
    try {
      const r = await createAdmission({ ...form, status: 'Pending', date: new Date().toISOString().split('T')[0] });
      if (r.success) { 
        setAdmissions(prev => [...prev, r.data]); 
        setMsg('Admission created!'); 
      } else { 
        setAdmissions(prev => [...prev, { id: Date.now(), ...form, status: 'Pending', date: new Date().toISOString().split('T')[0] }]); 
        setMsg('Admission added (offline)!'); 
      }
    } catch { 
      setAdmissions(prev => [...prev, { id: Date.now(), ...form, status: 'Pending', date: new Date().toISOString().split('T')[0] }]); 
      setMsg('Admission added!'); 
    }
    setLoading(false); setShowForm(false); setForm({ applicant: '', class: 'VI', dob: '', parent: '', phone: '' });
    setTimeout(() => setMsg(''), 3000);
  };

  const changeStatus = async (id: number, status: string) => {
    try { await updateAdmissionStatus(id, status); } catch {}
    setAdmissions(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <div className="space-y-6">
      {msg && <div className="fixed top-20 right-6 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-semibold text-sm animate-fade-in-up">{msg}</div>}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Applications', value: stats.total, icon: FileText, color: 'bg-gradient-to-br from-violet-500 to-purple-600' },
          { label: 'Pending Review', value: stats.pending, icon: Clock, color: 'bg-gradient-to-br from-amber-500 to-orange-600' },
          { label: 'Approved', value: stats.approved, icon: Check, color: 'bg-gradient-to-br from-emerald-500 to-teal-600' },
          { label: 'Enrolled', value: stats.enrolled, icon: Users, color: 'bg-gradient-to-br from-indigo-500 to-blue-600' }
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon size={18} className="text-white"/>
              </div>
            </div>
            <div className="text-2xl font-black text-slate-800">{s.value}</div>
            <div className="text-sm text-slate-500 font-medium mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search applicant or parent..." className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"/>
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white">
          <option value="All">All Status</option>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 transition-colors shadow-md shadow-violet-200">
          <Plus size={16}/> New Application
        </button>
      </div>

      {/* New Application Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-violet-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">New Admission Application</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              ['Applicant Name', 'applicant', 'text'],
              ['Date of Birth', 'dob', 'date'],
              ['Parent/Guardian Name', 'parent', 'text'],
              ['Phone Number', 'phone', 'tel']
            ].map(([label, key, type]) => (
              <div key={key}>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">{label}</label>
                <input type={type} required value={(form as any)[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"/>
              </div>
            ))}
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Applying for Class</label>
              <select value={form.class} onChange={e => setForm(p => ({ ...p, class: e.target.value }))} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white">
                {['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'].map(c => <option key={c}>Class {c}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2 flex gap-3 pt-2">
              <button type="submit" disabled={loading} className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-bold transition-colors">{loading ? 'Saving...' : 'Submit Application'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100"><h2 className="text-lg font-bold text-slate-800">Applications ({filtered.length})</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                {['Applicant', 'Class', 'Parent', 'Phone', 'Date', 'Status', 'Actions'].map(h => <th key={h} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400 text-sm">No applications found</td>
                </tr>
              )}
              {filtered.map(a => (
                <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800 text-sm">{a.applicant}</td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{a.class}</td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{a.parent}</td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{a.phone}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{a.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[a.status] || 'bg-slate-100 text-slate-600'}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select value={a.status} onChange={e => changeStatus(a.id, e.target.value)} className="text-xs font-semibold px-2 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-violet-400 cursor-pointer">
                      {STATUSES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
