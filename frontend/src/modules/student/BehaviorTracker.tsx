import React, { useState } from 'react';
import api from '../../lib/api';
import { Plus, ThumbsUp, AlertTriangle } from 'lucide-react';

export default function BehaviorTracker({ studentId, records, isTeacher, onRefresh }: { studentId: string, records: any[], isTeacher: boolean, onRefresh: () => void }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'Positive', description: '', date: new Date().toISOString().split('T')[0] });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`/student-360/${studentId}/behavior`, form);
      setShowForm(false);
      setForm({ type: 'Positive', description: '', date: new Date().toISOString().split('T')[0] });
      onRefresh();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Behavioral Records</h3>
        {isTeacher && (
          <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center gap-2">
            <Plus size={16} /> Record Event
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">Type</label>
              <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800 dark:text-white">
                <option value="Positive">Positive / Praise</option>
                <option value="Needs Improvement">Needs Improvement</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">Date</label>
              <input type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800 dark:text-white" required />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">Observation / Description</label>
            <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800 dark:text-white resize-none" rows={3} required></textarea>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium">{loading ? 'Saving...' : 'Save Record'}</button>
          </div>
        </form>
      )}

      {records.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          <ThumbsUp size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
          <p className="text-slate-500 dark:text-slate-400">No behavioral records have been added.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((item: any) => (
            <div key={item.id} className={`p-4 border rounded-xl flex gap-4 shadow-sm ${item.type === 'Positive' ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-800/30' : 'bg-rose-50 dark:bg-rose-900/10 border-rose-100 dark:border-rose-800/30'}`}>
              <div className={`p-3 rounded-lg h-fit ${item.type === 'Positive' ? 'bg-emerald-100 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-300' : 'bg-rose-100 dark:bg-rose-800 text-rose-600 dark:text-rose-300'}`}>
                {item.type === 'Positive' ? <ThumbsUp size={24} /> : <AlertTriangle size={24} />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-sm font-bold ${item.type === 'Positive' ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>{item.type}</span>
                  <span className="text-xs text-slate-500">&bull; {new Date(item.date).toLocaleDateString()}</span>
                  <span className="text-xs text-slate-400">&bull; by {item.teacher?.Name || item.teacher?.name || 'Teacher'}</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
