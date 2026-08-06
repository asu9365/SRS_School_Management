import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Users, BookOpen, TrendingUp, Award, AlertTriangle, CheckCircle, Clock, Briefcase, Calendar, ArrowUp, ArrowDown, Star, UserCheck, FileText, Zap, Building, Phone, Globe, DollarSign, Plus, Download, RefreshCw } from "lucide-react";
import PrincipalLayout from "../components/PrincipalLayout";
import { useAuthStore } from "../lib/authStore";
import { getStudents, getTeachers } from "../lib/api";

function StatCard({ icon: Icon, label, value, sub, color, trend }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}><Icon size={22} className="text-white" /></div>
        {trend !== undefined && (<div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>{trend >= 0 ? <ArrowUp size={10}/> : <ArrowDown size={10}/>}{Math.abs(trend)}%</div>)}
      </div>
      <div className="text-3xl font-black text-slate-800 mb-1">{value}</div>
      <div className="text-sm font-semibold text-slate-600">{label}</div>
      {sub && <div className="text-xs text-slate-400 mt-1">{sub}</div>}
    </div>
  );
}

function PBar({ label, value, max, color }: any) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1"><span className="text-sm font-medium text-slate-600">{label}</span><span className="text-sm font-bold text-slate-800">{pct}%</span></div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{width:`${pct}%`}} /></div>
    </div>
  );
}

