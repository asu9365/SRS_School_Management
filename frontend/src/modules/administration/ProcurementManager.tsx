import React, { useState } from 'react';
import { Plus, Search, ShoppingCart, CheckCircle, Clock, Building, Edit2, Star } from 'lucide-react';
import { getVendors, getPurchaseOrders, approvePurchaseOrder } from '../../lib/api';

const VENDORS = [
  { id:1, name:'Tech Supplies India',   category:'Electronics', contact:'9876543210', email:'tech@supplies.in',   rating:4.5, orders:12, status:'Active' },
  { id:2, name:'Edu Books Pvt Ltd',     category:'Books',       contact:'9876512345', email:'books@edupvt.com',   rating:4.8, orders:28, status:'Active' },
  { id:3, name:'Lab Equipment Co.',     category:'Lab',         contact:'9876567890', email:'lab@equip.co.in',    rating:4.2, orders:6,  status:'Active' },
  { id:4, name:'Office Essentials',     category:'Stationery',  contact:'9876598765', email:'office@essentials.in',rating:3.9,orders:45, status:'Active' },
  { id:5, name:'Sports World',          category:'Sports',      contact:'9876534567', email:'sports@world.in',    rating:4.6, orders:8,  status:'Inactive' },
];
const ORDERS = [
  { id:1, item:'Science Lab Microscopes', vendor:'Lab Equipment Co.', qty:5,   amount:45000, date:'2026-07-01', status:'Pending',  category:'Lab' },
  { id:2, item:'NCERT Textbooks Set',     vendor:'Edu Books Pvt Ltd', qty:200, amount:80000, date:'2026-06-28', status:'Approved', category:'Books' },
  { id:3, item:'Projector Screens',       vendor:'Tech Supplies India',qty:3,  amount:21000, date:'2026-06-25', status:'Received', category:'Electronics' },
  { id:4, item:'Stationery Bundle',       vendor:'Office Essentials', qty:50,  amount:15000, date:'2026-07-02', status:'Pending',  category:'Stationery' },
];
const SC: any = { Pending:'bg-amber-100 text-amber-700', Approved:'bg-blue-100 text-blue-700', Received:'bg-emerald-100 text-emerald-700', Rejected:'bg-rose-100 text-rose-700' };
const VS: any = { Active:'bg-emerald-100 text-emerald-700', Inactive:'bg-slate-100 text-slate-600' };

export default function ProcurementManager() {
  const [tab, setTab] = useState<'orders'|'vendors'>('orders');
  const [orders, setOrders] = useState<any[]>(ORDERS);
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');

  const filteredOrders  = orders.filter(o=>o.item.toLowerCase().includes(search.toLowerCase())||o.vendor.toLowerCase().includes(search.toLowerCase()));
  const filteredVendors = VENDORS.filter(v=>v.name.toLowerCase().includes(search.toLowerCase()));
  const totalPending = orders.filter(o=>o.status==='Pending').reduce((a,o)=>a+o.amount,0);

  const handleApprove = async (id:number) => {
    try { await approvePurchaseOrder(id); } catch {}
    setOrders(p=>p.map(o=>o.id===id?{...o,status:'Approved'}:o));
    setMsg('Purchase order approved!'); setTimeout(()=>setMsg(''),3000);
  };

  return (
    <div className="space-y-6">
      {msg && <div className="fixed top-20 right-6 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-semibold text-sm">{msg}</div>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{label:'Total Vendors',value:VENDORS.length,icon:Building,color:'bg-gradient-to-br from-rose-500 to-pink-600'},
          {label:'Active Orders',value:orders.length,icon:ShoppingCart,color:'bg-gradient-to-br from-blue-500 to-indigo-600'},
          {label:'Pending Approval',value:orders.filter(o=>o.status==='Pending').length,icon:Clock,color:'bg-gradient-to-br from-amber-500 to-orange-600'},
          {label:'Pending Value',value:'Rs '+totalPending.toLocaleString(),icon:CheckCircle,color:'bg-gradient-to-br from-emerald-500 to-teal-600'},
        ].map((s,i)=>(
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className={"w-10 h-10 rounded-xl flex items-center justify-center mb-3 "+s.color}><s.icon size={18} className="text-white"/></div>
            <div className="text-2xl font-black text-slate-800">{s.value}</div>
            <div className="text-sm text-slate-500 font-medium mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
        {(['orders','vendors'] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)} className={"px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all "+(tab===t?'bg-white text-slate-800 shadow':'text-slate-500')}>{t}</button>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={"Search "+tab+"..."} className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"/></div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-200"><Plus size={16}/> {tab==='orders'?'New Order':'Add Vendor'}</button>
      </div>

      {tab==='orders' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100"><h2 className="text-lg font-bold text-slate-800">Purchase Orders ({filteredOrders.length})</h2></div>
          <div className="overflow-x-auto"><table className="w-full">
            <thead><tr className="bg-slate-50">{['Item','Vendor','Qty','Amount','Date','Status','Action'].map(h=><th key={h} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">{filteredOrders.map(o=>(<tr key={o.id} className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4 font-semibold text-slate-800 text-sm">{o.item}</td><td className="px-6 py-4 text-slate-600 text-sm">{o.vendor}</td><td className="px-6 py-4 text-slate-600 text-sm">{o.qty}</td><td className="px-6 py-4 font-bold text-slate-800 text-sm">Rs {o.amount.toLocaleString()}</td><td className="px-6 py-4 text-slate-500 text-sm">{o.date}</td><td className="px-6 py-4"><span className={"px-2.5 py-1 rounded-full text-xs font-bold "+SC[o.status]}>{o.status}</span></td><td className="px-6 py-4">{o.status==='Pending'&&<button onClick={()=>handleApprove(o.id)} className="flex items-center gap-1 px-3 py-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg text-xs font-bold"><CheckCircle size={12}/> Approve</button>}</td></tr>))}</tbody>
          </table></div>
        </div>
      )}

      {tab==='vendors' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100"><h2 className="text-lg font-bold text-slate-800">Vendor Directory ({filteredVendors.length})</h2></div>
          <div className="overflow-x-auto"><table className="w-full">
            <thead><tr className="bg-slate-50">{['Vendor','Category','Contact','Rating','Orders','Status'].map(h=><th key={h} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">{filteredVendors.map(v=>(<tr key={v.id} className="hover:bg-slate-50"><td className="px-6 py-4 font-semibold text-slate-800 text-sm">{v.name}</td><td className="px-6 py-4 text-slate-600 text-sm">{v.category}</td><td className="px-6 py-4 text-slate-600 text-sm">{v.contact}</td><td className="px-6 py-4"><div className="flex items-center gap-1"><Star size={12} className="text-amber-400 fill-amber-400"/><span className="text-sm font-bold text-slate-700">{v.rating}</span></div></td><td className="px-6 py-4 text-slate-600 text-sm">{v.orders}</td><td className="px-6 py-4"><span className={"px-2.5 py-1 rounded-full text-xs font-bold "+VS[v.status]}>{v.status}</span></td></tr>))}</tbody>
          </table></div>
        </div>
      )}
    </div>
  );
}
