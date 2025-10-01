import React, { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { Mic, MicOff } from 'lucide-react';

const LoginPage = ({ onLogin, darkMode }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [farmerCard, setFarmerCard] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const { speak } = useSpeechSynthesis();

  const translations = {
    english: {
      title: 'KRISHIMITRA',
      subtitle: 'Your Agricultural Companion',
      tagline: 'Advanced agricultural guidance, weather alerts, and community support - all in your language. Empowering farmers with technology for better harvests.',
      phonePlaceholder: 'Enter Phone Number',
      cardPlaceholder: 'Enter Farmer Card Number',
      loginButton: 'Login',
      voiceLogin: 'Voice Login',
      speakInstructions: 'Speak your phone number and farmer card number',
      welcome: 'Welcome to KRISHIMITRA!'
    },
    hindi: {
      title: 'कृषिमित्र',
      subtitle: 'आपका कृषि साथी',
      tagline: 'उन्नत कृषि मार्गदर्शन, मौसम की चेतावनी और समुदाय सहायता - आपकी भाषा में। बेहतर फसल के लिए किसानों को प्रौद्योगिकी से सशक्त बनाना।',
      phonePlaceholder: 'फोन नंबर दर्ज करें',
      cardPlaceholder: 'किसान कार्ड नंबर दर्ज करें',
      loginButton: 'लॉगिन करें',
      voiceLogin: 'आवाज़ से लॉगिन',
      speakInstructions: 'अपना फोन नंबर और किसान कार्ड नंबर बोलें',
      welcome: 'कृषिमित्र में आपका स्वागत है!'
    },
    punjabi: {
      title: 'ਕ੍ਰਿਸ਼ਿਮਿਤ੍ਰਾ',
      subtitle: 'ਤੁਹਾਡਾ ਖੇਤੀਬਾੜੀ ਸਾਥੀ',
      tagline: 'ਉੱਨਤ ਖੇਤੀਬਾੜੀ ਮਾਰਗਦਰਸ਼ਨ, ਮੌਸਮ ਦੀਆਂ ਚੇਤਾਵਨੀਆਂ ਅਤੇ ਕਮਿਊਨਿਟੀ ਸਹਾਇਤਾ - ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ। ਬਿਹਤਰ ਫਸਲਾਂ ਲਈ ਕਿਸਾਨਾਂ ਨੂੰ ਤਕਨਾਲੋਜੀ ਨਾਲ ਸਸ਼ਕਤ ਬਣਾਉਣਾ।',
      phonePlaceholder: 'ਫੋਨ ਨੰਬਰ ਦਰਜ ਕਰੋ',
      cardPlaceholder: 'ਕਿਸਾਨ ਕਾਰਡ ਨੰਬਰ ਦਰਜ ਕਰੋ',
      loginButton: 'ਲੌਗਇਨ ਕਰੋ',
      voiceLogin: 'ਆਵਾਜ਼ ਨਾਲ ਲੌਗਇਨ',
      speakInstructions: 'ਆਪਣਾ ਫੋਨ ਨੰਬਰ ਅਤੇ ਕਿਸਾਨ ਕਾਰਡ ਨੰਬਰ ਬੋਲੋ',
      welcome: 'ਕ੍ਰਿਸ਼ਿਮਿਤ੍ਰਾ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ!'
    }
  };

  const [currentLang, setCurrentLang] = useState('english');
  const t = translations[currentLang];

  const initializeSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = currentLang === 'hindi' ? 'hi-IN' : currentLang === 'punjabi' ? 'pa-IN' : 'en-IN';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript.includes('phone') || /[0-9]{10}/.test(transcript)) {
          const phoneMatch = transcript.match(/[0-9]{10}/);
          if (phoneMatch) setPhoneNumber(phoneMatch[0]);
        }
        if (transcript.includes('card') || transcript.includes('farmer')) {
          const cardMatch = transcript.match(/[0-9]+/g);
          if (cardMatch) setFarmerCard(cardMatch.join(''));
        }
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      
      setSpeechRecognition(recognition);
      return recognition;
    }
    return null;
  };

  const handleVoiceLogin = () => {
    if (!isListening) {
      setIsListening(true);
      speak({ text: t.speakInstructions });
      
      // Initialize speech recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = currentLang === 'hindi' ? 'hi-IN' : currentLang === 'punjabi' ? 'pa-IN' : 'en-IN';
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          
          // Extract phone number and farmer card from transcript
          const phoneMatch = transcript.match(/\b\d{10}\b/);
          const cardMatch = transcript.match(/\b\d{4,}\b/g);
          
          if (phoneMatch) {
            setPhoneNumber(phoneMatch[0]);
            speak({ text: `Phone number: ${phoneMatch[0]}` });
          }
          
          if (cardMatch && cardMatch.length > 1) {
            setFarmerCard(cardMatch[1]); // Take the second number as farmer card
            speak({ text: `Farmer card: ${cardMatch[1]}` });
          }
          
          setIsListening(false);
        };
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          speak({ text: 'Sorry, I could not hear you clearly. Please try again.' });
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        setSpeechRecognition(recognition);
        recognition.start();
      } else {
        // Fallback for browsers without speech recognition
        setTimeout(() => {
          setPhoneNumber('9876543210');
          setFarmerCard('12345');
          setIsListening(false);
          speak({ text: 'Voice recognition not available. Using sample credentials.' });
        }, 2000);
      }
    } else {
      setIsListening(false);
      if (speechRecognition) {
        speechRecognition.stop();
      }
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (phoneNumber && farmerCard) {
      const userData = {
        phoneNumber,
        farmerCard,
        name: `Farmer ${phoneNumber.slice(-4)}`,
        joinDate: new Date().toISOString(),
        language: currentLang
      };
      onLogin(userData);
      speak({ text: t.welcome });
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-green-100 to-yellow-100'}`}>
      <div className={`farmer-card max-w-md w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-farmer-green'}`}>
            {t.title}
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-earth-brown'}`}>
            {t.subtitle}
          </p>
        </div>

        {/* Tagline */}
        <div className={`p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
          <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t.tagline}
          </p>
        </div>

        {/* Language Switcher */}
        <div className="flex justify-center gap-2 mb-6">
          {Object.keys(translations).map((lang) => (
            <button
              key={lang}
              onClick={() => setCurrentLang(lang)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                currentLang === lang
                  ? 'bg-farmer-green text-white'
                  : darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder={t.phonePlaceholder}
              className={`w-full p-4 border-2 rounded-lg text-lg focus:outline-none focus:border-farmer-green ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              required
            />
          </div>

          <div>
            <input
              type="text"
              value={farmerCard}
              onChange={(e) => setFarmerCard(e.target.value)}
              placeholder={t.cardPlaceholder}
              className={`w-full p-4 border-2 rounded-lg text-lg focus:outline-none focus:border-farmer-green ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 farmer-button"
            >
              {t.loginButton}
            </button>
            
            <button
              type="button"
              onClick={handleVoiceLogin}
              className={`voice-button ${isListening ? 'bg-red-600' : ''}`}
              title={t.voiceLogin}
            >
              {isListening ? <MicOff size={24} /> : <Mic size={24} />}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Supported by Punjab Agricultural University (PAU)
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
