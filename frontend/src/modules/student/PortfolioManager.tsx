import React, { useState } from 'react';
import api from '../../lib/api';
import { Plus, Award, Activity, FolderGit2 } from 'lucide-react';

export default function PortfolioManager({ studentId, portfolioItems, isTeacher, onRefresh }: { studentId: string, portfolioItems: any[], isTeacher: boolean, onRefresh: () => void }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ type: 'Achievement', title: '', description: '', date: new Date().toISOString().split('T')[0] });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(`/student-360/${studentId}/portfolio`, form);
      setShowForm(false);
      setForm({ type: 'Achievement', title: '', description: '', date: new Date().toISOString().split('T')[0] });
      onRefresh();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'Achievement': return <Award className="text-amber-500" />;
      case 'Activity': return <Activity className="text-emerald-500" />;
      case 'Project': return <FolderGit2 className="text-indigo-500" />;
      default: return <Award className="text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Achievement Portfolio</h3>
        {isTeacher && (
          <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center gap-2">
            <Plus size={16} /> Add Item
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">Type</label>
              <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800 dark:text-white">
                <option value="Achievement">Achievement / Award</option>
                <option value="Activity">Extracurricular Activity</option>
                <option value="Project">Academic Project</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">Date</label>
              <input type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800 dark:text-white" required />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="e.g. 1st Prize in Science Fair" className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800 dark:text-white" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-800 dark:text-white resize-none" rows={3}></textarea>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium">{loading ? 'Saving...' : 'Save Item'}</button>
          </div>
        </form>
      )}

      {portfolioItems.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          <Award size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
          <p className="text-slate-500 dark:text-slate-400">No portfolio items recorded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolioItems.map((item: any) => (
            <div key={item.id} className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex gap-4 shadow-sm">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg h-fit">
                {getIcon(item.type)}
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">{item.type} &bull; {new Date(item.date).toLocaleDateString()}</div>
                <h4 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-1">{item.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
