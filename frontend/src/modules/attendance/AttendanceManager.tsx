import React, { useState, useEffect } from 'react';
import { getAttendance, saveAttendance } from '../../lib/api';
import api from '../../lib/api';
import { CheckCircle, XCircle, Clock, Users, Calendar, AlertCircle } from 'lucide-react';

export default function AttendanceManager() {
  const [classId, setClassId] = useState('10-A');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState<any[]>([]);
  const [attendanceData, setAttendanceData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchStudentsAndAttendance();
  }, [classId, date]);

  const fetchStudentsAndAttendance = async () => {
    setLoading(true);
    try {
      // Fetch students via axios instance
      const stRes = await api.get('/students');
      let classStudents = stRes.data?.success ? stRes.data.data : [];
      classStudents = classStudents.filter((s: any) => s.class === classId.split('-')[0] || classId === '10-A');
      setStudents(classStudents);

      // Fetch attendance for this class and date
      const attRes = await getAttendance({ class_id: classId, date });
      
      const attMap: any = {};
      if (Array.isArray(attRes)) {
        attRes.forEach(record => {
          attMap[record.user_id] = record;
        });
      }
      setAttendanceData(attMap);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleStatusChange = async (studentId: string | number, status: string) => {
    setSaving(true);
    try {
      const res = await saveAttendance({
        user_id: studentId,
        class_id: classId,
        date: date,
        status: status
      });
      setAttendanceData((prev: any) => ({
        ...prev,
        [studentId]: res
      }));
    } catch (e) {
      console.error("Failed to save attendance", e);
    }
    setSaving(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header & Controls */}
      <div className="p-6 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <CheckCircle className="text-emerald-500" size={20} />
            Daily Attendance Tracker
          </h3>
          <p className="text-sm text-slate-500 mt-1">Mark present, absent, or late students for the day.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select 
              value={classId} 
              onChange={(e) => setClassId(e.target.value)} 
              className="w-full sm:w-40 pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white font-medium text-slate-700"
            >
              <option value="10-A">Class 10-A</option>
              <option value="9-A">Class 9-A</option>
            </select>
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              className="w-full sm:w-44 pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white font-medium text-slate-700"
            />
          </div>
        </div>
      </div>

      {/* Roster Table */}
      <div className="p-0">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p className="font-medium">Loading class roster...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400">
            <AlertCircle size={48} className="mb-4 text-slate-300" />
            <p className="font-medium">No students found for this class.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-bold">
                  <th className="p-4 w-24 text-center">Roll No</th>
                  <th className="p-4">Student Name</th>
                  <th className="p-4 text-right">Attendance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((student) => {
                  const uid = student.student_id || student.id;
                  const record = attendanceData[uid];
                  const currentStatus = record ? record.status : 'Present'; // Default Present if unmarked

                  return (
                    <tr key={uid} className="hover:bg-slate-50 transition-colors group">
                      <td className="p-4 text-sm font-bold text-slate-600 text-center">
                        <span className="bg-white border border-slate-200 px-2 py-1 rounded shadow-sm">{student.rollno}</span>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-slate-800">{`${student.Fname} ${student.Lname}`}</div>
                        <div className="text-xs text-slate-500 font-medium">ID: {uid}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleStatusChange(uid, 'Present')}
                            disabled={saving}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 border
                              ${currentStatus === 'Present' 
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm ring-1 ring-emerald-500' 
                                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-emerald-600'}`}
                          >
                            <CheckCircle size={14} /> Present
                          </button>
                          
                          <button 
                            onClick={() => handleStatusChange(uid, 'Absent')}
                            disabled={saving}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 border
                              ${currentStatus === 'Absent' 
                                ? 'bg-rose-50 border-rose-200 text-rose-700 shadow-sm ring-1 ring-rose-500' 
                                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-rose-600'}`}
                          >
                            <XCircle size={14} /> Absent
                          </button>

                          <button 
                            onClick={() => handleStatusChange(uid, 'Late')}
                            disabled={saving}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 border
                              ${currentStatus === 'Late' 
                                ? 'bg-amber-50 border-amber-200 text-amber-700 shadow-sm ring-1 ring-amber-500' 
                                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-amber-600'}`}
                          >
                            <Clock size={14} /> Late
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
