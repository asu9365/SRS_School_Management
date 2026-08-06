import React, { useState } from 'react';
import api from '../../lib/api';
import { Sparkles, Copy, Check } from 'lucide-react';

export default function AIReportGenerator({ studentId }: { studentId: string }) {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateComment = async () => {
    setLoading(true);
    setComment('');
    try {
      const response = await api.post(`/ai/student/${studentId}/report-comment`);
      if (response.data.success) {
        setComment(response.data.data);
      }
    } catch (e) {
      console.error("Error generating report comment", e);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(comment);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mt-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <Sparkles className="text-indigo-500" size={18} /> AI Report Card Comment
        </h4>
        <button 
          onClick={generateComment} 
          disabled={loading}
          className="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Auto-Comment'}
        </button>
      </div>
      
      {comment && (
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 relative group">
          <p className="text-sm text-slate-700 dark:text-slate-300 italic">"{comment}"</p>
          <button 
            onClick={handleCopy}
            className="absolute top-2 right-2 p-1.5 bg-white dark:bg-slate-800 rounded-md shadow-sm border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
            title="Copy to clipboard"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}
