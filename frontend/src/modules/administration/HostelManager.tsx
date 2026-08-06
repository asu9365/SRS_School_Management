import React, { useState } from 'react';
import { Plus, Home, Users, Bed, Search, Edit2 } from 'lucide-react';

const ROOMS = [
  { id: 1, number: '101', floor: 1, type: 'Double',   capacity: 2, occupied: 2, students: ['Rahul Sharma', 'Amit Das'],    warden: 'Mr. Singh' },
  { id: 2, number: '102', floor: 1, type: 'Triple',   capacity: 3, occupied: 2, students: ['Priya Borah', 'Sneha Kalita'], warden: 'Mr. Singh' },
  { id: 3, number: '201', floor: 2, type: 'Single',   capacity: 1, occupied: 1, students: ['Dev Kumar'],                  warden: 'Mrs. Patel' },
  { id: 4, number: '202', floor: 2, type: 'Double',   capacity: 2, occupied: 0, students: [],                             warden: 'Mrs. Patel' },
  { id: 5, number: '301', floor: 3, type: 'Dormitory', capacity: 8, occupied: 6, students: ['A', 'B', 'C', 'D', 'E', 'F'],      warden: 'Mr. Borah' },
];
const TC: any = { 
  Single: 'bg-blue-100 text-blue-700', 
  Double: 'bg-indigo-100 text-indigo-700', 
  Triple: 'bg-purple-100 text-purple-700', 
  Dormitory: 'bg-violet-100 text-violet-700' 
};

export default function HostelManager() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'rooms' | 'allocations'>('rooms');
  const filtered = ROOMS.filter(r => r.number.includes(search) || r.warden.toLowerCase().includes(search.toLowerCase()));
  const totalCapacity = ROOMS.reduce((a, r) => a + r.capacity, 0);
  const totalOccupied = ROOMS.reduce((a, r) => a + r.occupied, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Rooms', value: ROOMS.length, icon: Home, color: 'bg-gradient-to-br from-teal-500 to-emerald-600' },
          { label: 'Total Capacity', value: totalCapacity, icon: Bed, color: 'bg-gradient-to-br from-indigo-500 to-blue-600' },
          { label: 'Occupied', value: totalOccupied, icon: Users, color: 'bg-gradient-to-br from-amber-500 to-orange-600' },
          { label: 'Vacant', value: totalCapacity - totalOccupied, icon: Home, color: 'bg-gradient-to-br from-emerald-500 to-teal-600' },
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

      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <div className="mb-3">
          <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider">Occupancy Rate</h3>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${Math.round((totalOccupied / totalCapacity) * 100)}%`, background: 'linear-gradient(90deg,#14b8a6,#0d9488)' }}/>
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-500 font-medium">
          <span>{totalOccupied} occupied</span>
          <span>{Math.round((totalOccupied / totalCapacity) * 100)}% occupancy</span>
          <span>{totalCapacity - totalOccupied} vacant</span>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search rooms..." className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"/>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-200">
          <Plus size={16}/> Add Room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(room => (
          <div key={room.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-lg font-black text-slate-800">Room {room.number}</div>
                <div className="text-xs text-slate-500">Floor {room.floor} • Warden: {room.warden}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${TC[room.type] || 'bg-slate-100 text-slate-600'}`}>
                  {room.type}
                </span>
                <button className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg">
                  <Edit2 size={13}/>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-teal-500" style={{ width: `${Math.round((room.occupied / room.capacity) * 100)}%` }}/>
              </div>
              <span className="text-xs font-bold text-slate-600">{room.occupied}/{room.capacity}</span>
            </div>
            {room.students.length > 0 && <div className="text-xs text-slate-500">{room.students.slice(0, 3).join(', ')}{room.students.length > 3 && ' +more'}</div>}
            {room.occupied < room.capacity && (
              <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                {room.capacity - room.occupied} bed(s) available
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
