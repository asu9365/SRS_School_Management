import React, { useState } from 'react';
import { Star, Award, BookOpen, Clock, TrendingUp, Edit2, Plus, Calendar, Briefcase } from 'lucide-react';
import { getTeacherProfile, updateTeacherProfile, getTeacherPD, addTeacherPD } from '../../lib/api';

const TEACHERS = [
  { id:1, name:'Mr. A. Sharma',   dept:'Mathematics', qualification:'M.Sc., B.Ed', experience:'12 yrs', join_date:'2014-06-01', phone:'9876543210', email:'asharma@school.com', rating:4.8, classes:['IX-A','X-A','XI-A'], specialization:'Calculus, Statistics' },
  { id:2, name:'Mrs. B. Patel',   dept:'Science',     qualification:'M.Sc. Physics, B.Ed', experience:'8 yrs',  join_date:'2018-07-10', phone:'9876512345', email:'bpatel@school.com',  rating:4.5, classes:['IX-B','X-B'],       specialization:'Optics, Mechanics' },
  { id:3, name:'Mr. C. Das',      dept:'English',     qualification:'M.A. English, B.Ed',  experience:'15 yrs', join_date:'2011-06-01', phone:'9876567890', email:'cdas@school.com',    rating:4.9, classes:['VIII-A','IX-A'],    specialization:'Literature, Grammar' },
  { id:4, name:'Ms. D. Roy',      dept:'Hindi',       qualification:'M.A. Hindi, B.Ed',    experience:'5 yrs',  join_date:'2021-06-15', phone:'9876598765', email:'droy@school.com',    rating:4.2, classes:['VI-A','VII-A'],     specialization:'Modern Hindi Poetry' },
  { id:5, name:'Mr. E. Singh',    dept:'Social',      qualification:'M.A. History, B.Ed',  experience:'9 yrs',  join_date:'2017-06-01', phone:'9876534567', email:'esingh@school.com',  rating:4.6, classes:['VIII-B','IX-B'],    specialization:'Modern History, Geography' },
];

const PD_RECORDS = [
  { teacher_id:1, title:'Advanced Calculus Workshop',    date:'2026-05-12', org:'IIT Guwahati',     hours:16, cert:true },
  { teacher_id:1, title:'Digital Assessment Tools',      date:'2026-03-20', org:'CBSE',              hours:8,  cert:true },
  { teacher_id:2, title:'Modern Physics Pedagogy',       date:'2026-04-05', org:'NIT Silchar',       hours:24, cert:false },
  { teacher_id:3, title:'Creative Writing Workshop',     date:'2026-02-14', org:'Sahitya Akademi',   hours:12, cert:true },
];

const PERF = [
  { period:'Jan-Mar 2026', attendance:'98%', classes:52, rating:4.9, remarks:'Excellent' },
  { period:'Apr-Jun 2026', attendance:'96%', classes:48, rating:4.8, remarks:'Excellent' },
  { period:'Jul-Sep 2026', attendance:'',    classes:0,  rating:0,   remarks:'In Progress' },
];

