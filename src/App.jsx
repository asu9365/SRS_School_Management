import React, { useState } from 'react';
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

export default function App() {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem('auth');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLoginSuccess = (userData) => {
    setAuth(userData);
    localStorage.setItem('auth', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar auth={auth} onLogout={handleLogout} />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/office-hours" element={<OfficeHours />} />
            
            <Route 
              path="/login" 
              element={auth ? <Navigate to="/dashboard" replace /> : <Login onLoginSuccess={handleLoginSuccess} />} 
            />
            
            <Route 
              path="/dashboard" 
              element={auth ? <Dashboard auth={auth} /> : <Navigate to="/login" replace />} 
            />
            
            <Route 
              path="/add-student" 
              element={auth ? <StudentForm auth={auth} /> : <Navigate to="/login" replace />} 
            />
            
            <Route 
              path="/add-teacher" 
              element={auth ? <TeacherForm auth={auth} /> : <Navigate to="/login" replace />} 
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
