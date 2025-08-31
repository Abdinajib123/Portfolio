import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/auth/Login';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Dashboard from './components/dashboard/Dashboard';
import ProjectForm from './components/dashboard/ProjectForm';
import ProjectsList from './components/dashboard/ProjectsList';
import SkillForm from './components/dashboard/SkillForm';
import SkillsList from './components/dashboard/SkillsList';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Portfolio Component with anchor link handling
const Portfolio = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle anchor links for smooth scrolling
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Projects Management */}
          <Route 
            path="/dashboard/projects" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ProjectsList />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/projects/new" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ProjectForm />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/projects/:id/edit" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ProjectForm />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Skills Management */}
          <Route 
            path="/dashboard/skills" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SkillsList />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/skills/new" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SkillForm />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard/skills/:id/edit" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <SkillForm />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </AuthProvider>
  );
}

export default App;