import React, { useState, useEffect } from 'react';
import { getUpdates, createUpdate, deleteUpdate } from '../../lib/api';
import { Plus, Trash2, Calendar } from 'lucide-react';
import Toast from '../../components/Toast';

export default function UpdateManager() {
  const [updates, setUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const [content, setContent] = useState('');
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const fetchUpdates = async () => {
    try {
      const data = await getUpdates();
      setUpdates(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUpdate({ content });
      setToast({ message: 'Update posted successfully', type: 'success' });
      setShowForm(false);
      setContent('');
      fetchUpdates();
    } catch (err) {
      setToast({ message: 'Failed to post update', type: 'error' });
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this update?')) return;
    try {
      await deleteUpdate(id);
      setToast({ message: 'Update deleted', type: 'success' });
      fetchUpdates();
    } catch (err) {
      setToast({ message: 'Failed to delete update', type: 'error' });
    }
  };

  return (
    <div className="space-y-6">
      {toast.message && <Toast message={toast.message} type={toast.type as any} onClose={() => setToast({ message: '', type: 'success' })} />}
      
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
            <Calendar size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Class Updates</h2>
            <p className="text-sm text-slate-500">Post daily class updates and activities</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 text-sm font-medium"
        >
          <Plus size={16} /> {showForm ? 'Cancel' : 'New Update'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Update Content</label>
            <textarea required value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="What happened in class today?" />
          </div>
          <button disabled={loading} type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">
            {loading ? 'Posting...' : 'Post Update'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {updates.map((update: any) => (
          <div key={update.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-start border-l-4 border-l-blue-500">
            <div>
              <p className="text-slate-800 font-medium whitespace-pre-wrap">{update.content}</p>
              <span className="text-xs text-slate-400 mt-2 block">
                Posted: {new Date(update.created_at).toLocaleString()}
              </span>
            </div>
            <button onClick={() => handleDelete(update.id)} className="p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-500 rounded-lg transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {updates.length === 0 && !loading && (
          <div className="text-center py-12 text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">
            No updates found.
          </div>
        )}
      </div>
    </div>
  );
}
