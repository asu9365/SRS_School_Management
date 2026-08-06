import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../lib/api';
import { useAuthStore } from '../lib/authStore';
import { Radar, Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend, 
  ArcElement 
} from 'chart.js';
import { Award, Target, Book, Calendar, Activity, ChevronLeft } from 'lucide-react';
import PortfolioManager from '../modules/student/PortfolioManager';
import CompetencyTracker from '../modules/assessments/CompetencyTracker';
import BehaviorTracker from '../modules/student/BehaviorTracker';
import AIInsightsPanel from '../modules/ai/AIInsightsPanel';
import AIReportGenerator from '../modules/ai/AIReportGenerator';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ArcElement);

export default function Student360Dashboard() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'competencies' | 'behavior'>('overview');

  const isTeacherOrAdmin = user?.roles?.some((r: any) => r.name === 'Teacher' || r.name === 'Admin' || r.name === 'Principal');

  const fetchData = async () => {
    try {
      const response = await api.get(`/student-360/${id}`);
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching 360 data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data) return <div className="p-8 text-center">Student not found</div>;

  // Process Competencies for Radar Chart
  const competencyLabels = data.competencies.map((c: any) => c.competency.name) || [];
  const competencyScores = data.competencies.map((c: any) => c.score) || [];
  
  const radarData = {
    labels: competencyLabels.length > 0 ? competencyLabels : ['No Data'],
    datasets: [
      {
        label: 'Competency Level',
        data: competencyScores.length > 0 ? competencyScores : [0],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(156, 163, 175, 0.2)' },
        grid: { color: 'rgba(156, 163, 175, 0.2)' },
        pointLabels: { color: '#6b7280', font: { size: 11 } },
        ticks: { backdropColor: 'transparent', min: 0, max: 5, stepSize: 1, display: false }
      }
    },
    plugins: { legend: { display: false } }
  };

  // Success Index Chart
  const gaugeData = {
    datasets: [
      {
        data: [data.successIndex, 100 - data.successIndex],
        backgroundColor: ['#10b981', '#f3f4f6'],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => window.history.back()} className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:text-indigo-600 transition">
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-bold font-outfit text-slate-900 dark:text-white">
                Student 360° Profile
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                {data.student.name || `${data.student.Fname} ${data.student.Lname}`}
              </p>
            </div>
          </div>
          {isTeacherOrAdmin && <AIInsightsPanel studentId={id as string} />}
        </div>

        {/* Top Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Success Index</p>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{data.successIndex}%</h3>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 rounded-xl">
                <Target size={24} />
              </div>
            </div>
            <div className="h-16 relative">
              <Doughnut data={gaugeData} options={{ maintainAspectRatio: false, cutout: '75%', plugins: { tooltip: { enabled: false }, legend: { display: false } } }} />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Academic Avg</p>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{Math.round(data.academics.average)}%</h3>
              </div>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
                <Book size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Attendance</p>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{Math.round(data.attendance.percentage)}%</h3>
              </div>
              <div className="p-3 bg-sky-50 dark:bg-sky-900/30 text-sky-600 rounded-xl">
                <Calendar size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Portfolio Items</p>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{data.portfolio.length}</h3>
              </div>
              <div className="p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-xl">
                <Award size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
            <button onClick={() => setActiveTab('overview')} className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>Overview</button>
            <button onClick={() => setActiveTab('portfolio')} className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === 'portfolio' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>Achievement Portfolio</button>
            <button onClick={() => setActiveTab('competencies')} className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === 'competencies' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>Competency Tracking</button>
            <button onClick={() => setActiveTab('behavior')} className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === 'behavior' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}>Behavioral Records</button>
          </div>
          
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-200">Competency Map</h3>
                  {competencyLabels.length > 0 ? (
                    <div className="w-full max-w-md mx-auto aspect-square">
                      <Radar data={radarData} options={radarOptions} />
                    </div>
                  ) : (
                    <div className="text-center p-8 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-500 border border-dashed border-slate-200 dark:border-slate-700">
                      No competencies evaluated yet.
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-slate-200">Recent Behavior</h3>
                  <div className="space-y-3">
                    {data.behavior.slice(0,5).length === 0 ? (
                      <p className="text-slate-500 italic">No behavioral records.</p>
                    ) : (
                      data.behavior.slice(0,5).map((b: any, i: number) => (
                        <div key={i} className={`p-4 rounded-lg border ${b.type === 'Positive' ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800'}`}>
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-sm">{b.type}</span>
                            <span className="text-xs text-slate-500">{new Date(b.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm mt-1 text-slate-700 dark:text-slate-300">{b.description}</p>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {isTeacherOrAdmin && (
                    <AIReportGenerator studentId={id as string} />
                  )}
                </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <PortfolioManager 
                studentId={id as string} 
                portfolioItems={data.portfolio} 
                isTeacher={isTeacherOrAdmin} 
                onRefresh={fetchData} 
              />
            )}

            {activeTab === 'competencies' && (
              <CompetencyTracker 
                studentId={id as string} 
                competencies={data.competencies} 
                isTeacher={isTeacherOrAdmin} 
                onRefresh={fetchData} 
              />
            )}

            {activeTab === 'behavior' && (
              <BehaviorTracker 
                studentId={id as string} 
                records={data.behavior} 
                isTeacher={isTeacherOrAdmin} 
                onRefresh={fetchData} 
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
