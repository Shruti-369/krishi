import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';
import { 
  Home, 
  Crop, 
  Users, 
  Building2, 
  LogOut, 
  Sun, 
  Moon,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const Navbar = ({ user, onLogout, darkMode, toggleDarkMode, language, setLanguage }) => {
  const location = useLocation();
  const { speak } = useSpeechSynthesis();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const translations = {
    english: {
      dashboard: 'Dashboard',
      cropAdvisory: 'Crop Advisory',
      community: 'Community',
      govPortals: 'Government Portals',
      logout: 'Logout',
      welcome: 'Welcome'
    },
    hindi: {
      dashboard: 'डैशबोर्ड',
      cropAdvisory: 'फसल सलाह',
      community: 'समुदाय',
      govPortals: 'सरकारी पोर्टल',
      logout: 'लॉगआउट',
      welcome: 'स्वागत'
    },
    punjabi: {
      dashboard: 'ਡੈਸ਼ਬੋਰਡ',
      cropAdvisory: 'ਫਸਲ ਸਲਾਹ',
      community: 'ਕਮਿਊਨਿਟੀ',
      govPortals: 'ਸਰਕਾਰੀ ਪੋਰਟਲ',
      logout: 'ਲੌਗਆਉਟ',
      welcome: 'ਸਵਾਗਤ'
    }
  };

  const t = translations[language];

  const navItems = [
    { path: '/dashboard', icon: Home, label: t.dashboard },
    { path: '/crop-advisory', icon: Crop, label: t.cropAdvisory },
    { path: '/community', icon: Users, label: t.community },
    { path: '/government-portals', icon: Building2, label: t.govPortals }
  ];

  const handleLogout = () => {
    speak({ text: 'Goodbye! Thank you for using KRISHIMITRA' });
    onLogout();
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    speak({ text: `Language changed to ${lang}` });
  };

  return (
    <nav className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-lg sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-farmer-green' : 'bg-farmer-green'}`}>
                <Crop className="w-6 h-6 text-white" />
              </div>
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-farmer-green'}`}>
                KRISHIMITRA
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? darkMode
                        ? 'bg-farmer-green text-white'
                        : 'bg-green-100 text-farmer-green'
                      : darkMode
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center space-x-1">
              {['english', 'hindi', 'punjabi'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    language === lang
                      ? 'bg-farmer-green text-white'
                      : darkMode
                        ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {lang.charAt(0).toUpperCase()}
                </button>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? 'text-yellow-400 hover:bg-gray-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* User Info */}
            <div className="hidden sm:flex items-center space-x-2">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.welcome}, {user?.name}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                darkMode
                  ? 'text-red-400 hover:bg-red-900 hover:text-red-300'
                  : 'text-red-600 hover:bg-red-50 hover:text-red-700'
              }`}
            >
              <LogOut size={20} />
              <span className="hidden sm:inline font-medium">{t.logout}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={`md:hidden py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? darkMode
                          ? 'bg-farmer-green text-white'
                          : 'bg-green-100 text-farmer-green'
                        : darkMode
                          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center space-x-2 px-4 py-2">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Language:</span>
                {['english', 'hindi', 'punjabi'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      handleLanguageChange(lang);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      language === lang
                        ? 'bg-farmer-green text-white'
                        : darkMode
                          ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {lang.charAt(0).toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
