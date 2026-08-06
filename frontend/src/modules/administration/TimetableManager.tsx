import React, { useState } from 'react';
import { Plus, Clock, Calendar, BookOpen, Users, Edit2, Trash2 } from 'lucide-react';

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const PERIODS = ['08:00-08:45','08:45-09:30','09:30-10:15','10:30-11:15','11:15-12:00','12:00-12:45','01:30-02:15','02:15-03:00'];
const CLASSES = ['VI-A','VI-B','VII-A','VII-B','VIII-A','IX-A','X-A','X-B','XI-A','XII-A'];

const SAMPLE_TIMETABLE: any = {
  'VI-A': {
    Monday:    ['Mathematics','English','Science','BREAK','Hindi','Social','PE','-'],
    Tuesday:   ['English','Mathematics','Hindi','BREAK','Science','Art','Social','-'],
    Wednesday: ['Science','Hindi','Mathematics','BREAK','English','PE','Social','-'],
    Thursday:  ['Hindi','Science','English','BREAK','Mathematics','Social','Art','-'],
    Friday:    ['Social','Mathematics','PE','BREAK','English','Science','Hindi','-'],
    Saturday:  ['Mathematics','English','-','BREAK','-','-','-','-'],
  }
};

const SUBJ_COLORS: any = {
  Mathematics: 'bg-blue-100 text-blue-800',
  English: 'bg-emerald-100 text-emerald-800',
  Science: 'bg-purple-100 text-purple-800',
  Hindi: 'bg-amber-100 text-amber-800',
  Social: 'bg-orange-100 text-orange-800',
  PE: 'bg-rose-100 text-rose-800',
  Art: 'bg-pink-100 text-pink-800',
  BREAK: 'bg-slate-100 text-slate-500 italic',
  '-': 'bg-white text-slate-300',
};

export default function TimetableManager() {
  const [selectedClass, setSelectedClass] = useState('VI-A');
  const [tab, setTab] = useState<'view'|'manage'>('view');
  const tt = SAMPLE_TIMETABLE[selectedClass] || {};

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{label:'Total Classes',value:CLASSES.length,icon:Users,color:'bg-gradient-to-br from-indigo-500 to-blue-600'},
          {label:'Periods/Day',value:8,icon:Clock,color:'bg-gradient-to-br from-emerald-500 to-teal-600'},
          {label:'School Days',value:6,icon:Calendar,color:'bg-gradient-to-br from-amber-500 to-orange-600'},
          {label:'Subjects',value:8,icon:BookOpen,color:'bg-gradient-to-br from-purple-500 to-pink-600'},
        ].map((s,i)=>(
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className={"w-10 h-10 rounded-xl flex items-center justify-center mb-3 "+s.color}><s.icon size={18} className="text-white"/></div>
            <div className="text-2xl font-black text-slate-800">{s.value}</div>
            <div className="text-sm text-slate-500 font-medium mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          {(['view','manage'] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} className={"px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all "+(tab===t?'bg-white text-slate-800 shadow':'text-slate-500')}>{t === 'view' ? 'View Timetable' : 'Manage'}</button>
          ))}
        </div>
        <select value={selectedClass} onChange={e=>setSelectedClass(e.target.value)} className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500">
          {CLASSES.map(c=><option key={c}>Class {c}</option>)}
        </select>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 ml-auto"><Plus size={16}/> Add Period</button>
      </div>

      {tab === 'view' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div><h2 className="text-lg font-bold text-slate-800">Class {selectedClass} — Weekly Timetable</h2><p className="text-sm text-slate-500">Academic Year 2026-27</p></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-left border-b border-r border-slate-200 w-28">Period</th>
                  {DAYS.map(d=><th key={d} className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center border-b border-slate-200">{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {PERIODS.map((period, pi)=>(
                  <tr key={pi} className="border-b border-slate-100">
                    <td className="p-3 text-xs font-bold text-slate-600 bg-slate-50 border-r border-slate-200 whitespace-nowrap">{period}</td>
                    {DAYS.map(day=>{
                      const subj = (tt[day]||[])[pi] || '-';
                      return (
                        <td key={day} className="p-2 text-center">
                          <span className={"px-2 py-1 rounded-lg text-xs font-semibold "+(SUBJ_COLORS[subj]||'bg-white text-slate-400')}>{subj === '-' ? '—' : subj}</span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'manage' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Class Schedule Configuration</h2>
            <div className="space-y-4">
              {[{cls:'VI-A',teacher:'Mr. A. Sharma',room:'Room 101',students:28},{cls:'VII-A',teacher:'Mrs. B. Patel',room:'Room 201',students:32},{cls:'VIII-A',teacher:'Mr. C. Das',room:'Room 301',students:30},{cls:'IX-A',teacher:'Ms. D. Roy',room:'Room 401',students:26},{cls:'X-A',teacher:'Mr. E. Singh',room:'Room 501',students:29}].map((c,i)=>(
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div>
                    <div className="font-bold text-slate-800 text-sm">Class {c.cls}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Class Teacher: {c.teacher} • {c.room} • {c.students} students</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit2 size={14}/></button>
                    <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 size={14}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Subject-Teacher Assignment</h2>
            <div className="space-y-3">
              {[{subj:'Mathematics',teachers:['Mr. A. Sharma','Mr. D. Borah'],classes:['VI','VII','VIII','IX','X']},{subj:'English',teachers:['Ms. D. Roy','Mrs. C. Kalita'],classes:['VI','VII','VIII','IX','X','XI','XII']},{subj:'Science',teachers:['Mrs. B. Patel','Dr. E. Singh'],classes:['VI','VII','VIII']},{subj:'Physics',teachers:['Dr. F. Das'],classes:['IX','X','XI','XII']},{subj:'Chemistry',teachers:['Mrs. G. Bora'],classes:['IX','X','XI','XII']}].map((s,i)=>(
                <div key={i} className="p-4 border border-slate-100 rounded-xl hover:border-indigo-200 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-slate-800 text-sm">{s.subj}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{s.teachers.join(', ')}</div>
                      <div className="flex flex-wrap gap-1 mt-2">{s.classes.map(c=><span key={c} className="px-1.5 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-semibold">Cl {c}</span>)}</div>
                    </div>
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit2 size={14}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
