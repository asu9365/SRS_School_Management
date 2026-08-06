import React, { useState } from 'react';
import { Plus, Book, Search, ArrowRight, RotateCcw, BookOpen, Users } from 'lucide-react';
import { getLibraryBooks, getLibraryIssues, issueBook, returnBook } from '../../lib/api';

const BOOKS = [
  { id:1, title:'Mathematics Class X', author:'R.D. Sharma', isbn:'978-81-219-0612-6', category:'Textbook', copies:8, available:5 },
  { id:2, title:'Physics Fundamentals', author:'H.C. Verma', isbn:'978-81-7762-120-0', category:'Textbook', copies:6, available:3 },
  { id:3, title:'English Literature', author:'NCERT', isbn:'978-81-7450-123-4', category:'Textbook', copies:10, available:8 },
  { id:4, title:'Wings of Fire', author:'A.P.J. Abdul Kalam', isbn:'978-81-7371-361-2', category:'Biography', copies:4, available:2 },
  { id:5, title:'The Alchemist', author:'Paulo Coelho', isbn:'978-0-06-231500-7', category:'Fiction', copies:3, available:1 },
  { id:6, title:'General Science', author:'Lakhmir Singh', isbn:'978-81-219-0456-6', category:'Textbook', copies:12, available:9 },
];
const ISSUES = [
  { id:1, book:'Mathematics Class X', student:'Rahul Sharma', cls:'X-A', issue_date:'2026-06-20', due_date:'2026-07-04', status:'Overdue' },
  { id:2, book:'Wings of Fire', student:'Priya Das', cls:'IX-B', issue_date:'2026-06-25', due_date:'2026-07-09', status:'Issued' },
  { id:3, book:'The Alchemist', student:'Amit Kumar', cls:'XI-A', issue_date:'2026-07-01', due_date:'2026-07-15', status:'Issued' },
  { id:4, book:'Physics Fundamentals', student:'Sneha Borah', cls:'XII-B', issue_date:'2026-06-15', due_date:'2026-06-29', status:'Returned' },
];
const SC: any = { Issued:'bg-blue-100 text-blue-700', Overdue:'bg-rose-100 text-rose-700', Returned:'bg-emerald-100 text-emerald-700' };
const CC: any = { Textbook:'bg-indigo-100 text-indigo-700', Biography:'bg-amber-100 text-amber-700', Fiction:'bg-purple-100 text-purple-700' };

export default function LibraryManager() {
  const [tab, setTab] = useState<'books'|'issues'>('books');
  const [search, setSearch] = useState('');
  const [issues, setIssues] = useState<any[]>(ISSUES);

  const filteredBooks  = BOOKS.filter(b=>b.title.toLowerCase().includes(search.toLowerCase())||b.author.toLowerCase().includes(search.toLowerCase()));
  const filteredIssues = issues.filter(i=>i.book.toLowerCase().includes(search.toLowerCase())||i.student.toLowerCase().includes(search.toLowerCase()));
  const totalBooks = BOOKS.reduce((a,b)=>a+b.copies,0);
  const issued = BOOKS.reduce((a,b)=>a+(b.copies-b.available),0);

  const handleReturn = async (id:number) => {
    try { await returnBook(id); } catch {}
    setIssues(prev=>prev.map(i=>i.id===id?{...i,status:'Returned'}:i));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{label:'Total Books',value:totalBooks,icon:Book,color:'bg-gradient-to-br from-purple-500 to-indigo-600'},
          {label:'Books Issued',value:issued,icon:ArrowRight,color:'bg-gradient-to-br from-blue-500 to-cyan-600'},
          {label:'Available',value:totalBooks-issued,icon:BookOpen,color:'bg-gradient-to-br from-emerald-500 to-teal-600'},
          {label:'Overdue',value:issues.filter(i=>i.status==='Overdue').length,icon:Users,color:'bg-gradient-to-br from-rose-500 to-red-600'},
        ].map((s,i)=>(
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className={"w-10 h-10 rounded-xl flex items-center justify-center mb-3 "+s.color}><s.icon size={18} className="text-white"/></div>
            <div className="text-2xl font-black text-slate-800">{s.value}</div>
            <div className="text-sm text-slate-500 font-medium mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
        {(['books','issues'] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)} className={"px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all "+(tab===t?'bg-white text-slate-800 shadow':'text-slate-500')}>{t}</button>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={"Search "+tab+"..."} className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"/></div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-200"><Plus size={16}/> {tab==='books'?'Add Book':'Issue Book'}</button>
      </div>

      {tab==='books' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100"><h2 className="text-lg font-bold text-slate-800">Book Catalogue ({filteredBooks.length})</h2></div>
          <div className="overflow-x-auto"><table className="w-full">
            <thead><tr className="bg-slate-50">{['Title','Author','ISBN','Category','Copies','Available','Status'].map(h=><th key={h} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">{filteredBooks.map(b=>(<tr key={b.id} className="hover:bg-slate-50"><td className="px-6 py-4 font-semibold text-slate-800 text-sm">{b.title}</td><td className="px-6 py-4 text-slate-600 text-sm">{b.author}</td><td className="px-6 py-4 text-slate-400 text-xs font-mono">{b.isbn}</td><td className="px-6 py-4"><span className={"px-2 py-0.5 rounded-full text-xs font-bold "+(CC[b.category]||'bg-slate-100 text-slate-600')}>{b.category}</span></td><td className="px-6 py-4 text-slate-600 text-sm text-center">{b.copies}</td><td className="px-6 py-4 text-center"><span className={b.available>0?'text-emerald-600 font-bold':'text-rose-600 font-bold'}>{b.available}</span></td><td className="px-6 py-4"><span className={"px-2.5 py-1 rounded-full text-xs font-bold "+(b.available>0?'bg-emerald-100 text-emerald-700':'bg-rose-100 text-rose-700')}>{b.available>0?'Available':'All Issued'}</span></td></tr>))}</tbody>
          </table></div>
        </div>
      )}

      {tab==='issues' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100"><h2 className="text-lg font-bold text-slate-800">Book Issues ({filteredIssues.length})</h2></div>
          <div className="overflow-x-auto"><table className="w-full">
            <thead><tr className="bg-slate-50">{['Book','Student','Class','Issue Date','Due Date','Status','Action'].map(h=><th key={h} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">{filteredIssues.map(i=>(<tr key={i.id} className="hover:bg-slate-50"><td className="px-6 py-4 font-semibold text-slate-800 text-sm">{i.book}</td><td className="px-6 py-4 text-slate-600 text-sm">{i.student}</td><td className="px-6 py-4 text-slate-600 text-sm">{i.cls}</td><td className="px-6 py-4 text-slate-500 text-sm">{i.issue_date}</td><td className="px-6 py-4 text-slate-500 text-sm">{i.due_date}</td><td className="px-6 py-4"><span className={"px-2.5 py-1 rounded-full text-xs font-bold "+SC[i.status]}>{i.status}</span></td><td className="px-6 py-4">{i.status!=='Returned'&&<button onClick={()=>handleReturn(i.id)} className="flex items-center gap-1 text-xs font-bold text-purple-600 hover:underline"><RotateCcw size={12}/> Return</button>}</td></tr>))}</tbody>
          </table></div>
        </div>
      )}
    </div>
  );
}
