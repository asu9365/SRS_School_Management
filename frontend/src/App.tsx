import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Staff from './pages/Staff';
import OfficeHours from './pages/OfficeHours';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StudentForm from './pages/StudentForm';
import TeacherForm from './pages/TeacherForm';
import StudentPortal from './pages/StudentPortal';
import ParentPortal from './pages/ParentPortal';
import Messages from './pages/Messages';
import MeetingRoom from './pages/MeetingRoom';
import MeetingHistory from './pages/MeetingHistory';
import Student360Dashboard from './pages/Student360Dashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import PrincipalDashboard from './pages/PrincipalDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ScrollToTop from './components/ScrollToTop';
import { useAuthStore } from './lib/authStore';

export default function App() {
  const { user, logout } = useAuthStore();

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar auth={user} onLogout={logout} />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/office-hours" element={<OfficeHours />} />
            
            <Route 
              path="/login" 
              element={
                user 
                  ? (user.roles?.some((r: any) => r.name === 'Super Admin') ? <Navigate to="/super-admin" replace /> : <Navigate to="/dashboard" replace />) 
                  : <Login />
              } 
            />
            
            <Route 
              path="/super-admin" 
              element={user && user.roles?.some((r: any) => r.name === 'Super Admin') ? <SuperAdminDashboard /> : <Navigate to="/login" replace />} 
            />
            
            <Route 
              path="/principal" 
              element={user && user.roles?.some((r: any) => ['Principal','Admin','Super Admin'].includes(r.name)) ? <PrincipalDashboard /> : <Navigate to="/login" replace />} 
            />
            
            <Route 
              path="/admin" 
              element={user && user.roles?.some((r: any) => ['Admin','Super Admin'].includes(r.name)) ? <AdminDashboard /> : <Navigate to="/login" replace />} 
            />
            
            <Route 
              path="/student-portal" 
              element={user && user.roles?.some((r: any) => r.name === 'Student') ? <StudentPortal /> : <Navigate to="/login" replace />} 
            />

            <Route 
              path="/parent-portal" 
              element={user && user.roles?.some((r: any) => r.name === 'Parent') ? <ParentPortal /> : <Navigate to="/login" replace />} 
            />
            
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard auth={user} /> : <Navigate to="/login" replace />} 
            />
            
            <Route 
              path="/add-student" 
              element={user ? <StudentForm auth={user} /> : <Navigate to="/login" replace />} 
            />
            
            <Route 
              path="/add-teacher" 
              element={user ? <TeacherForm auth={user} /> : <Navigate to="/login" replace />} 
            />

            <Route 
              path="/messages" 
              element={user ? <Messages /> : <Navigate to="/login" replace />} 
            />

            <Route 
              path="/meeting/:id" 
              element={user ? <MeetingRoom /> : <Navigate to="/login" replace />} 
            />
            
            <Route 
              path="/meeting-history" 
              element={user ? <MeetingHistory /> : <Navigate to="/login" replace />} 
            />
            
            <Route 
              path="/student-360/:id" 
              element={user ? <Student360Dashboard /> : <Navigate to="/login" replace />} 
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
