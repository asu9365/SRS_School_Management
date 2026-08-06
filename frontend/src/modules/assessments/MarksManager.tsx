import React, { useState, useEffect } from 'react';
import { getAssessments, getMarks, saveMark } from '../../lib/api';
import api from '../../lib/api';
import { BookOpen, Calendar, Check, Save, FileText, Plus, X, Users, AlertCircle } from 'lucide-react';

export default function MarksManager() {
  const [classId, setClassId] = useState('10-A');
  const [assessments, setAssessments] = useState<any[]>([]);
  const [selectedAssmt, setSelectedAssmt] = useState('');
  const [students, setStudents] = useState<any[]>([]);
  const [marksData, setMarksData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<string|number|null>(null);

  // New Assessment Form
  const [showNewForm, setShowNewForm] = useState(false);
  const [newAssmt, setNewAssmt] = useState({ title: '', type: 'Quiz', subject: '', max_marks: 100, exam_date: '' });
  const [creatingAssmt, setCreatingAssmt] = useState(false);

  useEffect(() => {
    fetchAssessments();
  }, [classId]);

  useEffect(() => {
    if (selectedAssmt) {
      fetchStudentsAndMarks();
    }
  }, [selectedAssmt, classId]);

  const fetchAssessments = async () => {
    try {
      const res = await getAssessments({ class_id: classId });
      setAssessments(res);
      if (res.length > 0 && !selectedAssmt) {
        setSelectedAssmt(res[0].id.toString());
      } else if (res.length === 0) {
        setSelectedAssmt('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchStudentsAndMarks = async () => {
    setLoading(true);
    try {
      const stRes = await api.get(`/students`);
      let classStudents = stRes.data?.success ? stRes.data.data : [];
      classStudents = classStudents.filter((s: any) => s.class === classId.split('-')[0] || classId === '10-A');
      setStudents(classStudents);

      const mRes = await getMarks({ assessment_id: selectedAssmt });
      const mMap: any = {};
      if (Array.isArray(mRes)) {
        mRes.forEach(m => {
          mMap[m.user_id] = m;
        });
      }
      setMarksData(mMap);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleCreateAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingAssmt(true);
    try {
      await api.post('/assessments', { ...newAssmt, class_id: classId });
      setShowNewForm(false);
      setNewAssmt({ title: '', type: 'Quiz', subject: '', max_marks: 100, exam_date: '' });
      fetchAssessments();
    } catch (e) {
      console.error(e);
    }
    setCreatingAssmt(false);
  };

  const handleMarkChange = (uid: string | number, val: string) => {
    setMarksData((prev: any) => ({
      ...prev,
      [uid]: { ...prev[uid], marks_obtained: val }
    }));
  };

  const handleFeedbackChange = (uid: string | number, val: string) => {
    setMarksData((prev: any) => ({
      ...prev,
      [uid]: { ...prev[uid], teacher_feedback: val }
    }));
  };

  const handleSaveMark = async (uid: string | number) => {
    const mark = marksData[uid];
    if (!mark || mark.marks_obtained === undefined || mark.marks_obtained === '') return;
    
    setSavingId(uid);
    try {
      await saveMark({
        assessment_id: selectedAssmt,
        user_id: uid,
        marks_obtained: mark.marks_obtained,
        teacher_feedback: mark.teacher_feedback || ''
      });
      // Optionally show a mini toast/check
    } catch (e) {
      console.error(e);
    }
    setTimeout(() => setSavingId(null), 1000); // Fake delay for UX
  };

  const currentAssmt = assessments.find(a => a.id.toString() === selectedAssmt);

  return (
    <div className="space-y-6">
      
      {/* Top Controls & Create Form */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FileText className="text-blue-500" size={20} />
              Marks & Assessments
            </h3>
            <p className="text-sm text-slate-500 mt-1">Manage grading and assignments.</p>
          </div>
          
          <button 
            onClick={() => setShowNewForm(!showNewForm)} 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-colors ${showNewForm ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-slate-800 text-white hover:bg-slate-900'}`}
          >
            {showNewForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> New Assessment</>}
          </button>
        </div>

        {/* Expandable Form */}
        {showNewForm && (
          <div className="bg-slate-50 border-t border-b border-slate-200 p-6 animate-fade-in">
            <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Create New Assessment</h4>
            <form onSubmit={handleCreateAssessment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Title</label>
                  <input placeholder="e.g. Math Quiz 1" value={newAssmt.title} onChange={e => setNewAssmt({...newAssmt, title: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Type</label>
                  <select value={newAssmt.type} onChange={e => setNewAssmt({...newAssmt, type: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                    {['Quiz', 'Class Test', 'Unit Test', 'Assignment', 'Midterm', 'Final'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Subject</label>
                  <input placeholder="e.g. Mathematics" value={newAssmt.subject} onChange={e => setNewAssmt({...newAssmt, subject: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Max Marks</label>
                  <input type="number" min="1" value={newAssmt.max_marks} onChange={e => setNewAssmt({...newAssmt, max_marks: parseInt(e.target.value)})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Exam Date</label>
                  <input type="date" value={newAssmt.exam_date} onChange={e => setNewAssmt({...newAssmt, exam_date: e.target.value})} required className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button type="submit" disabled={creatingAssmt} className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold text-sm rounded-lg transition-colors">
                  {creatingAssmt ? 'Saving...' : <><Save size={16} /> Save Assessment</>}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="p-6 bg-white border-t border-slate-200 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-xs">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select 
              value={classId} 
              onChange={(e) => setClassId(e.target.value)} 
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white font-medium text-slate-700"
            >
              <option value="10-A">Class 10-A</option>
              <option value="9-A">Class 9-A</option>
            </select>
          </div>
          <div className="relative flex-1 max-w-sm">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select 
              value={selectedAssmt} 
              onChange={(e) => setSelectedAssmt(e.target.value)} 
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white font-medium text-slate-700"
              disabled={assessments.length === 0}
            >
              {assessments.length === 0 ? (
                <option value="">No assessments available</option>
              ) : (
                <>
                  <option value="">Select an assessment...</option>
                  {assessments.map(a => (
                    <option key={a.id} value={a.id}>{a.title} ({a.subject})</option>
                  ))}
                </>
              )}
            </select>
          </div>
        </div>
      </div>

      {/* Marks Entry Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center text-slate-400">
            <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p className="font-medium">Loading marks data...</p>
          </div>
        ) : selectedAssmt && currentAssmt ? (
          <>
            <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-bold text-slate-800">{currentAssmt.title}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">{currentAssmt.type} • {currentAssmt.subject}</span>
              </div>
              <div className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-blue-200">
                Max Marks: {currentAssmt.max_marks}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-bold">
                    <th className="p-4 w-24 text-center">Roll No</th>
                    <th className="p-4">Student Name</th>
                    <th className="p-4 w-32">Marks Obtained</th>
                    <th className="p-4">Teacher Feedback</th>
                    <th className="p-4 text-right w-24">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((student) => {
                    const uid = student.student_id || student.id;
                    const mark = marksData[uid] || { marks_obtained: '', teacher_feedback: '' };
                    const isSaving = savingId === uid;

                    return (
                      <tr key={uid} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 text-sm font-bold text-slate-600 text-center">
                          <span className="bg-white border border-slate-200 px-2 py-1 rounded shadow-sm">{student.rollno}</span>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-slate-800">{`${student.Fname} ${student.Lname}`}</div>
                          <div className="text-xs text-slate-500 font-medium">ID: {uid}</div>
                        </td>
                        <td className="p-4">
                          <input 
                            type="number" 
                            value={mark.marks_obtained}
                            onChange={(e) => handleMarkChange(uid, e.target.value)}
                            className="w-20 px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-center"
                            max={currentAssmt.max_marks}
                            min="0"
                            placeholder="--"
                          />
                        </td>
                        <td className="p-4">
                          <input 
                            type="text" 
                            value={mark.teacher_feedback || ''}
                            onChange={(e) => handleFeedbackChange(uid, e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="Optional feedback..."
                          />
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => handleSaveMark(uid)} 
                            disabled={isSaving || mark.marks_obtained === ''}
                            className={`inline-flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${isSaving ? 'bg-emerald-500 text-white shadow-md' : mark.marks_obtained !== '' ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                            title="Save marks"
                          >
                            {isSaving ? <Check size={18} /> : <Save size={18} />}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-slate-400">
            <AlertCircle size={48} className="mb-4 text-slate-300" />
            <p className="font-medium">Select an assessment to view and enter marks.</p>
          </div>
        )}
      </div>

    </div>
  );
}
