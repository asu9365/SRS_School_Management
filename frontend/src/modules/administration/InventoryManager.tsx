import React, { useState } from 'react';
import { Plus, Search, Package, AlertTriangle, TrendingDown, Edit2, Trash2 } from 'lucide-react';
import { getInventoryItems, createInventoryItem } from '../../lib/api';

const ITEMS = [
  { id:1, name:'Whiteboard Marker (Box)',  category:'Stationery', quantity:45,  min_stock:20, unit:'Box',   location:'Store Room A', status:'Adequate' },
  { id:2, name:'A4 Paper (Ream)',          category:'Stationery', quantity:12,  min_stock:15, unit:'Ream',  location:'Store Room A', status:'Low Stock' },
  { id:3, name:'Projector Lamp',           category:'Electronics',quantity:3,   min_stock:2,  unit:'Nos',   location:'AV Room',      status:'Adequate' },
  { id:4, name:'Desk Chair',              category:'Furniture',  quantity:120, min_stock:50, unit:'Nos',   location:'Warehouse',    status:'Adequate' },
  { id:5, name:'Lab Chemicals (Set)',      category:'Lab',        quantity:2,   min_stock:5,  unit:'Set',   location:'Lab Store',    status:'Critical' },
  { id:6, name:'Sports Kit (Basketball)', category:'Sports',     quantity:8,   min_stock:4,  unit:'Set',   location:'Sports Room',  status:'Adequate' },
  { id:7, name:'First Aid Kit',           category:'Medical',    quantity:4,   min_stock:3,  unit:'Kit',   location:'Admin Office', status:'Adequate' },
];
const SC: any = { Adequate:'bg-emerald-100 text-emerald-700', 'Low Stock':'bg-amber-100 text-amber-700', Critical:'bg-rose-100 text-rose-700' };
const CC: any = { Stationery:'bg-blue-100 text-blue-700', Electronics:'bg-purple-100 text-purple-700', Furniture:'bg-amber-100 text-amber-700', Lab:'bg-cyan-100 text-cyan-700', Sports:'bg-emerald-100 text-emerald-700', Medical:'bg-rose-100 text-rose-700' };

export default function InventoryManager() {
  const [items, setItems] = useState<any[]>(ITEMS);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name:'', category:'Stationery', quantity:'', unit:'', location:'' });
  const [msg, setMsg] = useState('');

  const cats = ['All', ...Array.from(new Set(ITEMS.map(i=>i.category)))];
  const filtered = items.filter(i=>{
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat==='All'||i.category===filterCat;
    return matchSearch && matchCat;
  });

  const handleAdd = async (e: any) => {
    e.preventDefault();
    const qty = Number(form.quantity);
    const newItem = { id:Date.now(), ...form, quantity:qty, min_stock:5, status:qty>10?'Adequate':qty>3?'Low Stock':'Critical' };
    try { await createInventoryItem(newItem); } catch {}
    setItems(p=>[...p, newItem]);
    setMsg('Item added!'); setShowForm(false); setForm({name:'',category:'Stationery',quantity:'',unit:'',location:''});
    setTimeout(()=>setMsg(''),3000);
  };

  return (
    <div className="space-y-6">
      {msg && <div className="fixed top-20 right-6 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-semibold text-sm">{msg}</div>}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{label:'Total Items',value:items.length,icon:Package,color:'bg-gradient-to-br from-orange-500 to-amber-600'},
          {label:'Low Stock',value:items.filter(i=>i.status==='Low Stock').length,icon:TrendingDown,color:'bg-gradient-to-br from-amber-500 to-orange-600'},
          {label:'Critical',value:items.filter(i=>i.status==='Critical').length,icon:AlertTriangle,color:'bg-gradient-to-br from-rose-500 to-red-600'},
          {label:'Categories',value:cats.length-1,icon:Package,color:'bg-gradient-to-br from-indigo-500 to-blue-600'},
        ].map((s,i)=>(
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className={"w-10 h-10 rounded-xl flex items-center justify-center mb-3 "+s.color}><s.icon size={18} className="text-white"/></div>
            <div className="text-2xl font-black text-slate-800">{s.value}</div>
            <div className="text-sm text-slate-500 font-medium mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search items..." className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"/></div>
        <select value={filterCat} onChange={e=>setFilterCat(e.target.value)} className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500">{cats.map(c=><option key={c}>{c}</option>)}</select>
        <button onClick={()=>setShowForm(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-200"><Plus size={16}/> Add Item</button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 border border-orange-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Add Inventory Item</h3>
          <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[['Item Name','name','text'],['Quantity','quantity','number'],['Unit','unit','text'],['Location','location','text']].map(([l,k,t])=>(
              <div key={k}><label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">{l}</label><input type={t} required value={(form as any)[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"/></div>
            ))}
            <div><label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Category</label><select value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500">{['Stationery','Electronics','Furniture','Lab','Sports','Medical'].map(c=><option key={c}>{c}</option>)}</select></div>
            <div className="flex gap-3 items-end">
              <button type="submit" className="px-6 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-bold">Add</button>
              <button type="button" onClick={()=>setShowForm(false)} className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100"><h2 className="text-lg font-bold text-slate-800">Inventory ({filtered.length} items)</h2></div>
        <div className="overflow-x-auto"><table className="w-full">
          <thead><tr className="bg-slate-50">{['Item Name','Category','Quantity','Unit','Location','Status','Actions'].map(h=><th key={h} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">{filtered.map(item=>(<tr key={item.id} className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4 font-semibold text-slate-800 text-sm">{item.name}</td><td className="px-6 py-4"><span className={"px-2 py-0.5 rounded-full text-xs font-bold "+(CC[item.category]||'bg-slate-100 text-slate-600')}>{item.category}</span></td><td className="px-6 py-4 font-bold text-slate-800 text-sm">{item.quantity}</td><td className="px-6 py-4 text-slate-600 text-sm">{item.unit}</td><td className="px-6 py-4 text-slate-600 text-sm">{item.location}</td><td className="px-6 py-4"><span className={"px-2.5 py-1 rounded-full text-xs font-bold "+SC[item.status]}>{item.status}</span></td><td className="px-6 py-4"><div className="flex gap-2"><button className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg"><Edit2 size={14}/></button><button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 size={14}/></button></div></td></tr>))}</tbody>
        </table></div>
      </div>
    </div>
  );
}
