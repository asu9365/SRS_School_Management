import React, { useState, useEffect } from 'react';
import api from '../lib/api';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../lib/authStore';
import { Calendar, FileText, CheckCircle, Clock, Sparkles } from 'lucide-react';

interface ActionItem {
    id: number;
    description: string;
    status: 'pending' | 'completed';
}

interface Appointment {
    id: number;
    parent?: { Name: string };
    teacher?: { Name: string };
    scheduled_at: string;
    notes: string;
    status: string;
    actionItems?: ActionItem[];
    meeting_link?: string;
}

export default function MeetingHistory() {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [aiSummarizing, setAiSummarizing] = useState<number | null>(null);
    const [aiSummaries, setAiSummaries] = useState<Record<number, string>>({});

    const isTeacher = user?.roles?.some((r: any) => r.name === 'Teacher' || r.name === 'Admin' || r.name === 'Principal');

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get('/appointments');
                if (response.data.success) {
                    // Filter for completed or approved appointments that are in the past
                    // Or just filter for those that have notes/actionItems for now.
                    // For simplicity, we just filter the API response.
                    let filtered = response.data.data;
                    if (isTeacher) {
                        filtered = filtered.filter((a: any) => a.teacher_id === user?.teacher_id || a.teacher_id === user?.id);
                    } else {
                        filtered = filtered.filter((a: any) => a.parent_id === user?.id);
                    }
                    
                    setAppointments(filtered.filter((a: any) => a.notes || (a.actionItems && a.actionItems.length > 0) || a.status === 'Completed' || a.status === 'Approved'));
                }
            } catch (error) {
                console.error("Error fetching meeting history", error);
            }
            setLoading(false);
        };
        if (user) {
            fetchHistory();
        }
    }, [user, isTeacher]);

    const handleSummarize = async (appointmentId: number) => {
        setAiSummarizing(appointmentId);
        try {
            const response = await api.post(`/ai/ptm/${appointmentId}/summarize`, {});
            if (response.data.success) {
                setAiSummaries(prev => ({ ...prev, [appointmentId]: response.data.data }));
            }
        } catch (e) {
            console.error("Error summarizing PTM", e);
        } finally {
            setAiSummarizing(null);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading meeting history...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold font-outfit text-gray-900 mb-2">Meeting History & Action Tracker</h1>
            <p className="text-gray-600 mb-8">Review past Parent-Teacher Meetings, minutes, and pending action items.</p>
            
            {appointments.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No meeting history found</h3>
                    <p className="text-gray-500 mt-2">You don't have any past meetings with recorded notes or action items.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {appointments.map(apt => (
                        <div key={apt.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg">
                                        PTM with {isTeacher ? apt.parent?.Name || 'Parent' : apt.teacher?.Name || 'Teacher'}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                                        <Calendar size={14} />
                                        {apt.scheduled_at ? new Date(apt.scheduled_at).toLocaleString() : 'Unscheduled'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${apt.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                                        {apt.status}
                                    </span>
                                    {apt.status === 'Approved' && (
                                        <button 
                                            onClick={() => navigate(apt.meeting_link || `/meeting/${apt.id}`)}
                                            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                                        >
                                            Join Call
                                        </button>
                                    )}
                                </div>
                            </div>
                            
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="flex items-center gap-2 font-medium text-gray-900 mb-3">
                                        <FileText size={18} className="text-orange-600" />
                                        Meeting Minutes
                                    </h4>
                                    <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-wrap min-h-[100px]">
                                        {apt.notes || <span className="text-gray-400 italic">No notes recorded for this meeting.</span>}
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="flex items-center gap-2 font-medium text-gray-900 mb-3">
                                        <CheckCircle size={18} className="text-orange-600" />
                                        Action Items
                                    </h4>
                                    {!apt.actionItems || apt.actionItems.length === 0 ? (
                                        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-400 italic">
                                            No action items assigned.
                                        </div>
                                    ) : (
                                        <ul className="space-y-2">
                                            {apt.actionItems.map(item => (
                                                <li key={item.id} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-3">
                                                    {item.status === 'completed' ? (
                                                        <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                                                    ) : (
                                                        <Clock size={18} className="text-orange-500 mt-0.5 flex-shrink-0" />
                                                    )}
                                                    <span className={`text-sm flex-1 ${item.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                                        {item.description}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            
                            {/* AI Summary Section */}
                            <div className="px-6 pb-6">
                                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-xl relative">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                                            <Sparkles size={16} /> AI Meeting Summary
                                        </h4>
                                        {!aiSummaries[apt.id] && (
                                            <button 
                                                onClick={() => handleSummarize(apt.id)}
                                                disabled={aiSummarizing === apt.id}
                                                className="px-3 py-1 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-lg border border-indigo-200 dark:border-indigo-700 hover:bg-indigo-50 transition-colors disabled:opacity-50 shadow-sm"
                                            >
                                                {aiSummarizing === apt.id ? 'Summarizing...' : 'Generate Summary'}
                                            </button>
                                        )}
                                    </div>
                                    {aiSummaries[apt.id] ? (
                                        <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                                            {aiSummaries[apt.id]}
                                        </p>
                                    ) : (
                                        <p className="text-sm text-indigo-400/70 dark:text-indigo-600/50 italic">
                                            Click generate to let AI summarize the notes and action items for this meeting.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
