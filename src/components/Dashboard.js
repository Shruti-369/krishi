import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';
import { 
  Crop, 
  Cloud, 
  Camera, 
  MapPin, 
  TrendingUp,
  AlertTriangle,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Mic,
  MicOff
} from 'lucide-react';
import LanguageContext from '../contexts/LanguageContext';

const Dashboard = ({ user, darkMode }) => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [farmerProfile, setFarmerProfile] = useState({
    farmSize: '',
    farmingYears: '',
    cropHistory: '',
    soilType: ''
  });
  const [isListening, setIsListening] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const { speak } = useSpeechSynthesis();

  const { language } = React.useContext(LanguageContext);

  const translations = {
    english: {
      welcome: 'Welcome to KRISHIMITRA',
      tagline: 'Advanced agricultural guidance, weather alerts, and community support - all in your language. Empowering farmers with technology for better harvests.',
      dashboard: 'Dashboard',
      profile: 'Farmer Profile',
      weather: 'Weather Alerts',
      upload: 'Upload Crop/Soil Image',
      cropAdvisory: 'Crop Advisory',
      community: 'Community',
      govPortals: 'Government Portals',
      farmSize: 'Farm Size (acres)',
      farmingYears: 'Years of Farming',
      cropHistory: 'Crop History',
      soilType: 'Soil Type',
      saveProfile: 'Save Profile',
      captureImage: 'Capture Image',
      selectImage: 'Select Image',
      analyzeImage: 'Analyze Image',
      currentWeather: 'Current Weather',
      location: 'Location',
      temperature: 'Temperature',
      humidity: 'Humidity',
      windSpeed: 'Wind Speed',
      weatherAlert: 'Weather Alert',
      noAlerts: 'No weather alerts',
      quickActions: 'Quick Actions',
      voiceSearch: 'Voice Search',
      recentSearches: 'Recent Searches',
      helpLine: 'Help Line: +91-9876543210'
    },
    hindi: {
      welcome: 'कृषिमित्र में आपका स्वागत है',
      tagline: 'उन्नत कृषि मार्गदर्शन, मौसम की चेतावनी और समुदाय सहायता - आपकी भाषा में। बेहतर फसल के लिए किसानों को प्रौद्योगिकी से सशक्त बनाना।',
      dashboard: 'डैशबोर्ड',
      profile: 'किसान प्रोफाइल',
      weather: 'मौसम चेतावनी',
      upload: 'फसल/मिट्टी की तस्वीर अपलोड करें',
      cropAdvisory: 'फसल सलाह',
      community: 'समुदाय',
      govPortals: 'सरकारी पोर्टल',
      farmSize: 'खेत का आकार (एकड़)',
      farmingYears: 'कृषि के वर्ष',
      cropHistory: 'फसल इतिहास',
      soilType: 'मिट्टी का प्रकार',
      saveProfile: 'प्रोफाइल सेव करें',
      captureImage: 'तस्वीर लें',
      selectImage: 'तस्वीर चुनें',
      analyzeImage: 'तस्वीर का विश्लेषण करें',
      currentWeather: 'वर्तमान मौसम',
      location: 'स्थान',
      temperature: 'तापमान',
      humidity: 'आर्द्रता',
      windSpeed: 'हवा की गति',
      weatherAlert: 'मौसम चेतावनी',
      noAlerts: 'कोई मौसम चेतावनी नहीं',
      quickActions: 'त्वरित कार्य',
      voiceSearch: 'आवाज खोज',
      recentSearches: 'हाल की खोजें',
      helpLine: 'हेल्प लाइन: +91-9876543210'
    },
    punjabi: {
      welcome: 'ਕ੍ਰਿਸ਼ਿਮਿਤ੍ਰਾ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ',
      tagline: 'ਉੱਨਤ ਖੇਤੀਬਾੜੀ ਮਾਰਗਦਰਸ਼ਨ, ਮੌਸਮ ਦੀਆਂ ਚੇਤਾਵਨੀਆਂ ਅਤੇ ਕਮਿਊਨਿਟੀ ਸਹਾਇਤਾ - ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ। ਬਿਹਤਰ ਫਸਲਾਂ ਲਈ ਕਿਸਾਨਾਂ ਨੂੰ ਤਕਨਾਲੋਜੀ ਨਾਲ ਸਸ਼ਕਤ ਬਣਾਉਣਾ।',
      dashboard: 'ਡੈਸ਼ਬੋਰਡ',
      profile: 'ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ',
      weather: 'ਮੌਸਮ ਚੇਤਾਵਨੀ',
      upload: 'ਫਸਲ/ਮਿੱਟੀ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ',
      cropAdvisory: 'ਫਸਲ ਸਲਾਹ',
      community: 'ਕਮਿਊਨਿਟੀ',
      govPortals: 'ਸਰਕਾਰੀ ਪੋਰਟਲ',
      farmSize: 'ਖੇਤ ਦਾ ਆਕਾਰ (ਏਕੜ)',
      farmingYears: 'ਖੇਤੀਬਾੜੀ ਦੇ ਸਾਲ',
      cropHistory: 'ਫਸਲ ਇਤਿਹਾਸ',
      soilType: 'ਮਿੱਟੀ ਦਾ ਪ੍ਰਕਾਰ',
      saveProfile: 'ਪ੍ਰੋਫਾਈਲ ਸੇਵ ਕਰੋ',
      captureImage: 'ਤਸਵੀਰ ਲਓ',
      selectImage: 'ਤਸਵੀਰ ਚੁਣੋ',
      analyzeImage: 'ਤਸਵੀਰ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ',
      currentWeather: 'ਮੌਜੂਦਾ ਮੌਸਮ',
      location: 'ਟਿਕਾਣਾ',
      temperature: 'ਤਾਪਮਾਨ',
      humidity: 'ਨਮੀ',
      windSpeed: 'ਹਵਾ ਦੀ ਗਤੀ',
      weatherAlert: 'ਮੌਸਮ ਚੇਤਾਵਨੀ',
      noAlerts: 'ਕੋਈ ਮੌਸਮ ਚੇਤਾਵਨੀ ਨਹੀਂ',
      quickActions: 'ਤੇਜ਼ ਕਾਰਵਾਈਆਂ',
      voiceSearch: 'ਆਵਾਜ਼ ਖੋਜ',
      recentSearches: 'ਹਾਲੀਆ ਖੋਜਾਂ',
      helpLine: 'ਹੈਲਪ ਲਾਈਨ: +91-9876543210'
    }
  };

  const t = translations[language];

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchWeather(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Punjab coordinates
          setLocation({ latitude: 30.7333, longitude: 76.7794 });
          fetchWeather(30.7333, 76.7794);
        }
      );
    } else {
      // Default to Punjab coordinates
      setLocation({ latitude: 30.7333, longitude: 76.7794 });
      fetchWeather(30.7333, 76.7794);
    }
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      // Mock weather data - in real app, use OpenWeather API
      const mockWeather = {
        temperature: 28,
        humidity: 65,
        windSpeed: 12,
        description: 'Partly Cloudy',
        alerts: [
          { type: 'warning', message: 'Heavy rainfall expected in next 2 days' },
          { type: 'info', message: 'Optimal conditions for wheat planting' }
        ]
      };
      setWeather(mockWeather);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const handleProfileSave = () => {
    localStorage.setItem('farmer_profile', JSON.stringify(farmerProfile));
    speak({ text: 'Profile saved successfully' });
  };

  const handleImageCapture = () => {
    // Simulate image capture
    setCapturedImage('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...');
  };

  const handleImageAnalysis = () => {
    speak({ text: 'Analyzing image for disease and pest detection' });
    // Simulate analysis
    setTimeout(() => {
      alert('Analysis complete: No diseases detected. Soil appears healthy.');
    }, 2000);
  };

  const handleVoiceSearch = () => {
    if (!isListening) {
      setIsListening(true);
      speak({ text: 'Please speak your question or search query' });
      
      // Initialize speech recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = language === 'hindi' ? 'hi-IN' : language === 'punjabi' ? 'pa-IN' : 'en-IN';
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setIsListening(false);
          speak({ text: `You searched for: ${transcript}` });
          
          // Redirect to crop advisory with the search query
          window.location.href = `/crop-advisory?search=${encodeURIComponent(transcript)}`;
        };
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          speak({ text: 'Sorry, I could not hear you clearly. Please try again.' });
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognition.start();
      } else {
        // Fallback for browsers without speech recognition
        setTimeout(() => {
          setIsListening(false);
          speak({ text: 'Voice recognition not available. Please use the search feature in crop advisory.' });
          window.location.href = '/crop-advisory';
        }, 2000);
      }
    } else {
      setIsListening(false);
    }
  };

  const quickActions = [
    { 
      title: t.cropAdvisory, 
      icon: Crop, 
      link: '/crop-advisory',
      color: 'bg-green-500 hover:bg-green-600'
    },
    { 
      title: t.community, 
      icon: TrendingUp, 
      link: '/community',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    { 
      title: t.govPortals, 
      icon: MapPin, 
      link: '/government-portals',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  return (
    <div className={`min-h-screen p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-farmer-green'}`}>
            {t.welcome}
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t.tagline}
          </p>
        </div>

        {/* Weather Alerts */}
        {weather && (
          <div className={`farmer-card mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Cloud className="w-6 h-6 mr-2 text-blue-500" />
                {t.weather}
              </h2>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.location}: {location?.latitude?.toFixed(2)}, {location?.longitude?.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <Thermometer className="w-8 h-8 mx-auto mb-2 text-red-500" />
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {weather.temperature}°C
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.temperature}
                </p>
              </div>
              <div className="text-center">
                <Droplets className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {weather.humidity}%
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.humidity}
                </p>
              </div>
              <div className="text-center">
                <Wind className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {weather.windSpeed} km/h
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.windSpeed}
                </p>
              </div>
              <div className="text-center">
                <Eye className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {weather.description}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t.currentWeather}
                </p>
              </div>
            </div>

            {/* Weather Alerts */}
            {weather.alerts && weather.alerts.length > 0 ? (
              <div className="space-y-2">
                {weather.alerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`weather-alert ${alert.type} ${darkMode ? 'bg-opacity-20' : ''}`}
                  >
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {alert.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.noAlerts}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Farmer Profile */}
          <div className={`farmer-card ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {t.profile}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.farmSize}
                </label>
                <input
                  type="number"
                  value={farmerProfile.farmSize}
                  onChange={(e) => setFarmerProfile({...farmerProfile, farmSize: e.target.value})}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:border-farmer-green ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter farm size"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.farmingYears}
                </label>
                <input
                  type="number"
                  value={farmerProfile.farmingYears}
                  onChange={(e) => setFarmerProfile({...farmerProfile, farmingYears: e.target.value})}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:border-farmer-green ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Years of experience"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.cropHistory}
                </label>
                <textarea
                  value={farmerProfile.cropHistory}
                  onChange={(e) => setFarmerProfile({...farmerProfile, cropHistory: e.target.value})}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:border-farmer-green ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  rows="3"
                  placeholder="List previous crops grown"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.soilType}
                </label>
                <select
                  value={farmerProfile.soilType}
                  onChange={(e) => setFarmerProfile({...farmerProfile, soilType: e.target.value})}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:border-farmer-green ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Select soil type</option>
                  <option value="clay">Clay</option>
                  <option value="sandy">Sandy</option>
                  <option value="loamy">Loamy</option>
                  <option value="silty">Silty</option>
                </select>
              </div>

              <button
                onClick={handleProfileSave}
                className="w-full farmer-button"
              >
                {t.saveProfile}
              </button>
            </div>
          </div>

          {/* Image Upload */}
          <div className={`farmer-card ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {t.upload}
            </h2>
            
            <div className="space-y-4">
              {capturedImage ? (
                <div className="text-center">
                  <img 
                    src={capturedImage} 
                    alt="Captured" 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <button
                    onClick={handleImageAnalysis}
                    className="w-full farmer-button mb-2"
                  >
                    {t.analyzeImage}
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Capture or select an image
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleImageCapture}
                  className="flex-1 farmer-button"
                >
                  <Camera className="w-5 h-5 inline mr-2" />
                  {t.captureImage}
                </button>
                <button
                  onClick={() => document.getElementById('fileInput').click()}
                  className="flex-1 farmer-button"
                >
                  <Eye className="w-5 h-5 inline mr-2" />
                  {t.selectImage}
                </button>
              </div>
              
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => setCapturedImage(e.target.result);
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className={`farmer-card ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {t.quickActions}
            </h2>
            
            <div className="space-y-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.link}
                    className={`flex items-center justify-between p-4 rounded-lg text-white transition-colors ${action.color}`}
                  >
                    <div className="flex items-center">
                      <Icon className="w-6 h-6 mr-3" />
                      <span className="font-medium">{action.title}</span>
                    </div>
                    <span className="text-xl">→</span>
                  </Link>
                );
              })}

              <button
                onClick={handleVoiceSearch}
                className={`w-full p-4 rounded-lg transition-colors flex items-center justify-center ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : darkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
                {t.voiceSearch}
              </button>
            </div>
          </div>
        </div>

        {/* Recent Searches */}
        <div className={`farmer-card mt-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t.recentSearches}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Wheat Diseases</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>2 days ago</p>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Soil Testing</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>1 week ago</p>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Rice Varieties</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>2 weeks ago</p>
            </div>
          </div>
        </div>

        {/* Help Line */}
        <div className={`text-center mt-8 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-farmer-green'}`}>
          <p className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-white'}`}>
            {t.helpLine}
          </p>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-green-100'}`}>
            Available 24/7 for agricultural support
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
