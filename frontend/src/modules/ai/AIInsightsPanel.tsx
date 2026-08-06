import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export default function AIInsightsPanel({ studentId }: { studentId: string }) {
  const [insightsData, setInsightsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await api.get(`/ai/student/${studentId}/insights`);
        if (response.data.success) {
          setInsightsData(response.data.data);
        }
      } catch (e) {
        console.error("Error fetching AI Insights", e);
      } finally {
        setLoading(false);
      }
    };
    if (studentId) fetchInsights();
  }, [studentId]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-4 animate-pulse">
          <Sparkles size={20} />
          <h3 className="font-bold text-lg">AI Generating Insights...</h3>
        </div>
      </div>
    );
  }

  if (!insightsData) return null;

  const getRiskIcon = () => {
    if (insightsData.risk_level === 'High') return <AlertTriangle className="text-rose-500" size={24} />;
    if (insightsData.risk_level === 'Medium') return <TrendingUp className="text-amber-500" size={24} />;
    return <CheckCircle className="text-emerald-500" size={24} />;
  };

  const getRiskColor = () => {
    if (insightsData.risk_level === 'High') return 'text-rose-700 bg-rose-100 border-rose-200';
    if (insightsData.risk_level === 'Medium') return 'text-amber-700 bg-amber-100 border-amber-200';
    return 'text-emerald-700 bg-emerald-100 border-emerald-200';
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
          <Sparkles size={20} />
          <h3 className="font-bold text-lg font-outfit">AI Academic Insights</h3>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${getRiskColor()}`}>
          {getRiskIcon()} {insightsData.risk_level} Risk Profile
        </div>
      </div>

      <div className="space-y-3">
        {insightsData.insights.map((insight: string, idx: number) => (
          <div key={idx} className="flex gap-3 items-start bg-white/60 dark:bg-slate-900/40 p-3 rounded-xl">
            <div className="mt-0.5 text-indigo-500 text-sm">✦</div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
