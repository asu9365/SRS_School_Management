import React, { useState, useEffect } from 'react';
import { Plus, Search, CheckCircle, Clock, AlertTriangle, Download, DollarSign } from 'lucide-react';
import { getFeePayments, getFeeStructures, recordFeePayment } from '../../lib/api';

const SAMPLE_STRUCTURES = [
  { id:1, name:'Tuition Fee', cls:'All Classes', amount:5000, frequency:'Monthly', due:5 },
  { id:2, name:'Lab Fee', cls:'IX-XII', amount:2000, frequency:'Quarterly', due:10 },
  { id:3, name:'Sports Fee', cls:'All Classes', amount:500, frequency:'Annual', due:15 },
  { id:4, name:'Library Fee', cls:'All Classes', amount:300, frequency:'Annual', due:15 },
  { id:5, name:'Transport Fee', cls:'All Classes', amount:1500, frequency:'Monthly', due:5 },
];
const SAMPLE_PAYMENTS = [
  { id:1, student:'Rahul Sharma',  cls:'X-A',  fee:'Tuition Fee', amount:5000, date:'2026-07-01', status:'Paid',    receipt:'RCP001' },
  { id:2, student:'Priya Das',     cls:'IX-B', fee:'Tuition Fee', amount:5000, date:'2026-07-03', status:'Paid',    receipt:'RCP002' },
  { id:3, student:'Amit Kumar',    cls:'XI-A', fee:'Lab Fee',     amount:2000, date:'',           status:'Pending', receipt:'' },
  { id:4, student:'Sneha Borah',   cls:'VIII', fee:'Transport',   amount:1500, date:'2026-07-02', status:'Paid',    receipt:'RCP004' },
  { id:5, student:'Dev Singh',     cls:'XII-B',fee:'Tuition Fee', amount:5000, date:'',           status:'Overdue', receipt:'' },
];
const SC: any = { Paid:'bg-emerald-100 text-emerald-700', Pending:'bg-amber-100 text-amber-700', Overdue:'bg-rose-100 text-rose-700' };

