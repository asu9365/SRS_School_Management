import React, { useState, useEffect } from 'react';
import { Plus, Search, Shield, Users, Key, Edit2, Trash2, Eye, EyeOff, Lock, Unlock } from 'lucide-react';
import { getUsers, createUser, updateUserStatus } from '../../lib/api';

const ROLES = ['Super Admin','Admin','Principal','Teacher','Student','Parent','Staff'];
const SAMPLE_USERS = [
  { id:1, name:'Super Admin',      email:'superadmin@school.com', role:'Super Admin', status:'Active',   last_login:'2026-07-08 09:30', created:'2024-01-01' },
  { id:2, name:'Admin User',       email:'admin@school.com',      role:'Admin',       status:'Active',   last_login:'2026-07-08 10:15', created:'2024-01-05' },
  { id:3, name:'Mr. A. Sharma',    email:'asharma@school.com',    role:'Teacher',     status:'Active',   last_login:'2026-07-07 14:22', created:'2024-03-10' },
  { id:4, name:'Mrs. B. Patel',    email:'bpatel@school.com',     role:'Teacher',     status:'Active',   last_login:'2026-07-08 08:00', created:'2024-03-12' },
  { id:5, name:'Ms. D. Roy',       email:'droy@school.com',       role:'Teacher',     status:'Inactive', last_login:'2026-06-15 11:00', created:'2024-04-01' },
  { id:6, name:'Rahul Sharma',     email:'rahuls@school.com',     role:'Student',     status:'Active',   last_login:'2026-07-08 07:50', created:'2025-06-01' },
  { id:7, name:'Mrs. Sunita Roy',  email:'sroy@school.com',       role:'Parent',      status:'Active',   last_login:'2026-07-05 16:30', created:'2025-06-05' },
];
const SC: any = { Active:'bg-emerald-100 text-emerald-700', Inactive:'bg-rose-100 text-rose-700', Suspended:'bg-amber-100 text-amber-700' };
const RC: any = { 'Super Admin':'bg-rose-100 text-rose-700', Admin:'bg-purple-100 text-purple-700', Principal:'bg-indigo-100 text-indigo-700', Teacher:'bg-blue-100 text-blue-700', Student:'bg-emerald-100 text-emerald-700', Parent:'bg-amber-100 text-amber-700', Staff:'bg-slate-100 text-slate-700' };