function OverviewTab({ students, teachers }: any) {
  const kpis = [
    { icon: Users, label: "Total Students", value: students, sub: "Enrolled", color: "bg-gradient-to-br from-indigo-500 to-indigo-600", trend: 4 },
    { icon: Briefcase, label: "Total Staff", value: teachers, sub: "Active faculty", color: "bg-gradient-to-br from-amber-500 to-orange-600", trend: 2 },
    { icon: TrendingUp, label: "Avg. Attendance", value: "87%", sub: "This month", color: "bg-gradient-to-br from-emerald-500 to-teal-600", trend: 1 },
    { icon: Award, label: "Academic Score", value: "76%", sub: "Term 1", color: "bg-gradient-to-br from-purple-500 to-pink-600", trend: -2 },
    { icon: DollarSign, label: "Fee Collection", value: "4.2L", sub: "This month", color: "bg-gradient-to-br from-rose-500 to-red-600", trend: 7 },
    { icon: CheckCircle, label: "Tasks Done", value: "143", sub: "This week", color: "bg-gradient-to-br from-cyan-500 to-blue-600", trend: 12 },
  ];
  const alerts = [
    { type:"warning", msg:"12 students attendance below 75%", icon: AlertTriangle },
    { type:"info",    msg:"Term 2 exams scheduled next week", icon: Calendar },
    { type:"success", msg:"Fee collection target 102% achieved", icon: CheckCircle },
    { type:"error",   msg:"3 pending staff leave approvals", icon: Clock },
  ];
  const aStyle: any = { warning:"bg-amber-50 border-amber-200 text-amber-800", info:"bg-blue-50 border-blue-200 text-blue-800", success:"bg-emerald-50 border-emerald-200 text-emerald-800", error:"bg-rose-50 border-rose-200 text-rose-800" };
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="rounded-3xl p-8 text-white relative overflow-hidden" style={{background:"linear-gradient(135deg,#1e1b4b 0%,#312e81 50%,#1e40af 100%)"}}>
        <div className="relative z-10">
          <div className="text-amber-400 text-sm font-bold tracking-widest uppercase mb-2">Executive Overview</div>
          <h1 className="text-3xl font-black mb-2">Welcome back, Principal</h1>
          <p className="text-indigo-200 text-sm">Real-time executive briefing for today.</p>
          <div className="flex flex-wrap gap-4 mt-5">
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-2 text-sm font-semibold border border-white/20">Today: {new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"})}</div>
            <div className="bg-amber-400/20 backdrop-blur rounded-xl px-4 py-2 text-sm font-semibold border border-amber-400/30 text-amber-300">All Systems Operational</div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-black text-slate-800 mb-4">Institutional KPIs</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">{kpis.map((k,i)=><StatCard key={i} {...k}/>)}</div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-xl font-black text-slate-800 mb-4">Priority Alerts</h2>
          <div className="space-y-3">{alerts.map((a,i)=>(<div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${aStyle[a.type]}`}><a.icon size={16}/><span className="text-sm font-medium">{a.msg}</span></div>))}</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-xl font-black text-slate-800 mb-4">Department Performance</h2>
          <PBar label="Mathematics" value={82} max={100} color="bg-indigo-500"/>
          <PBar label="Science" value={78} max={100} color="bg-emerald-500"/>
          <PBar label="English" value={91} max={100} color="bg-blue-500"/>
          <PBar label="Social Studies" value={74} max={100} color="bg-amber-500"/>
          <PBar label="Physical Ed." value={95} max={100} color="bg-rose-500"/>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="text-xl font-black text-slate-800 mb-4">Monthly Attendance Trend</h2>
        <div className="flex items-end gap-2 h-32">{[85,88,82,90,87,93].map((v,i)=>(<div key={i} className="flex-1 flex flex-col items-center gap-1"><div className="text-xs font-bold text-slate-600">{v}%</div><div className="w-full rounded-t-lg" style={{height:`${v}%`,background:"linear-gradient(180deg,#6366f1,#818cf8)"}}/><div className="text-xs text-slate-400">{["Jan","Feb","Mar","Apr","May","Jun"][i]}</div></div>))}</div>
      </div>
    </div>
  );
}

function AcademicTab() {
  const subjs = [
    {name:"Mathematics",teacher:"Mr. Sharma",cls:"X",avg:82,pass:94},
    {name:"Physics",teacher:"Mrs. Patel",cls:"XI",avg:76,pass:88},
    {name:"Chemistry",teacher:"Mr. Das",cls:"XI",avg:79,pass:91},
    {name:"English",teacher:"Ms. Roy",cls:"X",avg:88,pass:97},
    {name:"Biology",teacher:"Dr. Singh",cls:"XII",avg:81,pass:93},
    {name:"Social Studies",teacher:"Mr. Borah",cls:"IX",avg:74,pass:86},
  ];
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={BookOpen} label="Active Subjects" value="18" color="bg-gradient-to-br from-blue-500 to-indigo-600"/>
        <StatCard icon={Users} label="Class Sections" value="24" color="bg-gradient-to-br from-emerald-500 to-teal-600"/>
        <StatCard icon={Calendar} label="Academic Sessions" value="3" color="bg-gradient-to-br from-amber-500 to-orange-600"/>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div><h2 className="text-lg font-bold text-slate-800">Subject Performance</h2><p className="text-sm text-slate-500">Avg scores and pass rates</p></div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700"><Download size={14}/> Export</button>
        </div>
        <div className="overflow-x-auto"><table className="w-full">
          <thead><tr className="bg-slate-50 text-left">{["Subject","Teacher","Class","Avg Score","Pass Rate","Status"].map(h=>(<th key={h} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>))}</tr></thead>
          <tbody className="divide-y divide-slate-100">{subjs.map((s,i)=>(<tr key={i} className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4 font-semibold text-slate-800 text-sm">{s.name}</td><td className="px-6 py-4 text-slate-600 text-sm">{s.teacher}</td><td className="px-6 py-4 text-slate-600 text-sm">Class {s.cls}</td><td className="px-6 py-4"><div className="flex items-center gap-2"><div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 rounded-full" style={{width:`${s.avg}%`}}/></div><span className="text-sm font-bold text-slate-700">{s.avg}%</span></div></td><td className="px-6 py-4 text-sm font-semibold text-slate-700">{s.pass}%</td><td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${s.avg>=80?"bg-emerald-100 text-emerald-700":s.avg>=70?"bg-amber-100 text-amber-700":"bg-rose-100 text-rose-700"}`}>{s.avg>=80?"Excellent":s.avg>=70?"Good":"Needs Attention"}</span></td></tr>))}</tbody>
        </table></div>
      </div>
    </div>
  );
}

