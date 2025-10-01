import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { 
  Camera, 
  Mic, 
  MicOff, 
  Search, 
  Leaf, 
  Droplets,
  Thermometer,
  Sun,
  AlertTriangle,
  CheckCircle,
  Upload,
  Brain,
  TrendingUp
} from 'lucide-react';
import LanguageContext from '../contexts/LanguageContext';

const CropAdvisory = ({ user, darkMode }) => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [soilType, setSoilType] = useState('');
  const [moistureLevel, setMoistureLevel] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const { speak } = useSpeechSynthesis();

  const { language } = React.useContext(LanguageContext);

  const translations = {
    english: {
      title: 'Crop Advisory',
      subtitle: 'Get expert advice for your crops',
      disclaimer: 'All advisory in KRISHIMITRA is based on datasets and guidelines provided by Punjab Agricultural University (PAU).',
      manualInput: 'Manual Crop Input',
      photoDetection: 'Photo Detection',
      speechRecognition: 'Speech Recognition',
      aiRecommendation: 'AI Crop Recommendation',
      selectCrop: 'Select Crop Type',
      selectSoil: 'Select Soil Type',
      moistureLevel: 'Soil Moisture Level',
      weatherCondition: 'Current Weather',
      getRecommendation: 'Get AI Recommendation',
      uploadImage: 'Upload Crop/Soil Image',
      analyzeImage: 'Analyze Image',
      chatBot: 'Agricultural Chatbot',
      typeMessage: 'Type your question...',
      sendMessage: 'Send',
      speakMessage: 'Speak Message',
      recommendations: 'Recommendations',
      soilAdvice: 'Soil Management',
      pestControl: 'Pest & Disease Control',
      yieldImprovement: 'Yield Improvement',
      irrigationAdvice: 'Irrigation Advice',
      fertilizers: 'Fertilizer Recommendations',
      plantingTime: 'Best Planting Time',
      harvesting: 'Harvesting Guidelines',
      noResults: 'No recommendations available. Please provide more information.',
      analyzingImage: 'Analyzing image...',
      imageAnalyzed: 'Image analysis complete',
      listening: 'Listening...',
      speakNow: 'Speak your question now',
      stopListening: 'Stop Listening'
    },
    hindi: {
      title: 'फसल सलाह',
      subtitle: 'अपनी फसलों के लिए विशेषज्ञ सलाह प्राप्त करें',
      disclaimer: 'कृषिमित्र में सभी सलाह पंजाब कृषि विश्वविद्यालय (PAU) द्वारा प्रदान किए गए डेटासेट और दिशानिर्देशों पर आधारित है।',
      manualInput: 'मैनुअल फसल इनपुट',
      photoDetection: 'फोटो डिटेक्शन',
      speechRecognition: 'स्पीच रिकॉग्निशन',
      aiRecommendation: 'AI फसल सिफारिश',
      selectCrop: 'फसल प्रकार चुनें',
      selectSoil: 'मिट्टी प्रकार चुनें',
      moistureLevel: 'मिट्टी की नमी स्तर',
      weatherCondition: 'वर्तमान मौसम',
      getRecommendation: 'AI सिफारिश प्राप्त करें',
      uploadImage: 'फसल/मिट्टी की तस्वीर अपलोड करें',
      analyzeImage: 'तस्वीर का विश्लेषण करें',
      chatBot: 'कृषि चैटबॉट',
      typeMessage: 'अपना प्रश्न टाइप करें...',
      sendMessage: 'भेजें',
      speakMessage: 'संदेश बोलें',
      recommendations: 'सिफारिशें',
      soilAdvice: 'मिट्टी प्रबंधन',
      pestControl: 'कीट और रोग नियंत्रण',
      yieldImprovement: 'उपज सुधार',
      irrigationAdvice: 'सिंचाई सलाह',
      fertilizers: 'उर्वरक सिफारिशें',
      plantingTime: 'सर्वोत्तम बुवाई समय',
      harvesting: 'कटाई दिशानिर्देश',
      noResults: 'कोई सिफारिश उपलब्ध नहीं है। कृपया अधिक जानकारी प्रदान करें।',
      analyzingImage: 'तस्वीर का विश्लेषण हो रहा है...',
      imageAnalyzed: 'तस्वीर विश्लेषण पूर्ण',
      listening: 'सुन रहा है...',
      speakNow: 'अब अपना प्रश्न बोलें',
      stopListening: 'सुनना बंद करें'
    },
    punjabi: {
      title: 'ਫਸਲ ਸਲਾਹ',
      subtitle: 'ਆਪਣੀਆਂ ਫਸਲਾਂ ਲਈ ਮਾਹਿਰ ਸਲਾਹ ਪ੍ਰਾਪਤ ਕਰੋ',
      disclaimer: 'ਕ੍ਰਿਸ਼ਿਮਿਤ੍ਰਾ ਵਿੱਚ ਸਾਰੀ ਸਲਾਹ ਪੰਜਾਬ ਖੇਤੀਬਾੜੀ ਯੂਨੀਵਰਸਿਟੀ (PAU) ਦੁਆਰਾ ਪ੍ਰਦਾਨ ਕੀਤੇ ਗਏ ਡੇਟਾਸੇਟ ਅਤੇ ਦਿਸ਼ਾਨਿਰਦੇਸ਼ਾਂ ਤੇ ਆਧਾਰਿਤ ਹੈ।',
      manualInput: 'ਮੈਨੁਅਲ ਫਸਲ ਇਨਪੁੱਟ',
      photoDetection: 'ਫੋਟੋ ਡਿਟੈਕਸ਼ਨ',
      speechRecognition: 'ਸਪੀਚ ਰਿਕਗਨਿਸ਼ਨ',
      aiRecommendation: 'AI ਫਸਲ ਸਿਫਾਰਿਸ਼',
      selectCrop: 'ਫਸਲ ਪ੍ਰਕਾਰ ਚੁਣੋ',
      selectSoil: 'ਮਿੱਟੀ ਪ੍ਰਕਾਰ ਚੁਣੋ',
      moistureLevel: 'ਮਿੱਟੀ ਦੀ ਨਮੀ ਪੱਧਰ',
      weatherCondition: 'ਮੌਜੂਦਾ ਮੌਸਮ',
      getRecommendation: 'AI ਸਿਫਾਰਿਸ਼ ਪ੍ਰਾਪਤ ਕਰੋ',
      uploadImage: 'ਫਸਲ/ਮਿੱਟੀ ਦੀ ਤਸਵੀਰ ਅਪਲੋਡ ਕਰੋ',
      analyzeImage: 'ਤਸਵੀਰ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ',
      chatBot: 'ਖੇਤੀਬਾੜੀ ਚੈਟਬਾਟ',
      typeMessage: 'ਆਪਣਾ ਸਵਾਲ ਟਾਈਪ ਕਰੋ...',
      sendMessage: 'ਭੇਜੋ',
      speakMessage: 'ਸੁਨੇਹਾ ਬੋਲੋ',
      recommendations: 'ਸਿਫਾਰਿਸ਼ਾਂ',
      soilAdvice: 'ਮਿੱਟੀ ਪ੍ਰਬੰਧਨ',
      pestControl: 'ਕੀਟ ਅਤੇ ਰੋਗ ਨਿਯੰਤਰਣ',
      yieldImprovement: 'ਪੈਦਾਵਾਰ ਸੁਧਾਰ',
      irrigationAdvice: 'ਸਿੰਚਾਈ ਸਲਾਹ',
      fertilizers: 'ਖਾਦ ਸਿਫਾਰਿਸ਼ਾਂ',
      plantingTime: 'ਸਭ ਤੋਂ ਵਧੀਆ ਬੀਜਣ ਦਾ ਸਮਾਂ',
      harvesting: 'ਕਟਾਈ ਦਿਸ਼ਾਨਿਰਦੇਸ਼',
      noResults: 'ਕੋਈ ਸਿਫਾਰਿਸ਼ ਉਪਲਬਧ ਨਹੀਂ। ਕਿਰਪਾ ਕਰਕੇ ਹੋਰ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰੋ।',
      analyzingImage: 'ਤਸਵੀਰ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਹੋ ਰਿਹਾ ਹੈ...',
      imageAnalyzed: 'ਤਸਵੀਰ ਵਿਸ਼ਲੇਸ਼ਣ ਪੂਰਨ',
      listening: 'ਸੁਣ ਰਿਹਾ ਹੈ...',
      speakNow: 'ਹੁਣ ਆਪਣਾ ਸਵਾਲ ਬੋਲੋ',
      stopListening: 'ਸੁਣਨਾ ਬੰਦ ਕਰੋ'
    }
  };

  const t = translations[language];

  const cropOptions = [
    'Wheat', 'Rice', 'Maize', 'Cotton', 'Sugarcane', 'Potato', 'Tomato', 'Onion', 'Chilli', 'Mustard'
  ];

  const soilOptions = [
    'Clay Soil', 'Sandy Soil', 'Loamy Soil', 'Silty Soil', 'Black Soil', 'Red Soil'
  ];

  const moistureOptions = [
    'Very Dry', 'Dry', 'Moderate', 'Moist', 'Very Moist'
  ];

  const weatherOptions = [
    'Sunny', 'Cloudy', 'Rainy', 'Humid', 'Windy', 'Cold'
  ];

  useEffect(() => {
    // Initialize chatbot with welcome message
    setChatMessages([
      {
        id: 1,
        type: 'bot',
        message: language === 'hindi' 
          ? 'नमस्ते! मैं आपकी कृषि सहायता के लिए यहाँ हूँ। आप किसी भी प्रश्न का उत्तर पूछ सकते हैं।'
          : language === 'punjabi'
          ? 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡੀ ਖੇਤੀਬਾੜੀ ਸਹਾਇਤਾ ਲਈ ਇੱਥੇ ਹਾਂ। ਤੁਸੀਂ ਕੋਈ ਵੀ ਸਵਾਲ ਪੁੱਛ ਸਕਦੇ ਹੋ।'
          : 'Hello! I\'m here to help with your agricultural queries. You can ask any question about farming, crops, or soil management.'
      }
    ]);
  }, [language]);

  const handleAIRecommendation = () => {
    if (!selectedCrop || !soilType || !moistureLevel || !weatherCondition) {
      alert(t.noResults);
      return;
    }

    // Simulate AI recommendation based on inputs
    const recommendations = generateRecommendations(selectedCrop, soilType, moistureLevel, weatherCondition);
    setAnalysisResult(recommendations);
    speak({ text: `AI recommendations generated for ${selectedCrop}` });
  };

  const generateRecommendations = (crop, soil, moisture, weather) => {
    // Mock AI recommendations based on inputs
    const recommendations = {
      crop: crop,
      soil: soil,
      moisture: moisture,
      weather: weather,
      advice: {
        soilManagement: getSoilAdvice(soil, moisture),
        pestControl: getPestControlAdvice(crop, weather),
        yieldImprovement: getYieldAdvice(crop, soil),
        irrigation: getIrrigationAdvice(moisture, weather),
        fertilizers: getFertilizerAdvice(crop, soil),
        plantingTime: getPlantingTimeAdvice(crop, weather),
        harvesting: getHarvestingAdvice(crop)
      }
    };
    return recommendations;
  };

  const getSoilAdvice = (soil, moisture) => {
    const advice = {
      'Clay Soil': 'Add organic matter and sand to improve drainage. Avoid over-watering.',
      'Sandy Soil': 'Add compost and organic matter to improve water retention.',
      'Loamy Soil': 'Maintain organic matter content with regular composting.',
      'Silty Soil': 'Improve drainage with sand and organic matter.',
      'Black Soil': 'Excellent for cotton and sugarcane. Maintain pH between 6.5-7.5.',
      'Red Soil': 'Add lime and organic matter to improve fertility.'
    };
    return advice[soil] || 'Consult local agricultural extension officer for soil-specific advice.';
  };

  const getPestControlAdvice = (crop, weather) => {
    const cropPests = {
      'Wheat': 'Monitor for aphids and rust diseases. Use neem oil spray in humid conditions.',
      'Rice': 'Watch for stem borer and blast disease. Apply proper drainage in rainy season.',
      'Maize': 'Control corn earworm and armyworm. Use Bt varieties for better resistance.',
      'Cotton': 'Monitor for bollworm and whitefly. Use integrated pest management.',
      'Sugarcane': 'Control shoot borer and red rot disease. Maintain field hygiene.'
    };
    return cropPests[crop] || 'Regular field monitoring and integrated pest management recommended.';
  };

  const getYieldAdvice = (crop, soil) => {
    return `For ${crop} in ${soil}: Use high-yielding varieties, proper spacing, timely weeding, and balanced fertilization for optimal yields.`;
  };

  const getIrrigationAdvice = (moisture, weather) => {
    if (moisture === 'Very Dry' || moisture === 'Dry') {
      return 'Increase irrigation frequency. Consider drip irrigation for water efficiency.';
    } else if (moisture === 'Very Moist') {
      return 'Reduce irrigation to prevent waterlogging. Improve drainage.';
    } else {
      return 'Maintain regular irrigation schedule based on crop requirements.';
    }
  };

  const getFertilizerAdvice = (crop, soil) => {
    const fertilizerMap = {
      'Wheat': 'Apply NPK 120:60:40 kg/ha. Split application recommended.',
      'Rice': 'Apply NPK 150:75:60 kg/ha. Use slow-release fertilizers.',
      'Maize': 'Apply NPK 180:90:60 kg/ha. Side dressing for nitrogen.',
      'Cotton': 'Apply NPK 100:50:50 kg/ha. Foliar application for micronutrients.',
      'Sugarcane': 'Apply NPK 250:100:100 kg/ha. Organic manure recommended.'
    };
    return fertilizerMap[crop] || 'Consult soil test results for specific fertilizer recommendations.';
  };

  const getPlantingTimeAdvice = (crop, weather) => {
    const plantingTimes = {
      'Wheat': 'October-November for Rabi season. Ensure soil temperature 15-20°C.',
      'Rice': 'June-July for Kharif season. Transplant when seedlings are 25-30 days old.',
      'Maize': 'May-June for Kharif season. Plant when soil temperature is above 10°C.',
      'Cotton': 'April-May for Kharif season. Plant when soil temperature is 18-20°C.',
      'Sugarcane': 'October-November or February-March. Plant setts in moist soil.'
    };
    return plantingTimes[crop] || 'Plant according to local climatic conditions and crop calendar.';
  };

  const getHarvestingAdvice = (crop) => {
    const harvestingAdvice = {
      'Wheat': 'Harvest when grains are hard and moisture content is 14-16%.',
      'Rice': 'Harvest when 80% grains are golden yellow. Moisture content 20-22%.',
      'Maize': 'Harvest when kernels are dented and moisture content is 20-25%.',
      'Cotton': 'Harvest when bolls are fully opened. Pick in dry weather conditions.',
      'Sugarcane': 'Harvest when cane is 12-18 months old. Cut close to ground level.'
    };
    return harvestingAdvice[crop] || 'Harvest at proper maturity stage for best quality and yield.';
  };

  const handleImageAnalysis = () => {
    if (!capturedImage) {
      alert('Please upload an image first');
      return;
    }

    speak({ text: t.analyzingImage });
    
    // Simulate image analysis
    setTimeout(() => {
      const mockAnalysis = {
        cropDetected: 'Wheat',
        diseaseDetected: 'No diseases detected',
        pestDetected: 'Minor aphid infestation',
        soilHealth: 'Good',
        recommendations: 'Apply neem oil spray for aphid control. Soil appears healthy.'
      };
      
      setAnalysisResult(mockAnalysis);
      speak({ text: t.imageAnalyzed });
    }, 3000);
  };

  const handleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      speak({ text: t.speakNow });
      
      // Initialize speech recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = language === 'hindi' ? 'hi-IN' : language === 'punjabi' ? 'pa-IN' : 'en-IN';
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setCurrentMessage(transcript);
          setIsListening(false);
          speak({ text: `You said: ${transcript}` });
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
          const sampleQuestions = [
            'How to grow rice?',
            'Wheat rust disease control',
            'Best fertilizer for cotton',
            'Irrigation schedule for wheat',
            'Soil improvement methods'
          ];
          const randomQuestion = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
          setCurrentMessage(randomQuestion);
          setIsListening(false);
          speak({ text: `Voice recognition not available. Here's a sample question: ${randomQuestion}` });
        }, 2000);
      }
    } else {
      setIsListening(false);
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        // Stop any ongoing recognition
        const recognition = window.speechRecognitionInstance;
        if (recognition) {
          recognition.stop();
        }
      }
    }
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      message: currentMessage
    };

    setChatMessages(prev => [...prev, newMessage]);

    // Simulate bot response
    setTimeout(() => {
      const response = generateBotResponse(currentMessage);
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        message: response
      };
      setChatMessages(prev => [...prev, botResponse]);
      speak({ text: 'Response received' });
    }, 1000);

    setCurrentMessage('');
  };

  const generateBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Rice Growing Guide
    if (lowerMessage.includes('grow rice') || lowerMessage.includes('rice cultivation') || lowerMessage.includes('how to grow rice') || lowerMessage.includes('rice farming')) {
      return `🌾 Complete Rice Growing Guide:
      
**1. Land Preparation:**
• Plow the field 2-3 times to fine tilth
• Level the field properly for uniform water distribution
• Apply 10-15 tonnes FYM per hectare
• Maintain water depth 2-3 cm during puddling

**2. Seed Selection & Treatment:**
• Use certified seeds (varieties: PR-126, PR-127, Basmati 1121)
• Seed rate: 20-25 kg/ha for transplanted rice
• Treat seeds with fungicide (Thiram 2g/kg seed)
• Soak seeds for 12 hours before sowing

**3. Nursery Preparation:**
• Prepare nursery 25-30 days before transplanting
• Seed rate: 40-50 kg/ha for nursery
• Maintain proper spacing (5x5 cm)
• Keep nursery weed-free

**4. Transplanting:**
• Transplant 25-30 days old seedlings
• Spacing: 20x15 cm (67,000 hills/ha)
• Plant 2-3 seedlings per hill
• Transplant in standing water (2-3 cm depth)

**5. Water Management:**
• **Transplanting to Tillering:** Shallow submergence (2-3 cm)
• **Tillering to Panicle Initiation:** Intermittent irrigation
• **Flowering:** Maintain shallow water (2-3 cm)
• **Grain Filling:** Gradual water withdrawal
• **Maturity:** Complete drainage 10-15 days before harvest

**6. Nutrient Management:**
• **NPK:** 150:75:60 kg/ha
• **Basal:** 50% N + 100% P + 100% K at transplanting
• **1st Top Dressing:** 25% N at tillering (25-30 DAT)
• **2nd Top Dressing:** 25% N at panicle initiation (45-50 DAT)

**7. Weed Management:**
• Apply Butachlor 1.5 kg/ha 3 days after transplanting
• Manual weeding at 25-30 DAT
• Keep field weed-free throughout growth

**8. Pest & Disease Control:**
• **Stem Borer:** Use Bt rice or apply Cartap hydrochloride
• **Blast:** Apply Tricyclazole 75% WP at 0.3g/liter
• **Brown Plant Hopper:** Use Imidacloprid 17.8% SL

**9. Harvesting:**
• Harvest when 80% grains turn golden yellow
• Moisture content should be 20-22%
• Use combine harvester for efficient harvesting

**10. Expected Yield:**
• Traditional varieties: 40-50 quintals/ha
• Hybrid varieties: 60-80 quintals/ha
• Basmati varieties: 35-45 quintals/ha

**Season:** Kharif (June-October) in Punjab`;
    }
    
    // Wheat Growing Guide
    else if (lowerMessage.includes('grow wheat') || lowerMessage.includes('wheat cultivation') || lowerMessage.includes('how to grow wheat') || lowerMessage.includes('wheat farming')) {
      return `🌾 Complete Wheat Growing Guide:
      
**1. Land Preparation:**
• Prepare fine seedbed with 2-3 plowings
• Level the field for uniform irrigation
• Apply 10-15 tonnes FYM per hectare
• Ensure proper drainage

**2. Seed Selection & Treatment:**
• Use certified seeds (varieties: HD-2967, PBW-723, WH-1105)
• Seed rate: 40-50 kg/ha for normal sowing
• Treat seeds with fungicide (Thiram 2g/kg seed)
• Soak seeds for 8-12 hours before sowing

**3. Sowing:**
• **Time:** October-November (Rabi season)
• **Method:** Line sowing with seed drill
• **Spacing:** 20-22.5 cm between rows
• **Depth:** 4-5 cm
• **Soil temperature:** 15-20°C

**4. Irrigation Schedule:**
• **1st Irrigation:** Crown root initiation (20-25 DAS)
• **2nd Irrigation:** Tillering stage (40-45 DAS)
• **3rd Irrigation:** Flowering stage (70-75 DAS)
• **4th Irrigation:** Grain filling stage (90-95 DAS)
• **5th Irrigation:** Milk stage (110-115 DAS)

**5. Nutrient Management:**
• **NPK:** 120:60:40 kg/ha
• **Basal:** 50% N + 100% P + 100% K at sowing
• **1st Top Dressing:** 25% N at crown root initiation
• **2nd Top Dressing:** 25% N at flowering

**6. Weed Management:**
• Apply Pendimethalin 1.0 kg/ha before emergence
• Post-emergence: 2,4-D Na salt 0.5 kg/ha at 30-35 DAS
• Manual weeding if needed

**7. Pest & Disease Control:**
• **Aphids:** Apply Imidacloprid 17.8% SL
• **Rust:** Apply Propiconazole 25% EC
• **Termites:** Apply Chlorpyriphos 20% EC

**8. Harvesting:**
• Harvest when grains are hard and moisture 14-16%
• Use combine harvester for efficiency
• Dry grains to 10-12% moisture before storage

**Expected Yield:** 45-55 quintals/ha with proper management`;
    }
    
    // Cotton Growing Guide
    else if (lowerMessage.includes('grow cotton') || lowerMessage.includes('cotton cultivation') || lowerMessage.includes('how to grow cotton') || lowerMessage.includes('cotton farming')) {
      return `🌾 Complete Cotton Growing Guide:
      
**1. Land Preparation:**
• Deep plowing in summer to control weeds
• Fine tilth preparation
• Apply 10-12 tonnes FYM per hectare
• Proper land leveling

**2. Seed Selection & Treatment:**
• Use Bt cotton varieties (RCH-134, RCH-659, MRC-7351)
• Seed rate: 1.5-2 kg/ha
• Treat seeds with fungicide and insecticide
• Use certified seeds

**3. Sowing:**
• **Time:** April-May (Kharif season)
• **Method:** Line sowing with seed drill
• **Spacing:** 60x30 cm (55,000 plants/ha)
• **Depth:** 2-3 cm
• **Soil temperature:** 18-20°C

**4. Irrigation:**
• **1st Irrigation:** 3-4 weeks after sowing
• **Frequency:** Every 10-15 days
• **Critical stages:** Flowering and boll formation
• **Stop irrigation:** 2-3 weeks before harvest

**5. Nutrient Management:**
• **NPK:** 100:50:50 kg/ha
• **Basal:** 50% N + 100% P + 100% K at sowing
• **1st Top Dressing:** 25% N at squaring stage
• **2nd Top Dressing:** 25% N at flowering

**6. Weed Management:**
• Pre-emergence: Pendimethalin 1.0 kg/ha
• Post-emergence: Inter-row cultivation
• Manual weeding in initial stages

**7. Pest & Disease Control:**
• **Bollworm:** Bt cotton provides resistance
• **Whitefly:** Apply Imidacloprid 17.8% SL
• **Bacterial Blight:** Use resistant varieties

**8. Harvesting:**
• Harvest when bolls are fully opened
• Pick in dry weather conditions
• Use mechanical picker for large areas

**Expected Yield:** 15-20 quintals/ha (seed cotton)`;
    }
    
    // Disease Management
    else if (lowerMessage.includes('rust') || lowerMessage.includes('disease')) {
      if (lowerMessage.includes('wheat')) {
        return `🌾 Wheat Rust Disease Management:
        
**Immediate Action:**
• Apply Propiconazole 25% EC at 0.1% concentration
• Spray during early morning (6-10 AM) for better absorption
• Repeat after 15 days if needed

**Prevention:**
• Use resistant varieties like HD-2967, PBW-723
• Remove infected plant debris
• Practice crop rotation with legumes
• Avoid excess nitrogen fertilization

**Organic Control:**
• Neem oil spray (5ml per liter water)
• Garlic extract spray
• Proper field drainage to reduce humidity

**Economic Threshold:** Spray when rust severity reaches 5-10% on flag leaf.`;
      } else if (lowerMessage.includes('rice') || lowerMessage.includes('paddy')) {
        return `🌾 Rice Disease Management:
        
**Common Diseases & Solutions:**
• **Blast Disease:** Apply Tricyclazole 75% WP at 0.3g/liter
• **Bacterial Blight:** Use Streptocycline + Copper oxychloride
• **Sheath Blight:** Apply Validamycin 3% L at 2ml/liter

**Prevention:**
• Use certified disease-free seeds
• Maintain proper plant spacing (20x15 cm)
• Avoid excessive nitrogen
• Drain water 2-3 days before harvest`;
      } else {
        return `🌱 General Disease Management:
        
**Key Principles:**
• Early detection is crucial - inspect fields weekly
• Use integrated pest management (IPM)
• Maintain field hygiene and remove infected plants
• Practice crop rotation
• Use resistant varieties when available

**Organic Options:**
• Neem-based formulations
• Trichoderma bio-fungicide
• Proper soil health management

Please specify the crop type for more detailed advice!`;
      }
    }
    
    // Fertilizer Management
    else if (lowerMessage.includes('fertilizer') || lowerMessage.includes('fertiliser') || lowerMessage.includes('nutrition')) {
      if (lowerMessage.includes('wheat')) {
        return `🌾 Wheat Fertilizer Management:
        
**Recommended Dose:** NPK 120:60:40 kg/ha

**Application Schedule:**
• **Basal Dose:** Apply 50% N + 100% P + 100% K at sowing
• **First Top Dressing:** 25% N at crown root initiation (21-25 DAS)
• **Second Top Dressing:** 25% N at flowering (45-50 DAS)

**Fertilizer Sources:**
• **Nitrogen:** Urea (46% N) - 261 kg/ha
• **Phosphorus:** DAP (18% N, 46% P2O5) - 130 kg/ha
• **Potassium:** MOP (60% K2O) - 67 kg/ha

**Organic Alternatives:**
• Farm Yard Manure: 10-15 tonnes/ha
• Vermicompost: 2-3 tonnes/ha
• Green manure crops before wheat`;
      } else if (lowerMessage.includes('rice')) {
        return `🌾 Rice Fertilizer Management:
        
**Recommended Dose:** NPK 150:75:60 kg/ha

**Application Method:**
• **Basal:** 50% N + 100% P + 100% K at transplanting
• **1st Top Dressing:** 25% N at tillering (25-30 DAT)
• **2nd Top Dressing:** 25% N at panicle initiation (45-50 DAT)

**Special Considerations:**
• Split nitrogen application for better efficiency
• Use slow-release fertilizers in flood-prone areas
• Apply zinc sulphate 25 kg/ha if deficiency observed`;
      } else {
        return `🌱 General Fertilizer Guidelines:
        
**Soil Testing:** Always test soil before fertilizer application
        
**Key Nutrients:**
• **Nitrogen (N):** Promotes vegetative growth and yield
• **Phosphorus (P):** Essential for root development and flowering
• **Potassium (K):** Improves disease resistance and grain quality

**Application Tips:**
• Apply fertilizers when soil moisture is adequate
• Avoid application during heavy rain
• Use placement method for better efficiency
• Consider organic sources for sustainable farming`;
      }
    }
    
    // Irrigation Management
    else if (lowerMessage.includes('irrigation') || lowerMessage.includes('water') || lowerMessage.includes('sprinkler')) {
      if (lowerMessage.includes('wheat')) {
        return `💧 Wheat Irrigation Management:
        
**Critical Irrigation Stages (4-5 irrigations needed):**
• **1st Irrigation:** Crown root initiation (20-25 DAS)
• **2nd Irrigation:** Tillering stage (40-45 DAS)
• **3rd Irrigation:** Flowering stage (70-75 DAS)
• **4th Irrigation:** Grain filling stage (90-95 DAS)
• **5th Irrigation:** Milk stage (110-115 DAS)

**Water Requirements:**
• Total water need: 450-650 mm
• Avoid irrigation during flowering (2-3 days)
• Stop irrigation 15-20 days before harvest

**Water-Saving Tips:**
• Use furrow irrigation instead of flood irrigation
• Apply mulch to conserve soil moisture
• Practice zero tillage to retain moisture`;
      } else if (lowerMessage.includes('rice')) {
        return `💧 Rice Irrigation Management:
        
**Water Management Stages:**
• **Transplanting to Tillering:** Shallow submergence (2-3 cm)
• **Tillering to Panicle Initiation:** Intermittent irrigation
• **Flowering:** Maintain shallow water (2-3 cm)
• **Grain Filling:** Gradual water withdrawal
• **Maturity:** Complete drainage 10-15 days before harvest

**Water-Saving Techniques:**
• System of Rice Intensification (SRI)
• Alternate Wetting and Drying (AWD)
• Direct Seeded Rice (DSR)`;
      } else {
        return `💧 General Irrigation Guidelines:
        
**Water Management Principles:**
• Apply water based on crop growth stages
• Monitor soil moisture regularly
• Use efficient irrigation methods (drip, sprinkler)
• Consider weather forecasts for scheduling

**Water Conservation:**
• Mulching to reduce evaporation
• Proper land leveling
• Use of drought-resistant varieties
• Rainwater harvesting systems`;
      }
    }
    
    // Soil Management
    else if (lowerMessage.includes('soil') || lowerMessage.includes('land') || lowerMessage.includes('fertility')) {
      return `🌍 Soil Management & Fertility:
        
**Soil Testing:** Test soil every 2-3 years for pH, nutrients, and organic matter
        
**Soil Types & Management:**
• **Clay Soil:** Add sand and organic matter for drainage
• **Sandy Soil:** Increase organic matter for water retention
• **Loamy Soil:** Maintain organic matter content
• **Black Soil:** Excellent for cotton, maintain pH 6.5-7.5
• **Red Soil:** Add lime and organic matter

**Improving Soil Health:**
• Apply 10-15 tonnes FYM per hectare annually
• Practice green manuring with legumes
• Use crop rotation with different families
• Maintain soil pH between 6.0-7.5
• Avoid excessive chemical fertilizer use

**Organic Matter Sources:**
• Farm Yard Manure, Compost, Vermicompost
• Green manure crops (Sesbania, Dhaincha)
• Crop residues incorporation`;
    }
    
    // Pest Management
    else if (lowerMessage.includes('pest') || lowerMessage.includes('insect') || lowerMessage.includes('aphid')) {
      return `🐛 Integrated Pest Management (IPM):
        
**Prevention Strategies:**
• Use resistant/tolerant varieties
• Maintain field hygiene
• Proper plant spacing
• Balanced fertilization
• Timely irrigation

**Biological Control:**
• Conserve natural enemies (ladybugs, spiders)
• Release Trichogramma wasps for bollworm control
• Use Bt cotton for bollworm resistance
• Apply neem-based pesticides

**Chemical Control (Last Resort):**
• Use selective pesticides
• Follow economic threshold levels
• Rotate different chemical groups
• Apply during recommended time

**Common Pests & Solutions:**
• **Aphids:** Neem oil 5ml/liter or Imidacloprid
• **Whitefly:** Yellow sticky traps + Pyrethroid sprays
• **Bollworm:** Bt formulations or Spinosad`;
    }
    
    // Weather & Climate
    else if (lowerMessage.includes('weather') || lowerMessage.includes('climate') || lowerMessage.includes('rain')) {
      return `🌤️ Weather-Based Farming:
        
**Weather Monitoring:**
• Check weather forecasts daily
• Monitor temperature, humidity, rainfall
• Use weather-based crop advisories

**Seasonal Planning:**
• **Kharif (Monsoon):** Rice, Maize, Cotton, Soybean
• **Rabi (Winter):** Wheat, Mustard, Gram, Potato
• **Zaid (Summer):** Cucumber, Bitter Gourd, Okra

**Weather Advisories:**
• **Heavy Rain:** Ensure proper drainage, delay fertilizer application
• **Drought:** Use drought-resistant varieties, mulching
• **Heat Wave:** Provide shade, increase irrigation frequency
• **Frost:** Cover crops, use smoke for protection

**Climate-Smart Agriculture:**
• Diversify crops for risk reduction
• Use weather insurance
• Adopt conservation agriculture`;
    }
    
    // Yield Improvement
    else if (lowerMessage.includes('yield') || lowerMessage.includes('production') || lowerMessage.includes('improve')) {
      return `📈 Yield Improvement Strategies:
        
**Variety Selection:**
• Choose high-yielding, disease-resistant varieties
• Consider local climatic conditions
• Use certified seeds

**Agronomic Practices:**
• Optimal plant population
• Timely sowing/planting
• Proper spacing and depth
• Weed management
• Integrated pest management

**Nutrient Management:**
• Soil testing-based fertilizer application
• Balanced NPK fertilization
• Micronutrient supplementation
• Organic matter addition

**Technology Adoption:**
• Use of improved implements
• Precision agriculture techniques
• Modern irrigation systems
• Post-harvest management

**Expected Yield Increases:**
• Proper variety: 15-20%
• Balanced nutrition: 20-25%
• Timely operations: 10-15%
• Integrated approach: 30-40%`;
    }
    
    // Market & Economics
    else if (lowerMessage.includes('market') || lowerMessage.includes('price') || lowerMessage.includes('sell')) {
      return `💰 Agricultural Marketing & Economics:
        
**Market Information Sources:**
• eNAM (National Agriculture Market)
• State Mandi Boards
• Kisan Suvidha App
• Local market committees

**Marketing Strategies:**
• Direct marketing to consumers
• Contract farming
• Farmer Producer Organizations (FPOs)
• Online platforms

**Government Schemes:**
• PM-Kisan (₹6000/year)
• KCC (Kisan Credit Card)
• Crop insurance schemes
• MSP for major crops

**Cost Reduction:**
• Use of farm machinery cooperatives
• Bulk purchase of inputs
• Integrated farming systems
• Value addition to products`;
    }
    
    // General Agricultural Advice
    else if (lowerMessage.includes('crop') || lowerMessage.includes('farming') || lowerMessage.includes('agriculture')) {
      return `🌾 General Agricultural Guidance:
        
**Modern Farming Practices:**
• **Conservation Agriculture:** Minimum tillage, residue retention
• **Precision Farming:** GPS-guided equipment, variable rate application
• **Organic Farming:** Natural inputs, biological pest control
• **Integrated Farming:** Crop + Livestock + Fisheries

**Government Support:**
• Extension services through KVKs
• Subsidies on seeds, fertilizers, equipment
• Training programs for farmers
• Research-based recommendations from PAU

**Technology Integration:**
• Mobile apps for crop advisory
• Weather-based irrigation scheduling
• Drone technology for monitoring
• IoT sensors for precision farming

**Sustainable Practices:**
• Water conservation techniques
• Soil health management
• Biodiversity conservation
• Climate change adaptation`;
    }
    
    // Default Response
    else {
      return `🤖 Agricultural Assistant Response:
        
I'm here to help with your farming queries! I can provide expert advice on:

🌱 **Crop Management:** Disease control, pest management, nutrition
💧 **Water Management:** Irrigation scheduling, water conservation
🌍 **Soil Health:** Fertility improvement, soil testing
📈 **Yield Enhancement:** Best practices, technology adoption
💰 **Marketing:** Price information, government schemes
🌤️ **Weather:** Climate-based farming decisions

**For specific advice, please mention:**
• Crop type (wheat, rice, cotton, etc.)
• Specific problem or query
• Your location/region
• Current season (Kharif/Rabi/Zaid)

**Example questions:**
• "How to control wheat rust disease?"
• "Best fertilizer for rice crop?"
• "Irrigation schedule for wheat?"
• "Soil improvement for cotton?"

Ask me anything about farming! 🌾`;
    }
  };

  return (
    <div className={`min-h-screen p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-farmer-green'}`}>
            {t.title}
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {t.subtitle}
          </p>
          <div className={`p-4 rounded-lg mt-4 ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-blue-800'}`}>
              {t.disclaimer}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Manual Input Section */}
          <div className={`farmer-card ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Brain className="w-6 h-6 mr-2 text-blue-500" />
              {t.manualInput}
            </h2>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.selectCrop}
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:border-farmer-green ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Select Crop</option>
                  {cropOptions.map((crop) => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.selectSoil}
                </label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:border-farmer-green ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Select Soil Type</option>
                  {soilOptions.map((soil) => (
                    <option key={soil} value={soil}>{soil}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.moistureLevel}
                </label>
                <select
                  value={moistureLevel}
                  onChange={(e) => setMoistureLevel(e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:border-farmer-green ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Select Moisture Level</option>
                  {moistureOptions.map((moisture) => (
                    <option key={moisture} value={moisture}>{moisture}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t.weatherCondition}
                </label>
                <select
                  value={weatherCondition}
                  onChange={(e) => setWeatherCondition(e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:border-farmer-green ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Select Weather</option>
                  {weatherOptions.map((weather) => (
                    <option key={weather} value={weather}>{weather}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleAIRecommendation}
                className="w-full farmer-button"
              >
                <Brain className="w-5 h-5 inline mr-2" />
                {t.getRecommendation}
              </button>
            </div>
          </div>

          {/* Photo Detection Section */}
          <div className={`farmer-card ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Camera className="w-6 h-6 mr-2 text-green-500" />
              {t.photoDetection}
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
                    <Search className="w-5 h-5 inline mr-2" />
                    {t.analyzeImage}
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {t.uploadImage}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => setCapturedImage('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...')}
                  className="flex-1 farmer-button"
                >
                  <Camera className="w-5 h-5 inline mr-2" />
                  Capture
                </button>
                <button
                  onClick={() => document.getElementById('fileInput').click()}
                  className="flex-1 farmer-button"
                >
                  <Upload className="w-5 h-5 inline mr-2" />
                  Upload
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
        </div>

        {/* AI Recommendations Results */}
        {analysisResult && (
          <div className={`farmer-card mt-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
              {t.recommendations}
            </h2>

            {analysisResult.advice ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                  <h3 className={`font-semibold mb-2 flex items-center ${darkMode ? 'text-white' : 'text-green-800'}`}>
                    <Leaf className="w-5 h-5 mr-2" />
                    {t.soilAdvice}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-green-700'}`}>
                    {analysisResult.advice.soilManagement}
                  </p>
                </div>

                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-red-50'}`}>
                  <h3 className={`font-semibold mb-2 flex items-center ${darkMode ? 'text-white' : 'text-red-800'}`}>
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    {t.pestControl}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-red-700'}`}>
                    {analysisResult.advice.pestControl}
                  </p>
                </div>

                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                  <h3 className={`font-semibold mb-2 flex items-center ${darkMode ? 'text-white' : 'text-blue-800'}`}>
                    <TrendingUp className="w-5 h-5 mr-2" />
                    {t.yieldImprovement}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-blue-700'}`}>
                    {analysisResult.advice.yieldImprovement}
                  </p>
                </div>

                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                  <h3 className={`font-semibold mb-2 flex items-center ${darkMode ? 'text-white' : 'text-purple-800'}`}>
                    <Droplets className="w-5 h-5 mr-2" />
                    {t.irrigationAdvice}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-purple-700'}`}>
                    {analysisResult.advice.irrigation}
                  </p>
                </div>

                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                  <h3 className={`font-semibold mb-2 flex items-center ${darkMode ? 'text-white' : 'text-yellow-800'}`}>
                    <Sun className="w-5 h-5 mr-2" />
                    {t.fertilizers}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-yellow-700'}`}>
                    {analysisResult.advice.fertilizers}
                  </p>
                </div>

                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-indigo-50'}`}>
                  <h3 className={`font-semibold mb-2 flex items-center ${darkMode ? 'text-white' : 'text-indigo-800'}`}>
                    <Thermometer className="w-5 h-5 mr-2" />
                    {t.plantingTime}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-indigo-700'}`}>
                    {analysisResult.advice.plantingTime}
                  </p>
                </div>
              </div>
            ) : (
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <strong>Crop Detected:</strong> {analysisResult.cropDetected}
                </p>
                <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong>Disease:</strong> {analysisResult.diseaseDetected}
                </p>
                <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong>Pest:</strong> {analysisResult.pestDetected}
                </p>
                <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong>Soil Health:</strong> {analysisResult.soilHealth}
                </p>
                <p className={`mt-4 p-3 rounded ${darkMode ? 'bg-gray-600' : 'bg-green-100'}`}>
                  <strong>Recommendations:</strong> {analysisResult.recommendations}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Chatbot Section */}
        <div className={`farmer-card mt-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <Mic className="w-6 h-6 mr-2 text-purple-500" />
            {t.chatBot}
          </h2>

          <div className="space-y-4">
            {/* Chat Messages */}
            <div className={`h-64 overflow-y-auto p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-3 ${
                    msg.type === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-farmer-green text-white'
                        : darkMode
                          ? 'bg-gray-600 text-white'
                          : 'bg-white text-gray-900 border'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder={t.typeMessage}
                className={`flex-1 p-3 border rounded-lg focus:outline-none focus:border-farmer-green ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-3 bg-farmer-green text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {t.sendMessage}
              </button>
              <button
                onClick={handleVoiceInput}
                className={`px-4 py-3 rounded-lg transition-colors ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : darkMode
                      ? 'bg-gray-600 hover:bg-gray-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                }`}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
            </div>

            {isListening && (
              <div className={`text-center p-2 rounded ${darkMode ? 'bg-red-900' : 'bg-red-100'}`}>
                <p className={`text-sm ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                  {t.listening}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropAdvisory;
