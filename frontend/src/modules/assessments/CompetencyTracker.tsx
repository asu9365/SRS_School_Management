import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import { Target, Star } from 'lucide-react';

export default function CompetencyTracker({ studentId, competencies, isTeacher, onRefresh }: { studentId: string, competencies: any[], isTeacher: boolean, onRefresh: () => void }) {
  // Hardcoded competencies list for this demo since we don't have a UI to manage subjects/competencies globally
  const availableCompetencies = [
    { id: 1, subject: 'Mathematics', name: 'Algebraic Thinking' },
    { id: 2, subject: 'Mathematics', name: 'Geometry & Spatial Sense' },
    { id: 3, subject: 'English', name: 'Reading Comprehension' },
    { id: 4, subject: 'English', name: 'Creative Writing' },
    { id: 5, subject: 'Science', name: 'Scientific Method' },
    { id: 6, subject: 'Social Studies', name: 'Historical Context' }
  ];

  const [loading, setLoading] = useState(false);

  // We need a quick way to create global competencies if they don't exist in the DB, 
  // but for this phase we'll just assume they exist or let the API handle it.
  // Actually, to make it work out of the box without manual DB seeding, 
  // we'd normally seed the DB. Let's assume the API doesn't fail if we just pass a name, 
  // wait, the API expects `competency_id`. We'll just mock the ID to name mapping for display.

  const handleScoreChange = async (competencyId: number, score: number) => {
    setLoading(true);
    try {
      await api.post(`/student-360/${studentId}/competency`, {
        competency_id: competencyId,
        score
      });
      onRefresh();
    } catch (e) {
      console.error(e);
      alert("Please seed the competencies table in the database first for ID " + competencyId);
    }
    setLoading(false);
  };

  const getScore = (compId: number) => {
    const record = competencies.find(c => c.competency_id === compId);
    return record ? record.score : 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Competency Tracking</h3>
        <p className="text-sm text-slate-500">Scale: 1 (Novice) - 5 (Mastery)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {availableCompetencies.reduce((acc: any, comp) => {
          if (!acc[comp.subject]) acc[comp.subject] = [];
          acc[comp.subject].push(comp);
          return acc;
        }, Object.create(null)) && Object.entries(availableCompetencies.reduce((acc: any, comp) => {
          if (!acc[comp.subject]) acc[comp.subject] = [];
          acc[comp.subject].push(comp);
          return acc;
        }, Object.create(null))).map(([subject, comps]: [string, any]) => (
          <div key={subject} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h4 className="font-bold text-indigo-600 mb-4 flex items-center gap-2">
              <Target size={18} /> {subject}
            </h4>
            <div className="space-y-4">
              {comps.map((comp: any) => {
                const currentScore = getScore(comp.id);
                return (
                  <div key={comp.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{comp.name}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          disabled={!isTeacher || loading}
                          onClick={() => handleScoreChange(comp.id, star)}
                          className={`p-1 rounded transition-colors ${
                            star <= currentScore 
                              ? 'text-amber-500' 
                              : 'text-slate-300 dark:text-slate-600 hover:text-amber-300'
                          } ${!isTeacher && 'cursor-default'}`}
                        >
                          <Star size={20} fill={star <= currentScore ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
