import React, { useState, useEffect } from 'react';
import { getNotices, createNotice, deleteNotice } from '../../lib/api';
import { Plus, Trash2, Bell } from 'lucide-react';
import Toast from '../../components/Toast';

export default function NoticeManager() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [publishDate, setPublishDate] = useState('');
  
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const fetchNotices = async () => {
    try {
      const data = await getNotices();
      setNotices(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createNotice({
        title,
        content,
        publish_date: publishDate || new Date().toISOString().split('T')[0],
      });
      setToast({ message: 'Notice created successfully', type: 'success' });
      setShowForm(false);
      setTitle('');
      setContent('');
      setPublishDate('');
      fetchNotices();
    } catch (err) {
      setToast({ message: 'Failed to create notice', type: 'error' });
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    try {
      await deleteNotice(id);
      setToast({ message: 'Notice deleted', type: 'success' });
      fetchNotices();
    } catch (err) {
      setToast({ message: 'Failed to delete notice', type: 'error' });
    }
  };

  return (
    <div className="space-y-6">
      {toast.message && <Toast message={toast.message} type={toast.type as any} onClose={() => setToast({ message: '', type: 'success' })} />}
      
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
            <Bell size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">School Notices</h2>
            <p className="text-sm text-slate-500">Manage official announcements</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 text-sm font-medium"
        >
          <Plus size={16} /> {showForm ? 'Cancel' : 'New Notice'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
            <textarea required value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Publish Date (Optional)</label>
            <input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 md:w-1/3" />
          </div>
          <button disabled={loading} type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">
            {loading ? 'Publishing...' : 'Publish Notice'}
          </button>
        </form>
      )}

      <div className="grid gap-4">
        {notices.map((notice: any) => (
          <div key={notice.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-start">
            <div>
              <h3 className="font-bold text-slate-800">{notice.title}</h3>
              <p className="text-slate-600 text-sm mt-1 whitespace-pre-wrap">{notice.content}</p>
              <span className="text-xs font-semibold text-rose-500 mt-3 block">
                Published: {new Date(notice.publish_date || notice.created_at).toLocaleDateString()}
              </span>
            </div>
            <button onClick={() => handleDelete(notice.id)} className="p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-500 rounded-lg transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {notices.length === 0 && !loading && (
          <div className="text-center py-12 text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">
            No notices found. Create one above.
          </div>
        )}
      </div>
    </div>
  );
}
