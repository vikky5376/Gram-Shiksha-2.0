import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Components
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import SideMenu from './components/SideMenu';
import ChatbotWidget from './components/ChatbotWidget';

// Auth
import LoginPage from './pages/auth/LoginPage';

// Student pages
import StudentHome from './pages/student/Home';
import LiveClass from './pages/student/LiveClass';
import Assignments from './pages/student/Assignments';
import History from './pages/student/History';
import AiDoubt from './pages/student/AiDoubt';
import Schedule from './pages/student/Schedule';
import Settings from './pages/student/Settings';

// Mentor pages
import MentorHome from './pages/mentor/MentorHome';
import LiveSessions from './pages/mentor/LiveSessions';
import ScheduleManage from './pages/mentor/ScheduleManage';
import Attendance from './pages/mentor/Attendance';
import Permissions from './pages/mentor/Permissions';
import MentorAssignments from './pages/mentor/MentorAssignments';
import StudyMaterials from './pages/mentor/StudyMaterials';
import AiReschedule from './pages/mentor/AiReschedule';

// Admin pages
import AdminOverview from './pages/admin/AdminOverview';
import AdminUsers from './pages/admin/AdminUsers';
import { AdminAuth, AdminActivity, AdminReports } from './pages/admin/AdminOthers';

function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser, loading } = useAuth();
  if (loading) return <div style={{ color: 'var(--text-color)', textAlign: 'center', padding: '4rem' }}>Loading...</div>;
  if (!currentUser) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) return <Navigate to="/" replace />;
  return children;
}

function DefaultRedirect() {
  const { currentUser } = useAuth();
  const role = currentUser?.role;
  if (role === 'mentor') return <Navigate to="/mentor" replace />;
  if (role === 'admin') return <Navigate to="/admin-overview" replace />;
  return <Navigate to="/home" replace />;
}

export default function App() {
  const { currentUser, loading, appReady } = useAuth();
  const [splash, setSplash] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  if (splash) return <SplashScreen onDone={() => setSplash(false)} />;
  if (!appReady || loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', color: 'var(--text-color)' }}>
      <div style={{ textAlign: 'center' }}>
        <img src="/logo.png" alt="Logo" style={{ width: 60, height: 60, borderRadius: '50%', marginBottom: '1rem', animation: 'pulse 1.5s infinite' }} />
        <p>Initializing Gram Shiksha...</p>
      </div>
    </div>
  );

  return (
    <>
      {currentUser && (
        <>
          <Navbar onHamburger={() => setMenuOpen(true)} />
          <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
      )}

      <main className="main-content" id="mainContent" style={{ display: 'block' }}>
        <Routes>
          <Route path="/login" element={currentUser ? <DefaultRedirect /> : <LoginPage />} />

          {/* Student Routes */}
          <Route path="/home" element={<ProtectedRoute allowedRoles={['student']}><StudentHome /></ProtectedRoute>} />
          <Route path="/liveclass" element={<ProtectedRoute allowedRoles={['student']}><LiveClass /></ProtectedRoute>} />
          <Route path="/assignments" element={<ProtectedRoute allowedRoles={['student']}><Assignments /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute allowedRoles={['student']}><History /></ProtectedRoute>} />
          <Route path="/aidoubt" element={<ProtectedRoute allowedRoles={['student']}><AiDoubt /></ProtectedRoute>} />
          <Route path="/schedule" element={<ProtectedRoute allowedRoles={['student']}><Schedule /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

          {/* Mentor Routes */}
          <Route path="/mentor" element={<ProtectedRoute allowedRoles={['mentor']}><MentorHome /></ProtectedRoute>} />
          <Route path="/mentor-live" element={<ProtectedRoute allowedRoles={['mentor']}><LiveSessions /></ProtectedRoute>} />
          <Route path="/mentor-schedule" element={<ProtectedRoute allowedRoles={['mentor']}><ScheduleManage /></ProtectedRoute>} />
          <Route path="/mentor-attendance" element={<ProtectedRoute allowedRoles={['mentor']}><Attendance /></ProtectedRoute>} />
          <Route path="/mentor-permissions" element={<ProtectedRoute allowedRoles={['mentor']}><Permissions /></ProtectedRoute>} />
          <Route path="/mentor-assignments" element={<ProtectedRoute allowedRoles={['mentor']}><MentorAssignments /></ProtectedRoute>} />
          <Route path="/mentor-materials" element={<ProtectedRoute allowedRoles={['mentor']}><StudyMaterials /></ProtectedRoute>} />
          <Route path="/mentor-aireschedule" element={<ProtectedRoute allowedRoles={['mentor']}><AiReschedule /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin-overview" element={<ProtectedRoute allowedRoles={['admin']}><AdminOverview /></ProtectedRoute>} />
          <Route path="/admin-users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin-auth" element={<ProtectedRoute allowedRoles={['admin']}><AdminAuth /></ProtectedRoute>} />
          <Route path="/admin-activity" element={<ProtectedRoute allowedRoles={['admin']}><AdminActivity /></ProtectedRoute>} />
          <Route path="/admin-reports" element={<ProtectedRoute allowedRoles={['admin']}><AdminReports /></ProtectedRoute>} />

          {/* Default */}
          <Route path="*" element={currentUser ? <DefaultRedirect /> : <LoginPage />} />
        </Routes>
      </main>

      {currentUser && <ChatbotWidget />}
    </>
  );
}
