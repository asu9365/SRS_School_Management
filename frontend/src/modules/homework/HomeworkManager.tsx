import React, { useState, useEffect } from 'react';
import { getHomework, createHomework, deleteHomework } from '../../lib/api';
import { Plus, Trash2, BookOpen } from 'lucide-react';
import Toast from '../../components/Toast';

export default function HomeworkManager() {
  const [homework, setHomework] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const fetchHomework = async () => {
    try {
      const data = await getHomework();
      setHomework(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHomework();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createHomework({
        subject,
        title,
        description,
        due_date: dueDate,
      });
      setToast({ message: 'Homework created successfully', type: 'success' });
      setShowForm(false);
      setSubject('');
      setTitle('');
      setDescription('');
      setDueDate('');
      fetchHomework();
    } catch (err) {
      setToast({ message: 'Failed to create homework', type: 'error' });
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this homework?')) return;
    try {
      await deleteHomework(id);
      setToast({ message: 'Homework deleted', type: 'success' });
      fetchHomework();
    } catch (err) {
      setToast({ message: 'Failed to delete homework', type: 'error' });
    }
  };

  return (
    <div className="space-y-6">
      {toast.message && <Toast message={toast.message} type={toast.type as any} onClose={() => setToast({ message: '', type: 'success' })} />}
      
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
            <BookOpen size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Homework Assignments</h2>
            <p className="text-sm text-slate-500">Manage class assignments and due dates</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 text-sm font-medium"
        >
          <Plus size={16} /> {showForm ? 'Cancel' : 'New Homework'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
              <input required type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Mathematics" className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
              <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Chapter 4 Exercises" className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-orange-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
            <input required type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 md:w-1/3" />
          </div>
          <button disabled={loading} type="submit" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">
            {loading ? 'Assigning...' : 'Assign Homework'}
          </button>
        </form>
      )}

      <div className="grid gap-4">
        {homework.map((hw: any) => (
          <div key={hw.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-500 mb-1 block">
                {hw.subject}
              </span>
              <h3 className="font-bold text-slate-800 text-lg">{hw.title}</h3>
              <p className="text-slate-600 text-sm mt-1 whitespace-pre-wrap">{hw.description}</p>
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-rose-100 text-rose-700">
                Due: {new Date(hw.due_date).toLocaleDateString()}
              </div>
            </div>
            <button onClick={() => handleDelete(hw.id)} className="p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-500 rounded-lg transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        {homework.length === 0 && !loading && (
          <div className="text-center py-12 text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">
            No homework assignments found.
          </div>
        )}
      </div>
    </div>
  );
}
