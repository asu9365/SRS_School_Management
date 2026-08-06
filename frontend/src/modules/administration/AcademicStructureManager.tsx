import React, { useState } from 'react';
import { Plus, Search, BookOpen, GraduationCap, Layers, Calendar, Edit2, Trash2 } from 'lucide-react';

const SESSIONS = [
  { id: 1, name: '2026-27', status: 'Active', terms: ['Term 1 (Apr-Aug)', 'Term 2 (Sep-Dec)', 'Term 3 (Jan-Mar)'] },
  { id: 2, name: '2025-26', status: 'Completed', terms: ['Term 1', 'Term 2', 'Term 3'] },
];

const CLASSES = [
  { id: 1, name: 'Class VI', sections: ['A', 'B'], subjects: ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies'] },
  { id: 2, name: 'Class VII', sections: ['A', 'B'], subjects: ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies'] },
  { id: 3, name: 'Class VIII', sections: ['A', 'B'], subjects: ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies'] },
  { id: 4, name: 'Class IX', sections: ['A', 'B'], subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'] },
  { id: 5, name: 'Class X', sections: ['A', 'B'], subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'] },
  { id: 6, name: 'Class XI', sections: ['Science A', 'Commerce A', 'Arts A'], subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Computer Science'] },
  { id: 7, name: 'Class XII', sections: ['Science A', 'Commerce A', 'Arts A'], subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Computer Science'] },
];

const SUBJECTS = [
  { id: 1, name: 'Mathematics', code: 'MATH-101', type: 'Core', credit: 4 },
  { id: 2, name: 'Physics', code: 'PHYS-101', type: 'Core', credit: 4 },
  { id: 3, name: 'Chemistry', code: 'CHEM-101', type: 'Core', credit: 4 },
  { id: 4, name: 'Biology', code: 'BIOL-101', type: 'Core', credit: 4 },
  { id: 5, name: 'English', code: 'ENGL-101', type: 'Language', credit: 3 },
  { id: 6, name: 'Hindi', code: 'HIND-101', type: 'Language', credit: 3 },
  { id: 7, name: 'Social Studies', code: 'SST-101', type: 'Core', credit: 3 },
  { id: 8, name: 'Computer Science', code: 'COMP-101', type: 'Elective', credit: 4 },
];

export default function AcademicStructureManager() {
  const [tab, setTab] = useState<'sessions' | 'classes' | 'subjects'>('classes');
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');

  const filteredSubjects = SUBJECTS.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase()));
  const filteredClasses = CLASSES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      {msg && <div className="fixed top-20 right-6 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-semibold text-sm">{msg}</div>}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Session', value: '2026-27', icon: Calendar, color: 'bg-gradient-to-br from-violet-500 to-indigo-600' },
          { label: 'Total Classes', value: CLASSES.length, icon: GraduationCap, color: 'bg-gradient-to-br from-emerald-500 to-teal-600' },
          { label: 'Total Subjects', value: SUBJECTS.length, icon: BookOpen, color: 'bg-gradient-to-br from-amber-500 to-orange-600' },
          { label: 'Academic Terms', value: '3 Terms', icon: Layers, color: 'bg-gradient-to-br from-rose-500 to-pink-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon size={18} className="text-white"/>
            </div>
            <div className="text-2xl font-black text-slate-800">{s.value}</div>
            <div className="text-sm text-slate-500 font-medium mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Navigation tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
        {[
          { id: 'sessions', label: 'Academic Sessions' },
          { id: 'classes', label: 'Classes & Sections' },
          { id: 'subjects', label: 'Subject Database' }
        ].map(t => (
          <button key={t.id} onClick={() => { setTab(t.id as any); setSearch(''); }} className={`px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all ${tab === t.id ? 'bg-white text-slate-800 shadow' : 'text-slate-500 hover:text-slate-700'}`}>{t.label}</button>
        ))}
      </div>

      {/* Search & Actions */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${tab}...`} className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"/>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 shadow-md shadow-violet-200">
          <Plus size={16}/> Add {tab === 'sessions' ? 'Session' : tab === 'classes' ? 'Class' : 'Subject'}
        </button>
      </div>

      {/* Tab Panels */}
      {tab === 'sessions' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100"><h2 className="text-lg font-bold text-slate-800">Academic Sessions</h2></div>
          <div className="divide-y divide-slate-100">
            {SESSIONS.map(s => (
              <div key={s.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-slate-800">Session {s.name}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${s.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{s.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {s.terms.map(t => <span key={t} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold">{t}</span>)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"><Edit2 size={14}/></button>
                  <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"><Trash2 size={14}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'classes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClasses.map(c => (
            <div key={c.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-black text-slate-800">{c.name}</h3>
                  <div className="text-xs text-slate-400 mt-0.5">{c.sections.length} Sections: {c.sections.join(', ')}</div>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg"><Edit2 size={13}/></button>
                  <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 size={13}/></button>
                </div>
              </div>
              <div className="space-y-1.5 mt-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subjects ({c.subjects.length})</div>
                <div className="flex flex-wrap gap-1.5">
                  {c.subjects.map(s => (
                    <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'subjects' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100"><h2 className="text-lg font-bold text-slate-800">Subject Directory ({filteredSubjects.length})</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  {['Code', 'Subject Name', 'Type', 'Credits', 'Actions'].map(h => <th key={h} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSubjects.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono font-bold text-xs text-slate-500">{s.code}</td>
                    <td className="px-6 py-4 font-semibold text-slate-800 text-sm">{s.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${s.type === 'Core' ? 'bg-blue-100 text-blue-700' : s.type === 'Language' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'}`}>{s.type}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-600">{s.credit} Credits</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg"><Edit2 size={13}/></button>
                        <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 size={13}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
