import React, { useState } from 'react';
import { Plus, MapPin, Truck, Users, Search, Edit2, Trash2 } from 'lucide-react';
import { getTransportRoutes, getVehicles } from '../../lib/api';

const ROUTES = [
  { id:1, name:'Route A – North Zone', stops:'Gauhati, Bharalumukh, Ambari, School', distance:'18 km', vehicle:'MH-01-AB-1234', students:28, driver:'Ram Das', status:'Active' },
  { id:2, name:'Route B – South Zone', stops:'Silpukhuri, Lachit Nagar, Pan Bazar, School', distance:'12 km', vehicle:'MH-01-CD-5678', students:35, driver:'Hari Kalita', status:'Active' },
  { id:3, name:'Route C – East Zone', stops:'Narengi, Beltola, Basistha, School', distance:'22 km', vehicle:'MH-01-EF-9012', students:20, driver:'Suresh Nath', status:'Active' },
  { id:4, name:'Route D – West Zone', stops:'Azara, LGBI Airport area, School', distance:'30 km', vehicle:'MH-01-GH-3456', students:15, driver:'Dipak Borah', status:'Inactive' },
];
const VEHICLES = [
  { id:1, reg:'MH-01-AB-1234', type:'School Bus', capacity:40, driver:'Ram Das',    model:'Tata Starbus', year:2020, status:'Active',   fitness:'2027-03' },
  { id:2, reg:'MH-01-CD-5678', type:'School Bus', capacity:50, driver:'Hari Kalita',model:'Ashok Leyland',year:2019, status:'Active',   fitness:'2026-11' },
  { id:3, reg:'MH-01-EF-9012', type:'Mini Bus',   capacity:30, driver:'Suresh Nath',model:'Force Traveller',year:2021,status:'Active',   fitness:'2028-01' },
  { id:4, reg:'MH-01-GH-3456', type:'School Bus', capacity:45, driver:'Dipak Borah',model:'Tata Starbus', year:2018, status:'Inactive', fitness:'2025-08' },
];
const SC: any = { Active:'bg-emerald-100 text-emerald-700', Inactive:'bg-rose-100 text-rose-700' };

export default function TransportManager() {
  const [tab, setTab] = useState<'routes'|'vehicles'>('routes');
  const [search, setSearch] = useState('');

  const filteredRoutes  = ROUTES.filter(r=>r.name.toLowerCase().includes(search.toLowerCase()));
  const filteredVehicles = VEHICLES.filter(v=>v.reg.toLowerCase().includes(search.toLowerCase())||v.driver.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{label:'Total Routes',value:ROUTES.length,icon:MapPin,color:'bg-gradient-to-br from-blue-500 to-indigo-600'},
          {label:'Total Vehicles',value:VEHICLES.length,icon:Truck,color:'bg-gradient-to-br from-emerald-500 to-teal-600'},
          {label:'Students Covered',value:ROUTES.reduce((a,r)=>a+r.students,0),icon:Users,color:'bg-gradient-to-br from-violet-500 to-purple-600'},
          {label:'Active Routes',value:ROUTES.filter(r=>r.status==='Active').length,icon:MapPin,color:'bg-gradient-to-br from-amber-500 to-orange-600'},
        ].map((s,i)=>(
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className={"w-10 h-10 rounded-xl flex items-center justify-center mb-3 "+s.color}><s.icon size={18} className="text-white"/></div>
            <div className="text-2xl font-black text-slate-800">{s.value}</div>
            <div className="text-sm text-slate-500 font-medium mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
        {(['routes','vehicles'] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)} className={"px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all "+(tab===t?'bg-white text-slate-800 shadow':'text-slate-500')}>{t}</button>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={"Search "+tab+"..."} className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/></div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200"><Plus size={16}/> Add {tab === 'routes' ? 'Route' : 'Vehicle'}</button>
      </div>

      {tab==='routes' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100"><h2 className="text-lg font-bold text-slate-800">Transport Routes</h2></div>
          <div className="divide-y divide-slate-100">
            {filteredRoutes.map(r=>(
              <div key={r.id} className="p-5 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-bold text-slate-800">{r.name}</div>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-1"><MapPin size={11}/>{r.stops}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={"px-2.5 py-1 rounded-full text-xs font-bold "+SC[r.status]}>{r.status}</span>
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={14}/></button>
                    <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 size={14}/></button>
                  </div>
                </div>
                <div className="flex gap-6 text-sm">
                  <div><span className="text-slate-400">Distance:</span><span className="ml-1 font-semibold text-slate-700">{r.distance}</span></div>
                  <div><span className="text-slate-400">Vehicle:</span><span className="ml-1 font-semibold text-slate-700">{r.vehicle}</span></div>
                  <div><span className="text-slate-400">Driver:</span><span className="ml-1 font-semibold text-slate-700">{r.driver}</span></div>
                  <div><span className="text-slate-400">Students:</span><span className="ml-1 font-semibold text-slate-700">{r.students}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='vehicles' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100"><h2 className="text-lg font-bold text-slate-800">Fleet Management</h2></div>
          <div className="overflow-x-auto"><table className="w-full">
            <thead><tr className="bg-slate-50">{['Reg No','Type','Model','Capacity','Driver','Fitness Exp','Status'].map(h=><th key={h} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">{filteredVehicles.map(v=>(<tr key={v.id} className="hover:bg-slate-50"><td className="px-6 py-4 font-mono font-bold text-slate-800 text-sm">{v.reg}</td><td className="px-6 py-4 text-slate-600 text-sm">{v.type}</td><td className="px-6 py-4 text-slate-600 text-sm">{v.model}</td><td className="px-6 py-4 text-slate-600 text-sm">{v.capacity} seats</td><td className="px-6 py-4 text-slate-600 text-sm">{v.driver}</td><td className="px-6 py-4 text-slate-600 text-sm">{v.fitness}</td><td className="px-6 py-4"><span className={"px-2.5 py-1 rounded-full text-xs font-bold "+SC[v.status]}>{v.status}</span></td></tr>))}</tbody>
          </table></div>
        </div>
      )}
    </div>
  );
}
