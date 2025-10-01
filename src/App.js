import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import CropAdvisory from './components/CropAdvisory';
import Community from './components/Community';
import GovernmentPortals from './components/GovernmentPortals';
import Navbar from './components/Navbar';
import LanguageContext from './contexts/LanguageContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('english');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('krishimitra_user');
    const savedAuth = localStorage.getItem('krishimitra_auth');
    
    if (savedUser && savedAuth === 'true') {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }

    // Check for dark mode preference
    const savedDarkMode = localStorage.getItem('krishimitra_dark_mode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('krishimitra_dark_mode', darkMode.toString());
  }, [darkMode]);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('krishimitra_user', JSON.stringify(userData));
    localStorage.setItem('krishimitra_auth', 'true');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('krishimitra_user');
    localStorage.removeItem('krishimitra_auth');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <Router>
          {isAuthenticated && (
            <Navbar 
              user={user} 
              onLogout={handleLogout}
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
              language={language}
              setLanguage={setLanguage}
            />
          )}
          
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <LoginPage onLogin={handleLogin} darkMode={darkMode} />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? 
                <Dashboard user={user} darkMode={darkMode} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/crop-advisory" 
              element={
                isAuthenticated ? 
                <CropAdvisory user={user} darkMode={darkMode} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/community" 
              element={
                isAuthenticated ? 
                <Community user={user} darkMode={darkMode} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/government-portals" 
              element={
                isAuthenticated ? 
                <GovernmentPortals user={user} darkMode={darkMode} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/" 
              element={
                isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Navigate to="/login" replace />
              } 
            />
          </Routes>
        </Router>
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
