import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Users, DollarSign, CheckCircle, Clock, AlertTriangle, BarChart3, TrendingUp, Briefcase, ShieldCheck, FileText, GitBranch, ArrowUp, ArrowDown, Download, Plus } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { useAuthStore } from "../lib/authStore";
import { getStudents, getTeachers } from "../lib/api";

import AdmissionsManager   from "../modules/administration/AdmissionsManager";
import FeeManager          from "../modules/administration/FeeManager";
import TransportManager    from "../modules/administration/TransportManager";
import LibraryManager      from "../modules/administration/LibraryManager";
import HostelManager       from "../modules/administration/HostelManager";
import InventoryManager    from "../modules/administration/InventoryManager";
import ProcurementManager  from "../modules/administration/ProcurementManager";
import DocumentManager     from "../modules/administration/DocumentManager";
import WorkflowManager     from "../modules/administration/WorkflowManager";
import TimetableManager    from "../modules/administration/TimetableManager";
import UserIdentityManager from "../modules/administration/UserIdentityManager";
import TeacherProfileManager from "../modules/administration/TeacherProfileManager";
import AcademicStructureManager from "../modules/administration/AcademicStructureManager";

function StatCard({ icon: Icon, label, value, sub, color, trend }: any) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}><Icon size={18} className="text-white"/></div>
        {trend !== undefined && (<div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>{trend >= 0 ? <ArrowUp size={10}/> : <ArrowDown size={10}/>}{Math.abs(trend)}%</div>)}
      </div>
      <div className="text-2xl font-black text-slate-800">{value}</div>
      <div className="text-sm text-slate-500 font-medium mt-1">{label}</div>
      {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
    </div>
  );
}

