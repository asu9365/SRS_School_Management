import React, { useEffect, useState } from 'react';
import { getAttendance, getMarks } from '../lib/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { ClipboardCheck, TrendingUp } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Analytics({ userId }) {
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    if (userId) {
      getAttendance({ user_id: userId }).then(setAttendance).catch(console.error);
      getMarks({ user_id: userId }).then(setMarks).catch(console.error);
    }
  }, [userId]);

  // Process Attendance
  const presentCount = attendance.filter(a => a.status === 'Present').length;
  const lateCount = attendance.filter(a => a.status === 'Late').length;
  const absentCount = attendance.filter(a => a.status === 'Absent').length;
  const totalDays = attendance.length;
  const attendancePercentage = totalDays > 0 ? Math.round(((presentCount + lateCount) / totalDays) * 100) : 0;

  const attendanceData = {
    labels: ['Present', 'Late', 'Absent'],
    datasets: [
      {
        data: [presentCount, lateCount, absentCount],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)', // Success
          'rgba(245, 158, 11, 0.8)', // Warning
          'rgba(239, 68, 68, 0.8)', // Danger
        ],
        borderWidth: 0,
      },
    ],
  };

  // Process Marks
  const marksSorted = [...marks].sort((a, b) => new Date(a.assessment?.exam_date) - new Date(b.assessment?.exam_date));
  
  const marksData = {
    labels: marksSorted.map(m => m.assessment?.title || 'Unknown'),
    datasets: [
      {
        label: 'Marks Percentage',
        data: marksSorted.map(m => {
          if (!m.assessment) return 0;
          return Math.round((m.marks_obtained / m.assessment.max_marks) * 100);
        }),
        borderColor: 'rgb(249, 115, 22)', // Orange-500
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
        tension: 0.3,
        fill: true,
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false }
    },
    scales: {
      y: { min: 0, max: 100 }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      {/* Attendance Chart */}
      <section className="glass-card p-5">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg text-emerald-600 dark:text-emerald-400">
            <ClipboardCheck size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Attendance Overview</h2>
        </div>
        
        <div className="flex items-center justify-center gap-8">
          <div className="w-48 h-48">
            {totalDays > 0 ? (
              <Doughnut data={attendanceData} options={{ cutout: '75%' }} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">No Data</div>
            )}
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-slate-800 dark:text-white">{attendancePercentage}%</div>
            <div className="text-sm font-medium text-slate-500 mt-1">Present Rate</div>
          </div>
        </div>
      </section>

      {/* Marks Trend Chart */}
      <section className="glass-card p-5">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg text-orange-600 dark:text-orange-400">
            <TrendingUp size={24} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Academic Performance</h2>
        </div>

        <div className="h-48 w-full">
           {marks.length > 0 ? (
              <Line data={marksData} options={lineOptions} />
           ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">No Assessment Data</div>
           )}
        </div>
      </section>
    </div>
  );
}
