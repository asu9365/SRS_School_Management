import React, { useState } from 'react';
import { Upload, FileText, File, Download, Trash2, Search, Eye, FolderOpen } from 'lucide-react';

const DOCS = [
  { id:1, name:'School Registration Certificate.pdf',  category:'Legal',     size:'2.4 MB',  date:'2024-01-15', uploaded_by:'Admin', type:'pdf' },
  { id:2, name:'Annual Report 2025-26.pdf',             category:'Reports',   size:'8.1 MB',  date:'2026-06-30', uploaded_by:'Principal', type:'pdf' },
  { id:3, name:'Staff Attendance June 2026.xlsx',       category:'HR',        size:'156 KB',  date:'2026-07-01', uploaded_by:'HR Staff', type:'xlsx' },
  { id:4, name:'Fee Structure 2026-27.pdf',             category:'Finance',   size:'320 KB',  date:'2026-04-01', uploaded_by:'Accountant', type:'pdf' },
  { id:5, name:'Student Admission Form Template.docx',  category:'Academic',  size:'45 KB',   date:'2026-06-01', uploaded_by:'Admin', type:'docx' },
  { id:6, name:'Sports Day Photos.zip',                 category:'Events',    size:'234 MB',  date:'2026-05-15', uploaded_by:'PE Teacher', type:'zip' },
  { id:7, name:'Lab Safety Guidelines.pdf',             category:'Academic',  size:'1.2 MB',  date:'2026-03-10', uploaded_by:'Science Dept', type:'pdf' },
];
const CC: any = { Legal:'bg-rose-100 text-rose-700', Reports:'bg-indigo-100 text-indigo-700', HR:'bg-purple-100 text-purple-700', Finance:'bg-emerald-100 text-emerald-700', Academic:'bg-blue-100 text-blue-700', Events:'bg-amber-100 text-amber-700' };
const FI: any = { pdf:<FileText size={16} className="text-rose-500"/>, xlsx:<File size={16} className="text-emerald-500"/>, docx:<File size={16} className="text-blue-500"/>, zip:<FolderOpen size={16} className="text-amber-500"/> };

export default function DocumentManager() {
  const [docs, setDocs] = useState<any[]>(DOCS);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [msg, setMsg] = useState('');

  const cats = ['All', ...Array.from(new Set(DOCS.map(d=>d.category)))];
  const filtered = docs.filter(d=>{
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat==='All'||d.category===filterCat;
    return matchSearch && matchCat;
  });

  const handleUpload = (e: any) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file: any) => {
      const ext = file.name.split('.').pop() || 'pdf';
      const newDoc = { id: Date.now()+Math.random(), name: file.name, category:'Uncategorized', size: (file.size/1024).toFixed(0)+' KB', date: new Date().toISOString().split('T')[0], uploaded_by:'Current User', type:ext };
      setDocs(p=>[newDoc,...p]);
    });
    setMsg('Document(s) uploaded!'); setTimeout(()=>setMsg(''),3000);
  };

  const handleDelete = (id: any) => setDocs(p=>p.filter(d=>d.id!==id));

  return (
    <div className="space-y-6">
      {msg && <div className="fixed top-20 right-6 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-semibold text-sm">{msg}</div>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[{label:'Total Documents',value:docs.length},{label:'PDF Files',value:docs.filter(d=>d.type==='pdf').length},{label:'Spreadsheets',value:docs.filter(d=>d.type==='xlsx').length},{label:'Categories',value:cats.length-1}].map((s,i)=>(
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className="text-2xl font-black text-slate-800">{s.value}</div>
            <div className="text-sm text-slate-500 font-medium mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 border-2 border-dashed border-slate-200 hover:border-slate-400 transition-colors text-center cursor-pointer relative">
        <input type="file" multiple onChange={handleUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"/>
        <Upload size={32} className="text-slate-400 mx-auto mb-2"/>
        <div className="text-sm font-bold text-slate-600">Drop files here or click to upload</div>
        <div className="text-xs text-slate-400 mt-1">PDF, DOCX, XLSX, ZIP supported</div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search documents..." className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"/></div>
        <select value={filterCat} onChange={e=>setFilterCat(e.target.value)} className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-500">{cats.map(c=><option key={c}>{c}</option>)}</select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100"><h2 className="text-lg font-bold text-slate-800">Documents ({filtered.length})</h2></div>
        <div className="divide-y divide-slate-100">
          {filtered.length===0 && <div className="p-12 text-center text-slate-400 text-sm">No documents found</div>}
          {filtered.map(doc=>(
            <div key={doc.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex-shrink-0">{FI[doc.type]||<File size={16} className="text-slate-400"/>}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-800 text-sm truncate">{doc.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{doc.size} • Uploaded by {doc.uploaded_by} on {doc.date}</div>
              </div>
              <span className={"px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0 "+(CC[doc.category]||'bg-slate-100 text-slate-600')}>{doc.category}</span>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Eye size={14}/></button>
                <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"><Download size={14}/></button>
                <button onClick={()=>handleDelete(doc.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 size={14}/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