function StudentsTab({ students }: any) {
  const atRisk = [{name:"Ravi Kumar",cls:"IX-A",att:68,score:45,risk:"High"},{name:"Priya Das",cls:"X-B",att:72,score:52,risk:"Medium"},{name:"Amit Singh",cls:"XI-A",att:65,score:38,risk:"High"},{name:"Sunita Devi",cls:"VIII-C",att:78,score:58,risk:"Medium"}];
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Students" value={students} color="bg-gradient-to-br from-indigo-500 to-indigo-600" trend={4}/>
        <StatCard icon={CheckCircle} label="On Track" value={students>4?students-4:students} color="bg-gradient-to-br from-emerald-500 to-teal-600"/>
        <StatCard icon={AlertTriangle} label="At Risk" value="4" color="bg-gradient-to-br from-amber-500 to-orange-600"/>
        <StatCard icon={Award} label="Top Performers" value="12" color="bg-gradient-to-br from-purple-500 to-pink-600" trend={3}/>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div><h2 className="text-lg font-bold text-slate-800">At-Risk Students</h2><p className="text-sm text-slate-500">Requires intervention</p></div>
          <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-bold">{atRisk.length} Students</span>
        </div>
        <div className="overflow-x-auto"><table className="w-full">
          <thead><tr className="bg-slate-50">{["Student","Class","Attendance","Score","Risk","Action"].map(h=><th key={h} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">{atRisk.map((s,i)=>(<tr key={i} className="hover:bg-slate-50"><td className="px-6 py-4 font-semibold text-slate-800 text-sm">{s.name}</td><td className="px-6 py-4 text-slate-600 text-sm">{s.cls}</td><td className="px-6 py-4"><span className={`text-sm font-bold ${s.att<70?"text-rose-600":"text-amber-600"}`}>{s.att}%</span></td><td className="px-6 py-4"><span className={`text-sm font-bold ${s.score<50?"text-rose-600":"text-amber-600"}`}>{s.score}%</span></td><td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${s.risk==="High"?"bg-rose-100 text-rose-700":"bg-amber-100 text-amber-700"}`}>{s.risk}</span></td><td className="px-6 py-4"><button className="text-xs font-bold text-indigo-600 hover:underline">View</button></td></tr>))}</tbody>
        </table></div>
      </div>
    </div>
  );
}

function HRTab({ teachers }: any) {
  const staff = [{name:"Mr. A. Sharma",dept:"Mathematics",exp:"12 yrs",rating:4.8,status:"Present"},{name:"Mrs. B. Patel",dept:"Science",exp:"8 yrs",rating:4.5,status:"Present"},{name:"Mr. C. Das",dept:"English",exp:"15 yrs",rating:4.9,status:"On Leave"},{name:"Ms. D. Roy",dept:"Hindi",exp:"5 yrs",rating:4.2,status:"Present"},{name:"Mr. E. Singh",dept:"Social",exp:"9 yrs",rating:4.6,status:"Present"}];
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Briefcase} label="Total Staff" value={teachers} color="bg-gradient-to-br from-purple-500 to-indigo-600" trend={2}/>
        <StatCard icon={UserCheck} label="Present Today" value={teachers>0?teachers-1:0} color="bg-gradient-to-br from-emerald-500 to-teal-600"/>
        <StatCard icon={Clock} label="On Leave" value="1" color="bg-gradient-to-br from-amber-500 to-orange-600"/>
        <StatCard icon={Star} label="Avg Performance" value="4.6" color="bg-gradient-to-br from-rose-500 to-pink-600" trend={5}/>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between"><div><h2 className="text-lg font-bold text-slate-800">Staff Overview</h2></div><button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-purple-600"><Plus size={14}/> Add Staff</button></div>
        <div className="overflow-x-auto"><table className="w-full">
          <thead><tr className="bg-slate-50">{["Name","Dept","Exp","Rating","Status"].map(h=><th key={h} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">{staff.map((s,i)=>(<tr key={i} className="hover:bg-slate-50"><td className="px-6 py-4 font-semibold text-slate-800 text-sm">{s.name}</td><td className="px-6 py-4 text-slate-600 text-sm">{s.dept}</td><td className="px-6 py-4 text-slate-600 text-sm">{s.exp}</td><td className="px-6 py-4"><div className="flex items-center gap-1"><Star size={13} className="text-amber-400 fill-amber-400"/><span className="text-sm font-bold">{s.rating}</span></div></td><td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${s.status==="Present"?"bg-emerald-100 text-emerald-700":"bg-amber-100 text-amber-700"}`}>{s.status}</span></td></tr>))}</tbody>
        </table></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"><h2 className="text-lg font-bold text-slate-800 mb-4">Training Progress</h2>
          <PBar label="Digital Tools" value={74} max={100} color="bg-indigo-500"/>
          <PBar label="Assessment Design" value={58} max={100} color="bg-emerald-500"/>
          <PBar label="Counseling" value={40} max={100} color="bg-amber-500"/>
          <PBar label="Data-Driven" value={85} max={100} color="bg-purple-500"/>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"><h2 className="text-lg font-bold text-slate-800 mb-4">Leave Requests</h2>
          {[{name:"Mr. C. Das",dates:"Jul 8-10",type:"Medical",status:"Pending"},{name:"Ms. D. Roy",dates:"Jul 15",type:"Personal",status:"Pending"},{name:"Mr. A. Sharma",dates:"Aug 1-2",type:"Emergency",status:"Approved"}].map((r,i)=>(<div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0"><div><div className="font-semibold text-sm text-slate-800">{r.name}</div><div className="text-xs text-slate-500">{r.dates} - {r.type}</div></div><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${r.status==="Pending"?"bg-amber-100 text-amber-700":"bg-emerald-100 text-emerald-700"}`}>{r.status}</span></div>))}
        </div>
      </div>
    </div>
  );
}

function ReportsTab() {
  const reports = [{name:"Monthly Attendance Report",cat:"Attendance",date:"Jul 1, 2026",status:"Ready"},{name:"Term 1 Academic Performance",cat:"Academics",date:"Jun 30, 2026",status:"Ready"},{name:"Fee Collection Summary",cat:"Finance",date:"Jul 1, 2026",status:"Ready"},{name:"Staff Performance Evaluation",cat:"HR",date:"Jun 28, 2026",status:"Processing"},{name:"Student Wellbeing Index",cat:"Wellbeing",date:"Jun 25, 2026",status:"Ready"}];
  const cc: any = {Attendance:"bg-blue-100 text-blue-700",Academics:"bg-indigo-100 text-indigo-700",Finance:"bg-emerald-100 text-emerald-700",HR:"bg-purple-100 text-purple-700",Wellbeing:"bg-pink-100 text-pink-700"};
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FileText} label="Total Reports" value="24" color="bg-gradient-to-br from-indigo-500 to-blue-600"/>
        <StatCard icon={Download} label="Downloaded" value="18" color="bg-gradient-to-br from-emerald-500 to-teal-600"/>
        <StatCard icon={RefreshCw} label="Auto-Generated" value="6" color="bg-gradient-to-br from-amber-500 to-orange-600"/>
        <StatCard icon={Zap} label="AI Insights" value="12" color="bg-gradient-to-br from-purple-500 to-pink-600"/>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between"><div><h2 className="text-lg font-bold text-slate-800">Report Library</h2></div><button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600"><Plus size={14}/> Generate</button></div>
        <div className="overflow-x-auto"><table className="w-full">
          <thead><tr className="bg-slate-50">{["Report","Category","Generated","Status","Action"].map(h=><th key={h} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">{reports.map((r,i)=>(<tr key={i} className="hover:bg-slate-50"><td className="px-6 py-4 font-semibold text-slate-800 text-sm">{r.name}</td><td className="px-6 py-4"><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${cc[r.cat]||"bg-slate-100 text-slate-600"}`}>{r.cat}</span></td><td className="px-6 py-4 text-slate-500 text-sm">{r.date}</td><td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-bold ${r.status==="Ready"?"bg-emerald-100 text-emerald-700":"bg-amber-100 text-amber-700"}`}>{r.status}</span></td><td className="px-6 py-4"><button className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline"><Download size={12}/> Download</button></td></tr>))}</tbody>
        </table></div>
      </div>
    </div>
  );
}

function KPIsTab() {
  const kpis = [{label:"Student-Teacher Ratio",current:"28:1",target:"25:1",ok:false,icon:Users},{label:"Avg Daily Attendance",current:"87%",target:"90%",ok:false,icon:CheckCircle},{label:"Academic Pass Rate",current:"94%",target:"95%",ok:false,icon:Award},{label:"Fee Collection Rate",current:"102%",target:"100%",ok:true,icon:DollarSign},{label:"Staff Satisfaction",current:"4.6/5",target:"4.5/5",ok:true,icon:Star},{label:"Infrastructure Usage",current:"78%",target:"85%",ok:false,icon:Building},{label:"Parent Engagement",current:"65%",target:"70%",ok:false,icon:Phone},{label:"Digital Learning",current:"82%",target:"80%",ok:true,icon:Globe}];
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((k,i)=>(<div key={i} className={`rounded-2xl p-5 border ${k.ok?"bg-emerald-50 border-emerald-200":"bg-amber-50 border-amber-200"} hover:shadow-md transition-all`}><div className="flex items-start justify-between mb-3"><div className="flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${k.ok?"bg-emerald-500":"bg-amber-500"}`}/><span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{k.label}</span></div><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${k.ok?"bg-emerald-100 text-emerald-700":"bg-amber-100 text-amber-700"}`}>{k.ok?"On Track":"Below Target"}</span></div><div className="flex items-end justify-between"><div><div className="text-2xl font-black text-slate-800">{k.current}</div><div className="text-xs text-slate-500 mt-1">Target: <span className="font-bold">{k.target}</span></div></div><k.icon size={28} className="text-slate-300"/></div></div>))}
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 mb-6">Strategic Goals Progress</h2>
        <div className="space-y-5">{[{goal:"Achieve 95%+ student pass rate by Term 2",progress:94,due:"Dec 2026"},{goal:"Implement digital attendance for all classes",progress:100,due:"Completed"},{goal:"Reduce student dropout rate by 15%",progress:60,due:"Mar 2027"},{goal:"Complete school infrastructure upgrades",progress:45,due:"Jun 2027"},{goal:"Launch parent engagement app",progress:30,due:"Sep 2026"}].map((g,i)=>(<div key={i}><div className="flex items-center justify-between mb-1.5"><span className="text-sm font-medium text-slate-700">{g.goal}</span><div className="flex items-center gap-2"><span className="text-xs text-slate-400">{g.due}</span><span className="text-sm font-bold text-slate-800">{g.progress}%</span></div></div><div className="h-2.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-700" style={{width:`${g.progress}%`,background:g.progress===100?"linear-gradient(90deg,#10b981,#059669)":g.progress>=70?"linear-gradient(90deg,#6366f1,#4f46e5)":"linear-gradient(90deg,#f59e0b,#d97706)"}}/></div></div>))}</div>
      </div>
    </div>
  );
}

export default function PrincipalDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const [students, setStudents] = useState(0);
  const [teachers, setTeachers] = useState(0);
  const activeTab = new URLSearchParams(location.search).get("tab") || "overview";

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    Promise.all([getStudents(), getTeachers()]).then(([s, t]) => {
      if (s.success) setStudents(s.data.length);
      if (t.success) setTeachers(t.data.length);
    }).catch(() => {});
  }, [user, navigate]);

  const tabTitles: any = {
    overview: { title: "Executive Overview",  subtitle: "Real-time institutional intelligence" },
    academic: { title: "Academic Governance", subtitle: "Curriculum, performance & quality" },
    students: { title: "Student Success",     subtitle: "Wellbeing, at-risk monitoring & achievements" },
    hr:       { title: "HR & Staff Mgmt",     subtitle: "Staff performance, leave & PD" },
    reports:  { title: "BI & Reports",        subtitle: "Analytics, reports & business intelligence" },
    kpis:     { title: "Executive KPIs",      subtitle: "Strategic goals & KPI dashboard" },
  };
  const current = tabTitles[activeTab] || tabTitles.overview;

  return (
    <PrincipalLayout auth={user} title={current.title} subtitle={current.subtitle}>
      {activeTab === "overview" && <OverviewTab students={students} teachers={teachers}/>}
      {activeTab === "academic" && <AcademicTab/>}
      {activeTab === "students" && <StudentsTab students={students}/>}
      {activeTab === "hr"       && <HRTab teachers={teachers}/>}
      {activeTab === "reports"  && <ReportsTab/>}
      {activeTab === "kpis"     && <KPIsTab/>}
    </PrincipalLayout>
  );
}