export default function FeeManager() {
  const [structures] = useState<any[]>(SAMPLE_STRUCTURES);
  const [payments, setPayments] = useState<any[]>(SAMPLE_PAYMENTS);
  const [tab, setTab] = useState<'payments'|'structures'>('payments');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ student:'', cls:'X-A', fee:'Tuition Fee', amount:'' });
  const [msg, setMsg] = useState('');

  const collected = payments.filter(p=>p.status==='Paid').reduce((a,p)=>a+p.amount,0);
  const pending   = payments.filter(p=>p.status==='Pending').reduce((a,p)=>a+p.amount,0);
  const overdue   = payments.filter(p=>p.status==='Overdue').reduce((a,p)=>a+p.amount,0);
  const filtered  = payments.filter(p=>p.student.toLowerCase().includes(search.toLowerCase()));

  const handlePayment = async (e: any) => {
    e.preventDefault();
    const pay = { id:Date.now(), ...form, amount:Number(form.amount), date:new Date().toISOString().split('T')[0], status:'Paid', receipt:'RCP'+Date.now().toString().slice(-4) };
    try { await recordFeePayment(pay); } catch {}
    setPayments(p=>[...p, pay]);
    setMsg('Payment recorded!'); setShowForm(false); setForm({student:'',cls:'X-A',fee:'Tuition Fee',amount:''});
    setTimeout(()=>setMsg(''),3000);
  };

  return (
    <div className="space-y-6">
      {msg && <div className="fixed top-20 right-6 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-semibold text-sm">{msg}</div>}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{label:'Collected',value:'Rs '+collected.toLocaleString(),icon:CheckCircle,color:'bg-gradient-to-br from-emerald-500 to-teal-600'},
          {label:'Pending',value:'Rs '+pending.toLocaleString(),icon:Clock,color:'bg-gradient-to-br from-amber-500 to-orange-600'},
          {label:'Overdue',value:'Rs '+overdue.toLocaleString(),icon:AlertTriangle,color:'bg-gradient-to-br from-rose-500 to-red-600'},
          {label:'Students',value:payments.length,icon:DollarSign,color:'bg-gradient-to-br from-indigo-500 to-blue-600'},
        ].map((s,i)=>(
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className={"w-10 h-10 rounded-xl flex items-center justify-center mb-3 "+s.color}><s.icon size={18} className="text-white"/></div>
            <div className="text-2xl font-black text-slate-800">{s.value}</div>
            <div className="text-sm text-slate-500 font-medium mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
        {(['payments','structures'] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)} className={"px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all "+(tab===t?'bg-white text-slate-800 shadow':'text-slate-500 hover:text-slate-700')}>{t}</button>
        ))}
      </div>

      {tab==='payments' && (
        <>
          <div className="flex gap-3">
            <div className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search student..." className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"/></div>
            <button onClick={()=>setShowForm(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-200"><Plus size={16}/> Record Payment</button>
          </div>
          {showForm && (
            <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Record Fee Payment</h3>
              <form onSubmit={handlePayment} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Student Name</label><input required value={form.student} onChange={e=>setForm(p=>({...p,student:e.target.value}))} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"/></div>
                <div><label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Amount (Rs)</label><input type="number" required value={form.amount} onChange={e=>setForm(p=>({...p,amount:e.target.value}))} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"/></div>
                <div><label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Fee Type</label><select value={form.fee} onChange={e=>setForm(p=>({...p,fee:e.target.value}))} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500">{structures.map(s=><option key={s.id}>{s.name}</option>)}</select></div>
                <div className="flex gap-3 items-end">
                  <button type="submit" className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold">Record</button>
                  <button type="button" onClick={()=>setShowForm(false)} className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold">Cancel</button>
                </div>
              </form>
            </div>
          )}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between"><h2 className="text-lg font-bold text-slate-800">Payments ({filtered.length})</h2><button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"><Download size={14}/> Export</button></div>
            <div className="overflow-x-auto"><table className="w-full">
              <thead><tr className="bg-slate-50">{['Student','Class','Fee Type','Amount','Date','Status','Receipt'].map(h=><th key={h} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-slate-100">{filtered.map(p=>(<tr key={p.id} className="hover:bg-slate-50"><td className="px-6 py-4 font-semibold text-slate-800 text-sm">{p.student}</td><td className="px-6 py-4 text-slate-600 text-sm">{p.cls}</td><td className="px-6 py-4 text-slate-600 text-sm">{p.fee}</td><td className="px-6 py-4 font-bold text-slate-800 text-sm">Rs {p.amount.toLocaleString()}</td><td className="px-6 py-4 text-slate-500 text-sm">{p.date||'-'}</td><td className="px-6 py-4"><span className={"px-2.5 py-1 rounded-full text-xs font-bold "+SC[p.status]}>{p.status}</span></td><td className="px-6 py-4 text-slate-500 text-sm font-mono text-xs">{p.receipt||'-'}</td></tr>))}</tbody>
            </table></div>
          </div>
        </>
      )}

      {tab==='structures' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between"><h2 className="text-lg font-bold text-slate-800">Fee Structures</h2><button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600"><Plus size={14}/> Add Structure</button></div>
          <div className="overflow-x-auto"><table className="w-full">
            <thead><tr className="bg-slate-50">{['Fee Name','Applicable','Amount','Frequency','Due'].map(h=><th key={h} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">{structures.map(s=>(<tr key={s.id} className="hover:bg-slate-50"><td className="px-6 py-4 font-semibold text-slate-800 text-sm">{s.name}</td><td className="px-6 py-4 text-slate-600 text-sm">{s.cls}</td><td className="px-6 py-4 font-bold text-emerald-700 text-sm">Rs {s.amount.toLocaleString()}</td><td className="px-6 py-4"><span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">{s.frequency}</span></td><td className="px-6 py-4 text-slate-600 text-sm">Day {s.due}</td></tr>))}</tbody>
          </table></div>
        </div>
      )}
    </div>
  );
}
