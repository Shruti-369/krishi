import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight,
  GraduationCap,
  Shield,
  DollarSign,
  Scale,
  FileText,
  TrendingUp
} from 'lucide-react';
import LanguageContext from '../contexts/LanguageContext';

const GovernmentPortals = ({ user, darkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const { speak } = useSpeechSynthesis();

  const { language } = React.useContext(LanguageContext);

  const translations = {
    english: {
      title: 'Government Portals',
      subtitle: 'Access official agricultural services and schemes',
      pauPortal: 'Punjab Agricultural University Portal',
      pauDesc: 'Research, education, and extension services for farmers',
      kisanSuvidha: 'Kisan Suvidha',
      kisanDesc: 'Government of India\'s farmer information portal',
      pmKisan: 'PM-Kisan Samman Nidhi',
      pmKisanDesc: 'Direct income support scheme for farmers',
      mandiBoard: 'Mandi Board Punjab',
      mandiDesc: 'Agricultural marketing and price information',
      myScheme: 'myScheme Portal',
      mySchemeDesc: 'Government schemes and benefits information',
      eNam: 'eNAM',
      eNamDesc: 'National Agriculture Market for online trading',
      visitPortal: 'Visit Portal',
      learnMore: 'Learn More',
      officialPortal: 'Official Portal',
      trustedSource: 'Trusted Government Source',
      carouselControls: 'Use arrows to navigate portals'
    },
    hindi: {
      title: 'सरकारी पोर्टल',
      subtitle: 'आधिकारिक कृषि सेवाओं और योजनाओं तक पहुंचें',
      pauPortal: 'पंजाब कृषि विश्वविद्यालय पोर्टल',
      pauDesc: 'किसानों के लिए अनुसंधान, शिक्षा और विस्तार सेवाएं',
      kisanSuvidha: 'किसान सुविधा',
      kisanDesc: 'भारत सरकार का किसान सूचना पोर्टल',
      pmKisan: 'पीएम-किसान सम्मान निधि',
      pmKisanDesc: 'किसानों के लिए प्रत्यक्ष आय सहायता योजना',
      mandiBoard: 'मंडी बोर्ड पंजाब',
      mandiDesc: 'कृषि विपणन और मूल्य सूचना',
      myScheme: 'माई स्कीम पोर्टल',
      mySchemeDesc: 'सरकारी योजनाएं और लाभ सूचना',
      eNam: 'ई-नाम',
      eNamDesc: 'ऑनलाइन व्यापार के लिए राष्ट्रीय कृषि बाजार',
      visitPortal: 'पोर्टल पर जाएं',
      learnMore: 'और जानें',
      officialPortal: 'आधिकारिक पोर्टल',
      trustedSource: 'विश्वसनीय सरकारी स्रोत',
      carouselControls: 'पोर्टल नेविगेट करने के लिए तीरों का उपयोग करें'
    },
    punjabi: {
      title: 'ਸਰਕਾਰੀ ਪੋਰਟਲ',
      subtitle: 'ਅਧਿਕਾਰਿਕ ਖੇਤੀਬਾੜੀ ਸੇਵਾਵਾਂ ਅਤੇ ਯੋਜਨਾਵਾਂ ਤੱਕ ਪਹੁੰਚ',
      pauPortal: 'ਪੰਜਾਬ ਖੇਤੀਬਾੜੀ ਯੂਨੀਵਰਸਿਟੀ ਪੋਰਟਲ',
      pauDesc: 'ਕਿਸਾਨਾਂ ਲਈ ਖੋਜ, ਸਿੱਖਿਆ ਅਤੇ ਵਿਸਤਾਰ ਸੇਵਾਵਾਂ',
      kisanSuvidha: 'ਕਿਸਾਨ ਸੁਵਿਧਾ',
      kisanDesc: 'ਭਾਰਤ ਸਰਕਾਰ ਦਾ ਕਿਸਾਨ ਜਾਣਕਾਰੀ ਪੋਰਟਲ',
      pmKisan: 'ਪੀਐੱਮ-ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ',
      pmKisanDesc: 'ਕਿਸਾਨਾਂ ਲਈ ਪ੍ਰਤੱਖ ਆਮਦਨ ਸਹਾਇਤਾ ਯੋਜਨਾ',
      mandiBoard: 'ਮੰਡੀ ਬੋਰਡ ਪੰਜਾਬ',
      mandiDesc: 'ਖੇਤੀਬਾੜੀ ਮਾਰਕੀਟਿੰਗ ਅਤੇ ਕੀਮਤ ਜਾਣਕਾਰੀ',
      myScheme: 'ਮਾਈ ਸਕੀਮ ਪੋਰਟਲ',
      mySchemeDesc: 'ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਅਤੇ ਲਾਭ ਜਾਣਕਾਰੀ',
      eNam: 'ਈ-ਨਾਮ',
      eNamDesc: 'ਔਨਲਾਈਨ ਵਪਾਰ ਲਈ ਰਾਸ਼ਟਰੀ ਖੇਤੀਬਾੜੀ ਬਾਜ਼ਾਰ',
      visitPortal: 'ਪੋਰਟਲ ਤੇ ਜਾਓ',
      learnMore: 'ਹੋਰ ਜਾਣੋ',
      officialPortal: 'ਅਧਿਕਾਰਿਕ ਪੋਰਟਲ',
      trustedSource: 'ਭਰੋਸੇਮੰਦ ਸਰਕਾਰੀ ਸਰੋਤ',
      carouselControls: 'ਪੋਰਟਲ ਨੈਵੀਗੇਟ ਕਰਨ ਲਈ ਤੀਰਾਂ ਦਾ ਇਸਤੇਮਾਲ ਕਰੋ'
    }
  };

  const t = translations[language];

  const portals = [
    {
      id: 1,
      title: t.pauPortal,
      description: t.pauDesc,
      icon: GraduationCap,
      url: 'https://www.pau.edu/index.php', // Direct PAU homepage
      color: 'bg-blue-500',
      category: 'Education & Research'
    },
    {
      id: 2,
      title: t.kisanSuvidha,
      description: t.kisanDesc,
      icon: Shield,
      url: 'https://www.kisansuvidha.gov.in',
      color: 'bg-green-500',
      category: 'Information'
    },
    {
      id: 3,
      title: t.pmKisan,
      description: t.pmKisanDesc,
      icon: DollarSign,
      url: 'https://pmkisan.gov.in',
      color: 'bg-yellow-500',
      category: 'Financial Support'
    },
    {
      id: 4,
      title: t.mandiBoard,
      description: t.mandiDesc,
      icon: Scale,
      url: 'https://psamb.gov.in', // Punjab State Agricultural Marketing Board
      color: 'bg-purple-500',
      category: 'Marketing'
    },
    {
      id: 5,
      title: t.myScheme,
      description: t.mySchemeDesc,
      icon: FileText,
      url: 'https://www.myscheme.gov.in',
      color: 'bg-indigo-500',
      category: 'Government Schemes'
    },
    {
      id: 6,
      title: t.eNam,
      description: t.eNamDesc,
      icon: TrendingUp,
      url: 'https://www.enam.gov.in',
      color: 'bg-red-500',
      category: 'Trading'
    }
  ];

  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % portals.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [autoSlide, portals.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % portals.length);
    setAutoSlide(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + portals.length) % portals.length);
    setAutoSlide(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setAutoSlide(false);
  };

  const currentPortal = portals[currentIndex];
  const Icon = currentPortal.icon;

  return (
    <div className={`min-h-screen p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-farmer-green'}`}>
            {t.title}
          </h1>
          <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t.subtitle}
          </p>
        </div>

        {/* Carousel Container */}
        <div className={`farmer-card ${darkMode ? 'bg-gray-800' : 'bg-white'} relative overflow-hidden`}>
          {/* Main Portal Display */}
          <div className="relative">
            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full ${
                darkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } shadow-lg transition-colors`}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextSlide}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full ${
                darkMode 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } shadow-lg transition-colors`}
            >
              <ChevronRight size={24} />
            </button>

            {/* Portal Card */}
            <div className="px-12 py-6">
              <div className="text-center">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${currentPortal.color} mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h2 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {currentPortal.title}
                </h2>

                {/* Category Badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}>
                  {currentPortal.category}
                </span>

                {/* Description */}
                <p className={`text-base mb-6 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {currentPortal.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={currentPortal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => speak({ text: `Opening ${currentPortal.title}` })}
                    className="farmer-button flex items-center justify-center"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    {t.visitPortal}
                  </a>
                  
                  <button
                    onClick={() => speak({ text: currentPortal.description })}
                    className={`px-6 py-4 rounded-lg font-semibold text-lg shadow-lg transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {t.learnMore}
                  </button>
                </div>

                {/* Official Badge */}
                <div className={`inline-flex items-center mt-6 px-4 py-2 rounded-full ${
                  darkMode ? 'bg-green-800' : 'bg-green-100'
                }`}>
                  <Shield className={`w-5 h-5 mr-2 ${darkMode ? 'text-green-300' : 'text-green-600'}`} />
                  <span className={`text-sm font-medium ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                    {t.trustedSource}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 pb-6">
            {portals.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-farmer-green'
                    : darkMode
                      ? 'bg-gray-600 hover:bg-gray-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* All Portals Grid */}
        <div className="mt-12">
          <h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            All Government Portals
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portals.map((portal) => {
              const PortalIcon = portal.icon;
              return (
                <a
                  key={portal.id}
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`farmer-card ${darkMode ? 'bg-gray-800' : 'bg-white'} hover:shadow-xl transition-shadow`}
                  onClick={() => speak({ text: `Opening ${portal.title}` })}
                >
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${portal.color} mb-4`}>
                      <PortalIcon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {portal.title}
                    </h3>
                    
                    <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {portal.description}
                    </p>
                    
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {portal.category}
                    </span>
                    
                    <div className="mt-4">
                      <span className="text-farmer-green hover:text-green-700 font-medium text-sm inline-flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        {t.visitPortal}
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Help Text */}
        <div className={`text-center mt-8 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-blue-800'}`}>
            {t.carouselControls}
          </p>
        </div>

        {/* Quick Access Links */}
        <div className={`farmer-card mt-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Quick Access
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <a
              href="https://www.pau.edu"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 rounded-lg text-center transition-colors ${
                darkMode 
                  ? 'bg-blue-900 hover:bg-blue-800 text-blue-100' 
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
              }`}
            >
              <GraduationCap className="w-8 h-8 mx-auto mb-2" />
              <span className="text-sm font-medium">PAU</span>
            </a>
            
            <a
              href="https://pmkisan.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 rounded-lg text-center transition-colors ${
                darkMode 
                  ? 'bg-yellow-900 hover:bg-yellow-800 text-yellow-100' 
                  : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
              }`}
            >
              <DollarSign className="w-8 h-8 mx-auto mb-2" />
              <span className="text-sm font-medium">PM-Kisan</span>
            </a>
            
            <a
              href="https://www.enam.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 rounded-lg text-center transition-colors ${
                darkMode 
                  ? 'bg-red-900 hover:bg-red-800 text-red-100' 
                  : 'bg-red-100 hover:bg-red-200 text-red-800'
              }`}
            >
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <span className="text-sm font-medium">eNAM</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentPortals;