export default function TeacherProfileManager() {
  const [selected, setSelected] = useState<any>(TEACHERS[0]);
  const [tab, setTab] = useState<'profile'|'pd'|'performance'>('profile');
  const [showPDForm, setShowPDForm] = useState(false);
  const [pdForm, setPDForm] = useState({ title:'', date:'', org:'', hours:'' });
  const [pdRecords, setPDRecords] = useState(PD_RECORDS);
  const [msg, setMsg] = useState('');

  const teacherPD = pdRecords.filter(p=>p.teacher_id===selected.id);
  const totalPDHours = teacherPD.reduce((a,p)=>a+p.hours,0);

  const handleAddPD = async (e: any) => {
    e.preventDefault();
    const rec = { teacher_id:selected.id, ...pdForm, hours:Number(pdForm.hours), cert:false };
    try { await addTeacherPD(selected.id, rec); } catch {}
    setPDRecords(p=>[...p, rec]);
    setMsg('PD Record added!'); setShowPDForm(false); setPDForm({title:'',date:'',org:'',hours:''});
    setTimeout(()=>setMsg(''),3000);
  };

  return (
    <div className="space-y-6">
      {msg && <div className="fixed top-20 right-6 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-semibold text-sm">{msg}</div>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{label:'Total Teachers',value:TEACHERS.length,icon:Briefcase,color:'bg-gradient-to-br from-blue-500 to-indigo-600'},
          {label:'Avg Rating',value:'4.6',icon:Star,color:'bg-gradient-to-br from-amber-500 to-orange-600'},
          {label:'Departments',value:5,icon:BookOpen,color:'bg-gradient-to-br from-emerald-500 to-teal-600'},
          {label:'Total PD Hours',value:pdRecords.reduce((a,p)=>a+p.hours,0),icon:Clock,color:'bg-gradient-to-br from-purple-500 to-pink-600'},
        ].map((s,i)=>(
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className={"w-10 h-10 rounded-xl flex items-center justify-center mb-3 "+s.color}><s.icon size={18} className="text-white"/></div>
            <div className="text-2xl font-black text-slate-800">{s.value}</div>
            <div className="text-sm text-slate-500 font-medium mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Teacher List Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-4 border-b border-slate-100"><h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Faculty</h3></div>
          <div className="divide-y divide-slate-100">
            {TEACHERS.map(t=>(
              <button key={t.id} onClick={()=>setSelected(t)} className={"w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors "+(selected.id===t.id?'bg-blue-50 border-l-4 border-blue-500':'')}>
                <div className="font-semibold text-slate-800 text-sm">{t.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{t.dept}</div>
                <div className="flex items-center gap-1 mt-1"><Star size={10} className="text-amber-400 fill-amber-400"/><span className="text-xs font-bold text-slate-600">{t.rating}</span></div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-800">{selected.name}</h2>
                <div className="text-sm text-slate-500 mt-1">{selected.dept} Department • {selected.experience} Experience</div>
                <div className="flex items-center gap-1 mt-2"><Star size={14} className="text-amber-400 fill-amber-400"/><span className="text-sm font-bold text-slate-700">{selected.rating}/5.0</span><span className="text-xs text-slate-400 ml-2">Performance Rating</span></div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700"><Edit2 size={14}/> Edit Profile</button>
            </div>

            <div className="flex gap-1 bg-slate-50 p-1 border-b border-slate-100">
              {([['profile','Profile'],['pd','Professional Dev'],['performance','Performance']] as const).map(([t,l])=>(
                <button key={t} onClick={()=>setTab(t)} className={"px-4 py-2 rounded-lg text-sm font-bold transition-all "+(tab===t?'bg-white text-slate-800 shadow':'text-slate-500 hover:text-slate-700')}>{l}</button>
              ))}
            </div>

            {tab === 'profile' && (
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[['Full Name',selected.name],['Department',selected.dept],['Qualification',selected.qualification],['Experience',selected.experience],['Join Date',selected.join_date],['Phone',selected.phone],['Email',selected.email],['Specialization',selected.specialization]].map(([l,v])=>(
                  <div key={l}><div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{l}</div><div className="font-semibold text-slate-800 text-sm">{v}</div></div>
                ))}
                <div className="sm:col-span-2"><div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Assigned Classes</div><div className="flex flex-wrap gap-2">{selected.classes.map((c: string)=><span key={c} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Class {c}</span>)}</div></div>
              </div>
            )}

            {tab === 'pd' && (
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div><div className="text-sm font-bold text-slate-700">Total PD Hours: <span className="text-blue-600 font-black text-lg">{totalPDHours}</span></div><div className="text-xs text-slate-400">Professional development records for {selected.name}</div></div>
                  <button onClick={()=>setShowPDForm(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700"><Plus size={14}/> Add PD</button>
                </div>
                {showPDForm && (
                  <form onSubmit={handleAddPD} className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    {[['Training Title','title','text'],['Date','date','date'],['Organisation','org','text'],['Hours','hours','number']].map(([l,k,t])=>(
                      <div key={k}><label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">{l}</label><input type={t} required value={(pdForm as any)[k]} onChange={e=>setPDForm(p=>({...p,[k]:e.target.value}))} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/></div>
                    ))}
                    <div className="sm:col-span-2 flex gap-3"><button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold">Add</button><button type="button" onClick={()=>setShowPDForm(false)} className="px-5 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold">Cancel</button></div>
                  </form>
                )}
                <div className="space-y-3">
                  {teacherPD.length === 0 && <div className="text-center py-8 text-slate-400 text-sm">No PD records yet</div>}
                  {teacherPD.map((p,i)=>(
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div><div className="font-semibold text-slate-800 text-sm">{p.title}</div><div className="text-xs text-slate-500 mt-0.5">{p.org} • {p.date} • {p.hours} hours</div></div>
                      {p.cert && <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold flex items-center gap-1"><Award size={11}/> Certified</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'performance' && (
              <div className="p-6 space-y-4">
                <div className="overflow-x-auto"><table className="w-full">
                  <thead><tr className="bg-slate-50">{['Period','Attendance','Classes Taken','Rating','Status'].map(h=><th key={h} className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>)}</tr></thead>
                  <tbody className="divide-y divide-slate-100">{PERF.map((p,i)=>(
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-semibold text-slate-800 text-sm">{p.period}</td>
                      <td className="px-4 py-3 font-bold text-slate-700 text-sm">{p.attendance || '-'}</td>
                      <td className="px-4 py-3 text-slate-600 text-sm">{p.classes || '-'}</td>
                      <td className="px-4 py-3">{p.rating > 0 ? <div className="flex items-center gap-1"><Star size={12} className="text-amber-400 fill-amber-400"/><span className="text-sm font-bold">{p.rating}</span></div> : <span className="text-slate-400 text-sm">-</span>}</td>
                      <td className="px-4 py-3"><span className={"px-2.5 py-1 rounded-full text-xs font-bold "+(p.remarks==='Excellent'?'bg-emerald-100 text-emerald-700':p.remarks==='In Progress'?'bg-amber-100 text-amber-700':'bg-slate-100 text-slate-600')}>{p.remarks}</span></td>
                    </tr>
                  ))}</tbody>
                </table></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  {[['Teaching Style','Engaging & Student-Centered'],['Student Feedback Score','4.7/5.0'],['Parent Feedback','4.5/5.0']].map(([l,v])=>(
                    <div key={l} className="bg-blue-50 rounded-xl p-4 border border-blue-100"><div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">{l}</div><div className="font-black text-slate-800">{v}</div></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