export default function UserIdentityManager() {
  const [users, setUsers] = useState<any[]>(SAMPLE_USERS);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', role:'Teacher', password:'' });
  const [showPass, setShowPass] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(()=>{
    getUsers().then(r=>{ if(r.success && r.data?.length) setUsers(r.data); }).catch(()=>{});
  },[]);

  const filtered = users.filter(u=>{
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === 'All' || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const handleCreate = async (e: any) => {
    e.preventDefault();
    const nu = { id:Date.now(), ...form, status:'Active', last_login:'-', created:new Date().toISOString().split('T')[0] };
    try { await createUser(form); } catch {}
    setUsers(p=>[nu,...p]);
    setMsg('User created!'); setShowForm(false); setForm({name:'',email:'',role:'Teacher',password:''});
    setTimeout(()=>setMsg(''),3000);
  };

  const toggleStatus = async (id:number, status:string) => {
    const next = status === 'Active' ? 'Inactive' : 'Active';
    try { await updateUserStatus(id, next); } catch {}
    setUsers(p=>p.map(u=>u.id===id?{...u,status:next}:u));
  };

  const roleCount = ROLES.reduce((a: any,r)=>({...a,[r]:users.filter(u=>u.role===r).length}), {});

  return (
    <div className="space-y-6">
      {msg && <div className="fixed top-20 right-6 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-semibold text-sm">{msg}</div>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{label:'Total Users',value:users.length,icon:Users,color:'bg-gradient-to-br from-slate-700 to-slate-800'},
          {label:'Active Users',value:users.filter(u=>u.status==='Active').length,icon:Shield,color:'bg-gradient-to-br from-emerald-500 to-teal-600'},
          {label:'Roles',value:ROLES.length,icon:Key,color:'bg-gradient-to-br from-violet-500 to-purple-600'},
          {label:'Inactive',value:users.filter(u=>u.status!=='Active').length,icon:Lock,color:'bg-gradient-to-br from-rose-500 to-red-600'},
        ].map((s,i)=>(
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className={"w-10 h-10 rounded-xl flex items-center justify-center mb-3 "+s.color}><s.icon size={18} className="text-white"/></div>
            <div className="text-2xl font-black text-slate-800">{s.value}</div>
            <div className="text-sm text-slate-500 font-medium mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4">Users by Role</h2>
        <div className="flex flex-wrap gap-3">
          {ROLES.map(r=>(
            <div key={r} className="flex items-center gap-2">
              <span className={"px-3 py-1.5 rounded-full text-xs font-bold "+(RC[r]||'bg-slate-100 text-slate-700')}>{r}</span>
              <span className="text-sm font-black text-slate-700">{roleCount[r] || 0}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search users..." className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"/></div>
        <select value={filterRole} onChange={e=>setFilterRole(e.target.value)} className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-500">
          <option value="All">All Roles</option>{ROLES.map(r=><option key={r}>{r}</option>)}
        </select>
        <button onClick={()=>setShowForm(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-slate-800 hover:bg-slate-900 shadow-md"><Plus size={16}/> Create User</button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Create New User</h3>
          <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Full Name</label><input required value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"/></div>
            <div><label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Email</label><input type="email" required value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"/></div>
            <div><label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Role</label><select value={form.role} onChange={e=>setForm(p=>({...p,role:e.target.value}))} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-500">{ROLES.map(r=><option key={r}>{r}</option>)}</select></div>
            <div><label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Password</label><div className="relative"><input type={showPass?'text':'password'} required value={form.password} onChange={e=>setForm(p=>({...p,password:e.target.value}))} className="w-full px-4 py-2.5 pr-10 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"/><button type="button" onClick={()=>setShowPass(p=>!p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">{showPass?<EyeOff size={15}/>:<Eye size={15}/>}</button></div></div>
            <div className="sm:col-span-2 flex gap-3 pt-2">
              <button type="submit" className="px-6 py-2.5 bg-slate-800 text-white rounded-xl text-sm font-bold">Create User</button>
              <button type="button" onClick={()=>setShowForm(false)} className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100"><h2 className="text-lg font-bold text-slate-800">System Users ({filtered.length})</h2></div>
        <div className="overflow-x-auto"><table className="w-full">
          <thead><tr className="bg-slate-50">{['Name','Email','Role','Status','Last Login','Actions'].map(h=><th key={h} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">{filtered.map(u=>(<tr key={u.id} className="hover:bg-slate-50 transition-colors">
            <td className="px-6 py-4 font-semibold text-slate-800 text-sm">{u.name}</td>
            <td className="px-6 py-4 text-slate-500 text-sm">{u.email}</td>
            <td className="px-6 py-4"><span className={"px-2.5 py-1 rounded-full text-xs font-bold "+(RC[u.role]||'bg-slate-100 text-slate-600')}>{u.role}</span></td>
            <td className="px-6 py-4"><span className={"px-2.5 py-1 rounded-full text-xs font-bold "+SC[u.status]}>{u.status}</span></td>
            <td className="px-6 py-4 text-slate-500 text-xs">{u.last_login}</td>
            <td className="px-6 py-4"><div className="flex items-center gap-2">
              <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"><Edit2 size={13}/></button>
              <button onClick={()=>toggleStatus(u.id, u.status)} className={"p-1.5 rounded-lg "+(u.status==='Active'?'text-slate-400 hover:text-rose-600 hover:bg-rose-50':'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50')}>{u.status==='Active'?<Lock size={13}/>:<Unlock size={13}/>}</button>
              <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 size={13}/></button>
            </div></td>
          </tr>))}</tbody>
        </table></div>
      </div>
    </div>
  );
}
