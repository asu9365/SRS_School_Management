import React, { useState } from 'react';
import { Plus, CheckCircle, XCircle, Clock, GitBranch, Filter, Eye } from 'lucide-react';
import { getWorkflowRequests, approveWorkflowRequest, rejectWorkflowRequest } from '../../lib/api';

const REQUESTS = [
  { id:1, title:'Leave Application – Mr. C. Das',     type:'Leave',       requester:'Mr. C. Das',     dept:'English',     date:'2026-07-01', status:'Pending',  priority:'Normal' },
  { id:2, title:'Purchase Request – Lab Equipment',   type:'Purchase',    requester:'Mrs. B. Patel',  dept:'Science',     date:'2026-06-30', status:'Approved', priority:'High' },
  { id:3, title:'Room Booking – Science Exhibition',  type:'Room',        requester:'Dr. Singh',      dept:'Biology',     date:'2026-06-28', status:'Pending',  priority:'Low' },
  { id:4, title:'Budget Approval – Sports Day',       type:'Budget',      requester:'Mr. E. Singh',   dept:'PE',          date:'2026-06-25', status:'Rejected', priority:'High' },
  { id:5, title:'Transfer Certificate Request',       type:'TC',          requester:'Admin Office',   dept:'Admin',       date:'2026-07-02', status:'Pending',  priority:'Normal' },
  { id:6, title:'Teacher PD Training Enrolment',      type:'Training',    requester:'Ms. D. Roy',     dept:'Hindi',       date:'2026-07-01', status:'Approved', priority:'Low' },
];
const SC: any = { Pending:'bg-amber-100 text-amber-700', Approved:'bg-emerald-100 text-emerald-700', Rejected:'bg-rose-100 text-rose-700' };
const PC: any = { High:'bg-rose-100 text-rose-700', Normal:'bg-blue-100 text-blue-700', Low:'bg-slate-100 text-slate-600' };
const TC: any = { Leave:'bg-purple-100 text-purple-700', Purchase:'bg-blue-100 text-blue-700', Room:'bg-teal-100 text-teal-700', Budget:'bg-amber-100 text-amber-700', TC:'bg-indigo-100 text-indigo-700', Training:'bg-emerald-100 text-emerald-700' };

export default function WorkflowManager() {
  const [requests, setRequests] = useState<any[]>(REQUESTS);
  const [filter, setFilter] = useState('All');
  const [msg, setMsg] = useState('');

  const counts = { All:requests.length, Pending:requests.filter(r=>r.status==='Pending').length, Approved:requests.filter(r=>r.status==='Approved').length, Rejected:requests.filter(r=>r.status==='Rejected').length };
  const filtered = filter==='All' ? requests : requests.filter(r=>r.status===filter);

  const handleAction = async (id:number, action:'approve'|'reject') => {
    const data = { note: action==='approve'?'Approved by admin':'Rejected by admin' };
    try { action==='approve' ? await approveWorkflowRequest(id, data) : await rejectWorkflowRequest(id, data); } catch {}
    setRequests(p=>p.map(r=>r.id===id?{...r,status:action==='approve'?'Approved':'Rejected'}:r));
    setMsg(action==='approve'?'Request approved!':'Request rejected!');
    setTimeout(()=>setMsg(''),3000);
  };

  return (
    <div className="space-y-6">
      {msg && <div className="fixed top-20 right-6 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-semibold text-sm">{msg}</div>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{label:'All Requests',value:counts.All,icon:GitBranch,color:'bg-gradient-to-br from-cyan-500 to-blue-600'},
          {label:'Pending',value:counts.Pending,icon:Clock,color:'bg-gradient-to-br from-amber-500 to-orange-600'},
          {label:'Approved',value:counts.Approved,icon:CheckCircle,color:'bg-gradient-to-br from-emerald-500 to-teal-600'},
          {label:'Rejected',value:counts.Rejected,icon:XCircle,color:'bg-gradient-to-br from-rose-500 to-red-600'},
        ].map((s,i)=>(
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 cursor-pointer hover:shadow-md transition-all" onClick={()=>setFilter(s.label)}>
            <div className={"w-10 h-10 rounded-xl flex items-center justify-center mb-3 "+s.color}><s.icon size={18} className="text-white"/></div>
            <div className="text-2xl font-black text-slate-800">{s.value}</div>
            <div className="text-sm text-slate-500 font-medium mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
        {['All','Pending','Approved','Rejected'].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} className={"px-4 py-1.5 rounded-lg text-sm font-bold transition-all "+(filter===f?'bg-white text-slate-800 shadow':'text-slate-500')}>{f}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length===0 && <div className="bg-white rounded-2xl p-12 text-center text-slate-400 text-sm shadow-sm border border-slate-100">No {filter.toLowerCase()} requests</div>}
        {filtered.map(r=>(
          <div key={r.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={"px-2 py-0.5 rounded-full text-xs font-bold "+(TC[r.type]||'bg-slate-100 text-slate-600')}>{r.type}</span>
                  <span className={"px-2 py-0.5 rounded-full text-xs font-bold "+PC[r.priority]}>{r.priority} Priority</span>
                </div>
                <div className="font-bold text-slate-800 mb-1">{r.title}</div>
                <div className="text-xs text-slate-500">Requested by <span className="font-semibold text-slate-700">{r.requester}</span> • {r.dept} • {r.date}</div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <span className={"px-2.5 py-1 rounded-full text-xs font-bold "+SC[r.status]}>{r.status}</span>
                {r.status==='Pending' && (
                  <>
                    <button onClick={()=>handleAction(r.id,'approve')} className="flex items-center gap-1 px-3 py-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg text-xs font-bold transition-colors"><CheckCircle size={12}/> Approve</button>
                    <button onClick={()=>handleAction(r.id,'reject')} className="flex items-center gap-1 px-3 py-1.5 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-lg text-xs font-bold transition-colors"><XCircle size={12}/> Reject</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