function AdminDashboardOverview({ students, teachers }: any) {
  const tasks = [
    { label:"5 Admissions pending review",    type:"warning", icon:AlertTriangle },
    { label:"2 Leave requests to approve",    type:"info",    icon:Clock },
    { label:"Timetable update due Friday",    type:"info",    icon:Clock },
    { label:"Fee collection 102% this month", type:"success", icon:CheckCircle },
    { label:"Inventory audit overdue",        type:"error",   icon:AlertTriangle },
  ];
  const at: any = { warning:"bg-amber-50 border-amber-200 text-amber-800", info:"bg-blue-50 border-blue-200 text-blue-800", success:"bg-emerald-50 border-emerald-200 text-emerald-800", error:"bg-rose-50 border-rose-200 text-rose-800" };

  const activity = [
    { time:"09:15",  user:"Admin",        action:"Approved admission – Rahul Sharma",      icon:CheckCircle, color:"text-emerald-500" },
    { time:"10:30",  user:"Mr. A. Sharma",action:"Submitted leave request",               icon:Clock,        color:"text-amber-500" },
    { time:"11:00",  user:"Accountant",   action:"Recorded fee payment – Rs 5,000",       icon:DollarSign,   color:"text-blue-500" },
    { time:"12:15",  user:"Librarian",    action:"Issued book – Physics Fundamentals",    icon:FileText,     color:"text-purple-500" },
    { time:"14:30",  user:"Admin",        action:"Created timetable for Class X-A",        icon:BarChart3,    color:"text-indigo-500" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="rounded-3xl p-6 text-white relative overflow-hidden" style={{background:"linear-gradient(135deg,#1e293b 0%,#334155 50%,#475569 100%)"}}>
        <div className="relative z-10">
          <div className="text-violet-400 text-xs font-bold tracking-widest uppercase mb-2">Admin Control Center</div>
          <h1 className="text-2xl font-black mb-1">Good day, Administrator</h1>
          <p className="text-slate-300 text-sm">Here is your operational overview for today.</p>
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-2 text-sm font-semibold border border-white/20">{new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div>
            <div className="bg-violet-500/30 backdrop-blur rounded-xl px-4 py-2 text-sm font-semibold border border-violet-400/30 text-violet-200">5 Tasks Pending</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users}     label="Total Students" value={students} sub="Enrolled"       color="bg-gradient-to-br from-blue-500 to-indigo-600"    trend={4}/>
        <StatCard icon={Briefcase} label="Total Staff"    value={teachers} sub="Active"          color="bg-gradient-to-br from-emerald-500 to-teal-600"   trend={2}/>
        <StatCard icon={DollarSign}label="Fee Collection" value="Rs 4.2L" sub="This month"       color="bg-gradient-to-br from-violet-500 to-purple-600"  trend={7}/>
        <StatCard icon={GitBranch} label="Pending Tasks"  value="8"       sub="Require action"   color="bg-gradient-to-br from-amber-500 to-orange-600"   trend={-3}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Priority Action Items</h2>
          <div className="space-y-2">{tasks.map((t,i)=>(<div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${at[t.type]}`}><t.icon size={15}/><span className="text-sm font-medium">{t.label}</span></div>))}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-bold text-slate-800">Recent Activity</h2></div>
          <div className="space-y-4">{activity.map((a,i)=>(
            <div key={i} className="flex items-start gap-3">
              <div className={"mt-0.5 "+a.color}><a.icon size={14}/></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-800">{a.action}</div>
                <div className="text-xs text-slate-400 mt-0.5">by {a.user} at {a.time}</div>
              </div>
            </div>
          ))}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[{title:"Quick Enrolment",sub:"Add a new student to the system",color:"from-blue-500 to-indigo-600",icon:Users,href:"/add-student"},
          {title:"Record Fee Payment",sub:"Log a fee payment instantly",color:"from-emerald-500 to-teal-600",icon:DollarSign,href:"/admin?tab=fees"},
          {title:"Review Leave Request",sub:"3 requests waiting approval",color:"from-amber-500 to-orange-600",icon:Clock,href:"/admin?tab=workflow"},
        ].map((q,i)=>(
          <a key={i} href={q.href} className={"rounded-2xl p-5 text-white flex items-start gap-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br "+q.color}>
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"><q.icon size={18}/></div>
            <div><div className="font-bold text-sm">{q.title}</div><div className="text-xs opacity-80 mt-0.5">{q.sub}</div></div>
          </a>
        ))}
      </div>
    </div>
  );
}

function AdminReports() {
  const reports = [
    {name:"Monthly Attendance Summary",  cat:"Attendance", date:"Jul 1",  status:"Ready"},
    {name:"Fee Collection Report",       cat:"Finance",    date:"Jul 1",  status:"Ready"},
    {name:"New Admissions Report",       cat:"Admissions", date:"Jun 30", status:"Ready"},
    {name:"Staff Performance Review",    cat:"HR",         date:"Jun 28", status:"Processing"},
    {name:"Transport Utilization",       cat:"Operations", date:"Jun 25", status:"Ready"},
    {name:"Library Issue Summary",       cat:"Library",    date:"Jun 20", status:"Ready"},
    {name:"Inventory Stock Report",      cat:"Inventory",  date:"Jun 15", status:"Ready"},
  ];
  const cc: any = {Attendance:"bg-blue-100 text-blue-700",Finance:"bg-emerald-100 text-emerald-700",Admissions:"bg-violet-100 text-violet-700",HR:"bg-purple-100 text-purple-700",Operations:"bg-amber-100 text-amber-700",Library:"bg-indigo-100 text-indigo-700",Inventory:"bg-orange-100 text-orange-700"};
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FileText}  label="Total Reports"    value="32" color="bg-gradient-to-br from-indigo-500 to-blue-600"/>
        <StatCard icon={CheckCircle}label="Ready"           value="28" color="bg-gradient-to-br from-emerald-500 to-teal-600"/>
        <StatCard icon={Clock}     label="Processing"       value="4"  color="bg-gradient-to-br from-amber-500 to-orange-600"/>
        <StatCard icon={TrendingUp}label="Scheduled"        value="6"  color="bg-gradient-to-br from-purple-500 to-pink-600"/>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between"><div><h2 className="text-lg font-bold text-slate-800">Report Library</h2><p className="text-sm text-slate-500">Administrative reports and analytics</p></div><button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-violet-600 hover:bg-violet-700"><Plus size={14}/> Generate</button></div>
        <div className="overflow-x-auto"><table className="w-full">
          <thead><tr className="bg-slate-50">{["Report","Category","Date","Status","Action"].map(h=><th key={h} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-left">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">{reports.map((r,i)=>(<tr key={i} className="hover:bg-slate-50"><td className="px-6 py-4 font-semibold text-slate-800 text-sm">{r.name}</td><td className="px-6 py-4"><span className={"px-2 py-0.5 rounded-full text-xs font-bold "+(cc[r.cat]||"bg-slate-100")}>{r.cat}</span></td><td className="px-6 py-4 text-slate-500 text-sm">{r.date}</td><td className="px-6 py-4"><span className={"px-2.5 py-1 rounded-full text-xs font-bold "+(r.status==="Ready"?"bg-emerald-100 text-emerald-700":"bg-amber-100 text-amber-700")}>{r.status}</span></td><td className="px-6 py-4"><button className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline"><Download size={12}/> Download</button></td></tr>))}</tbody>
        </table></div>
      </div>
    </div>
  );
}

function StudentsAdmin({ students }: any) {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users}       label="Total Students" value={students} color="bg-gradient-to-br from-blue-500 to-indigo-600" trend={4}/>
        <StatCard icon={CheckCircle} label="Active"         value={students} color="bg-gradient-to-br from-emerald-500 to-teal-600"/>
        <StatCard icon={AlertTriangle}label="At Risk"       value="4"        color="bg-gradient-to-br from-amber-500 to-orange-600"/>
        <StatCard icon={ShieldCheck} label="New This Month" value="12"       color="bg-gradient-to-br from-purple-500 to-pink-600" trend={8}/>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <p className="text-slate-500 text-sm">Student administration is managed via the main <a href="/dashboard" className="text-blue-600 font-semibold hover:underline">Management Dashboard → Directory tab</a>. Click below for detailed student management actions:</p>
        <div className="flex flex-wrap gap-3 mt-4">
          {[{label:"Add Student",href:"/add-student",color:"bg-blue-600"},
            {label:"View All Students",href:"/dashboard?tab=students",color:"bg-slate-700"},
            {label:"Student 360°",href:"/student-360/1",color:"bg-indigo-600"},
          ].map((b,i)=><a key={i} href={b.href} className={`px-5 py-2.5 rounded-xl text-sm font-bold text-white ${b.color} hover:opacity-90 transition-opacity`}>{b.label}</a>)}
        </div>
      </div>
    </div>
  );
}

function StaffAdmin({ teachers }: any) {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Briefcase}  label="Total Staff"    value={teachers} color="bg-gradient-to-br from-purple-500 to-indigo-600" trend={2}/>
        <StatCard icon={CheckCircle}label="Present Today"  value={teachers > 0 ? teachers - 1 : 0} color="bg-gradient-to-br from-emerald-500 to-teal-600"/>
        <StatCard icon={Clock}      label="On Leave"       value="1"        color="bg-gradient-to-br from-amber-500 to-orange-600"/>
        <StatCard icon={ShieldCheck}label="New This Month" value="2"        color="bg-gradient-to-br from-rose-500 to-pink-600"/>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <p className="text-slate-500 text-sm">Quick links for staff administration:</p>
        <div className="flex flex-wrap gap-3 mt-4">
          {[{label:"Add Teacher",href:"/add-teacher",color:"bg-purple-600"},
            {label:"View All Teachers",href:"/dashboard?tab=teachers",color:"bg-slate-700"},
            {label:"Teacher Profiles",href:"/admin?tab=teachers",color:"bg-indigo-600"},
          ].map((b,i)=><a key={i} href={b.href} className={`px-5 py-2.5 rounded-xl text-sm font-bold text-white ${b.color} hover:opacity-90 transition-opacity`}>{b.label}</a>)}
        </div>
      </div>
    </div>
  );
}

const TAB_TITLES: any = {
  dashboard:   { title: "Admin Dashboard",       subtitle: "Operational control center" },
  workflow:    { title: "Workflow Management",   subtitle: "Approvals, requests & automation" },
  reports:     { title: "Reports & Analytics",   subtitle: "Administrative reports" },
  students:    { title: "Student Administration",subtitle: "Student records & management" },
  staff:       { title: "Staff Administration",  subtitle: "Staff records & HR" },
  teachers:    { title: "Teacher Profiles",      subtitle: "Performance & professional development" },
  users:       { title: "User & Identity Mgmt",  subtitle: "System users, roles & access control" },
  admissions:  { title: "Admissions",            subtitle: "Application management" },
  fees:        { title: "Fee Management",        subtitle: "Fee structures & payments" },
  timetable:   { title: "Timetable Management",  subtitle: "Class schedules & subject assignments" },
  academics:   { title: "Academic Structure",    subtitle: "Configure classes, sections & subjects" },
  transport:   { title: "Transport",             subtitle: "Routes, fleet & students" },
  library:     { title: "Library",               subtitle: "Book catalogue & issue management" },
  hostel:      { title: "Hostel",                subtitle: "Room allocation & occupancy" },
  inventory:   { title: "Inventory",             subtitle: "Stock & asset management" },
  procurement: { title: "Procurement",           subtitle: "Vendors & purchase orders" },
  documents:   { title: "Document Management",   subtitle: "Files, uploads & categories" },
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const [students, setStudents] = useState(0);
  const [teachers, setTeachers] = useState(0);
  const activeTab = new URLSearchParams(location.search).get("tab") || "dashboard";

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    Promise.all([getStudents(), getTeachers()]).then(([s,t]) => {
      if (s.success) setStudents(s.data.length);
      if (t.success) setTeachers(t.data.length);
    }).catch(()=>{});
  }, [user, navigate]);

  const current = TAB_TITLES[activeTab] || TAB_TITLES.dashboard;

  return (
    <AdminLayout auth={user} title={current.title} subtitle={current.subtitle}>
      {activeTab === "dashboard"   && <AdminDashboardOverview students={students} teachers={teachers}/>}
      {activeTab === "workflow"    && <div className="p-6"><WorkflowManager/></div>}
      {activeTab === "reports"     && <AdminReports/>}
      {activeTab === "students"    && <StudentsAdmin students={students}/>}
      {activeTab === "staff"       && <StaffAdmin teachers={teachers}/>}
      {activeTab === "teachers"    && <div className="p-6"><TeacherProfileManager/></div>}
      {activeTab === "users"       && <div className="p-6"><UserIdentityManager/></div>}
      {activeTab === "admissions"  && <div className="p-6"><AdmissionsManager/></div>}
      {activeTab === "fees"        && <div className="p-6"><FeeManager/></div>}
      {activeTab === "timetable"   && <div className="p-6"><TimetableManager/></div>}
      {activeTab === "academics"   && <div className="p-6"><AcademicStructureManager/></div>}
      {activeTab === "transport"   && <div className="p-6"><TransportManager/></div>}
      {activeTab === "library"     && <div className="p-6"><LibraryManager/></div>}
      {activeTab === "hostel"      && <div className="p-6"><HostelManager/></div>}
      {activeTab === "inventory"   && <div className="p-6"><InventoryManager/></div>}
      {activeTab === "procurement" && <div className="p-6"><ProcurementManager/></div>}
      {activeTab === "documents"   && <div className="p-6"><DocumentManager/></div>}
    </AdminLayout>
  );
}
