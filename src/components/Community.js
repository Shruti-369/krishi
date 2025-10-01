import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { 
  Users, 
  MessageCircle, 
  ThumbsUp, 
  Share2, 
  Star,
  Mic,
  MicOff,
  Send,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Filter
} from 'lucide-react';
import LanguageContext from '../contexts/LanguageContext';

const Community = ({ user, darkMode }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isListening, setIsListening] = useState(false);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const { speak } = useSpeechSynthesis();

  const { language } = React.useContext(LanguageContext);

  const translations = {
    english: {
      title: 'Community',
      subtitle: 'Connect with fellow farmers and share experiences',
      askQuestion: 'Ask Question',
      shareTip: 'Share Tip',
      postReview: 'Post Review',
      allPosts: 'All Posts',
      cropAdvice: 'Crop Advice',
      soilManagement: 'Soil Management',
      pestControl: 'Pest Control',
      weatherTips: 'Weather Tips',
      floodManagement: 'Flood Management',
      irrigation: 'Irrigation',
      writePost: 'Write your post...',
      speakPost: 'Speak your post',
      postButton: 'Post',
      like: 'Like',
      share: 'Share',
      comment: 'Comment',
      expertReviews: 'Expert Farmer Reviews',
      experiencedFarmers: 'Experienced Farmers Share',
      communityTips: 'Community Tips',
      recentPosts: 'Recent Posts',
      topRated: 'Top Rated',
      trending: 'Trending',
      helpful: 'Helpful',
      verified: 'Verified Farmer',
      yearsExperience: 'years experience',
      helpfulVotes: 'people found this helpful',
      askQuestionPlaceholder: 'What would you like to ask the community?',
      shareTipPlaceholder: 'Share your farming tip or experience...',
      noPosts: 'No posts yet. Be the first to share!',
      loading: 'Loading posts...',
      postSuccess: 'Post shared successfully!',
      errorPosting: 'Error posting. Please try again.'
    },
    hindi: {
      title: 'समुदाय',
      subtitle: 'साथी किसानों के साथ जुड़ें और अनुभव साझा करें',
      askQuestion: 'प्रश्न पूछें',
      shareTip: 'सुझाव साझा करें',
      postReview: 'समीक्षा पोस्ट करें',
      allPosts: 'सभी पोस्ट',
      cropAdvice: 'फसल सलाह',
      soilManagement: 'मिट्टी प्रबंधन',
      pestControl: 'कीट नियंत्रण',
      weatherTips: 'मौसम सुझाव',
      floodManagement: 'बाढ़ प्रबंधन',
      irrigation: 'सिंचाई',
      writePost: 'अपनी पोस्ट लिखें...',
      speakPost: 'अपनी पोस्ट बोलें',
      postButton: 'पोस्ट करें',
      like: 'पसंद',
      share: 'साझा करें',
      comment: 'टिप्पणी',
      expertReviews: 'विशेषज्ञ किसान समीक्षाएं',
      experiencedFarmers: 'अनुभवी किसान साझा करते हैं',
      communityTips: 'समुदाय सुझाव',
      recentPosts: 'हाल की पोस्ट',
      topRated: 'टॉप रेटेड',
      trending: 'ट्रेंडिंग',
      helpful: 'मददगार',
      verified: 'सत्यापित किसान',
      yearsExperience: 'वर्ष का अनुभव',
      helpfulVotes: 'लोगों ने इसे मददगार पाया',
      askQuestionPlaceholder: 'आप समुदाय से क्या पूछना चाहते हैं?',
      shareTipPlaceholder: 'अपना कृषि सुझाव या अनुभव साझा करें...',
      noPosts: 'अभी तक कोई पोस्ट नहीं। सबसे पहले साझा करने वाले बनें!',
      loading: 'पोस्ट लोड हो रहे हैं...',
      postSuccess: 'पोस्ट सफलतापूर्वक साझा की गई!',
      errorPosting: 'पोस्टिंग में त्रुटि। कृपया पुनः प्रयास करें।'
    },
    punjabi: {
      title: 'ਕਮਿਊਨਿਟੀ',
      subtitle: 'ਹੋਰ ਕਿਸਾਨਾਂ ਨਾਲ ਜੁੜੋ ਅਤੇ ਤਜਰਬੇ ਸਾਂਝੇ ਕਰੋ',
      askQuestion: 'ਸਵਾਲ ਪੁੱਛੋ',
      shareTip: 'ਸਲਾਹ ਸਾਂਝੀ ਕਰੋ',
      postReview: 'ਰਿਵਿਊ ਪੋਸਟ ਕਰੋ',
      allPosts: 'ਸਾਰੀਆਂ ਪੋਸਟਾਂ',
      cropAdvice: 'ਫਸਲ ਸਲਾਹ',
      soilManagement: 'ਮਿੱਟੀ ਪ੍ਰਬੰਧਨ',
      pestControl: 'ਕੀਟ ਨਿਯੰਤਰਣ',
      weatherTips: 'ਮੌਸਮ ਸਲਾਹ',
      floodManagement: 'ਹੜ੍ਹ ਪ੍ਰਬੰਧਨ',
      irrigation: 'ਸਿੰਚਾਈ',
      writePost: 'ਆਪਣੀ ਪੋਸਟ ਲਿਖੋ...',
      speakPost: 'ਆਪਣੀ ਪੋਸਟ ਬੋਲੋ',
      postButton: 'ਪੋਸਟ ਕਰੋ',
      like: 'ਪਸੰਦ',
      share: 'ਸਾਂਝਾ ਕਰੋ',
      comment: 'ਟਿੱਪਣੀ',
      expertReviews: 'ਮਾਹਿਰ ਕਿਸਾਨ ਰਿਵਿਊ',
      experiencedFarmers: 'ਅਨੁਭਵੀ ਕਿਸਾਨ ਸਾਂਝਾ ਕਰਦੇ ਹਨ',
      communityTips: 'ਕਮਿਊਨਿਟੀ ਸਲਾਹ',
      recentPosts: 'ਤਾਜ਼ਾ ਪੋਸਟਾਂ',
      topRated: 'ਟੌਪ ਰੇਟਿਡ',
      trending: 'ਟ੍ਰੈਂਡਿੰਗ',
      helpful: 'ਮਦਦਗਾਰ',
      verified: 'ਪ੍ਰਮਾਣਿਤ ਕਿਸਾਨ',
      yearsExperience: 'ਸਾਲ ਦਾ ਅਨੁਭਵ',
      helpfulVotes: 'ਲੋਕਾਂ ਨੇ ਇਸਨੂੰ ਮਦਦਗਾਰ ਪਾਇਆ',
      askQuestionPlaceholder: 'ਤੁਸੀਂ ਕਮਿਊਨਿਟੀ ਤੋਂ ਕੀ ਪੁੱਛਣਾ ਚਾਹੁੰਦੇ ਹੋ?',
      shareTipPlaceholder: 'ਆਪਣੀ ਖੇਤੀਬਾੜੀ ਸਲਾਹ ਜਾਂ ਤਜਰਬਾ ਸਾਂਝਾ ਕਰੋ...',
      noPosts: 'ਹੁਣ ਤੱਕ ਕੋਈ ਪੋਸਟ ਨਹੀਂ। ਪਹਿਲੇ ਸਾਂਝਾ ਕਰਨ ਵਾਲੇ ਬਣੋ!',
      loading: 'ਪੋਸਟਾਂ ਲੋਡ ਹੋ ਰਹੀਆਂ ਹਨ...',
      postSuccess: 'ਪੋਸਟ ਸਫਲਤਾਪੂਰਵਕ ਸਾਂਝੀ ਕੀਤੀ ਗਈ!',
      errorPosting: 'ਪੋਸਟਿੰਗ ਵਿੱਚ ਗਲਤੀ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।'
    }
  };

  const t = translations[language];

  const categories = [
    { id: 'all', label: t.allPosts, icon: Users },
    { id: 'crop-advice', label: t.cropAdvice, icon: TrendingUp },
    { id: 'soil-management', label: t.soilManagement, icon: CheckCircle },
    { id: 'pest-control', label: t.pestControl, icon: AlertTriangle },
    { id: 'weather-tips', label: t.weatherTips, icon: TrendingUp },
    { id: 'flood-management', label: t.floodManagement, icon: AlertTriangle },
    { id: 'irrigation', label: t.irrigation, icon: CheckCircle }
  ];

  // Sample posts data
  useEffect(() => {
    const samplePosts = [
      {
        id: 1,
        author: 'Rajinder Singh',
        avatar: 'RS',
        experience: 25,
        verified: true,
        category: 'crop-advice',
        title: 'Wheat Rust Disease Control',
        content: 'I\'ve been farming wheat for 25 years. For rust disease control, I recommend using Propiconazole 25% EC at 0.1% concentration. Apply it during the early morning hours for better effectiveness. Also, ensure proper field drainage to prevent moisture buildup.',
        likes: 45,
        comments: 12,
        shares: 8,
        helpful: 38,
        timestamp: '2 hours ago',
        tags: ['wheat', 'rust', 'disease', 'control']
      },
      {
        id: 2,
        author: 'Priya Sharma',
        avatar: 'PS',
        experience: 15,
        verified: true,
        category: 'soil-management',
        title: 'Organic Soil Enrichment',
        content: 'After 15 years of organic farming, I can say that vermicompost works wonders for soil health. Mix 2-3 kg per square meter and apply 15 days before planting. The results are amazing - better yield and healthier crops.',
        likes: 32,
        comments: 18,
        shares: 15,
        helpful: 29,
        timestamp: '5 hours ago',
        tags: ['organic', 'soil', 'vermicompost', 'yield']
      },
      {
        id: 3,
        author: 'Harpreet Kaur',
        avatar: 'HK',
        experience: 20,
        verified: true,
        category: 'flood-management',
        title: 'Flood Management for Rice Fields',
        content: 'During floods, rice fields need special care. I use raised bed technique - create 15cm high beds with proper drainage channels. This saved my crop during the 2020 floods. Also, plant flood-tolerant varieties like Swarna Sub-1.',
        likes: 67,
        comments: 23,
        shares: 31,
        helpful: 58,
        timestamp: '1 day ago',
        tags: ['flood', 'rice', 'drainage', 'resistant']
      },
      {
        id: 4,
        author: 'Mohammad Ali',
        avatar: 'MA',
        experience: 30,
        verified: true,
        category: 'pest-control',
        title: 'Natural Pest Control Methods',
        content: 'I use neem oil spray (5ml per liter) mixed with soap solution for aphid control. It\'s completely organic and effective. Also, planting marigold around the field helps repel many pests naturally.',
        likes: 54,
        comments: 19,
        shares: 22,
        helpful: 47,
        timestamp: '2 days ago',
        tags: ['organic', 'pest', 'neem', 'natural']
      },
      {
        id: 5,
        author: 'Sunita Devi',
        avatar: 'SD',
        experience: 18,
        verified: true,
        category: 'irrigation',
        title: 'Drip Irrigation Setup',
        content: 'Drip irrigation increased my yield by 30% while saving 40% water. The key is proper spacing - 30cm between emitters for vegetables, 50cm for fruits. Use pressure compensating emitters for uneven terrain.',
        likes: 41,
        comments: 16,
        shares: 28,
        helpful: 35,
        timestamp: '3 days ago',
        tags: ['drip', 'irrigation', 'water', 'efficiency']
      }
    ];

    setPosts(samplePosts);
  }, []);

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const handleLike = (postId) => {
    const newLikedPosts = new Set(likedPosts);
    if (likedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
    
    // Update post likes
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: likedPosts.has(postId) ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      speak({ text: t.speakPost });
      
      // Initialize speech recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = language === 'hindi' ? 'hi-IN' : language === 'punjabi' ? 'pa-IN' : 'en-IN';
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setNewPost(transcript);
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
            'How to control wheat rust disease in organic farming?',
            'Best irrigation method for rice cultivation',
            'Soil improvement techniques for better yield',
            'Pest control methods for cotton crop',
            'Weather-based farming tips for this season'
          ];
          const randomQuestion = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
          setNewPost(randomQuestion);
          setIsListening(false);
          speak({ text: `Voice recognition not available. Here's a sample question: ${randomQuestion}` });
        }, 2000);
      }
    } else {
      setIsListening(false);
    }
  };

  const handlePost = () => {
    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      author: user?.name || 'Anonymous',
      avatar: user?.name?.charAt(0) || 'A',
      experience: Math.floor(Math.random() * 20) + 5,
      verified: false,
      category: 'crop-advice',
      title: 'New Question',
      content: newPost,
      likes: 0,
      comments: 0,
      shares: 0,
      helpful: 0,
      timestamp: 'Just now',
      tags: []
    };

    setPosts([post, ...posts]);
    setNewPost('');
    setShowNewPostForm(false);
    speak({ text: t.postSuccess });
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
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setShowNewPostForm(true)}
            className="farmer-button flex items-center"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {t.askQuestion}
          </button>
          
          <button
            onClick={() => setShowNewPostForm(true)}
            className={`px-6 py-4 rounded-lg font-semibold text-lg shadow-lg transition-colors flex items-center ${
              darkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <Share2 className="w-5 h-5 mr-2" />
            {t.shareTip}
          </button>
        </div>

        {/* New Post Form */}
        {showNewPostForm && (
          <div className={`farmer-card mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {t.askQuestion}
            </h3>
            
            <div className="space-y-4">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder={t.askQuestionPlaceholder}
                className={`w-full p-4 border rounded-lg focus:outline-none focus:border-farmer-green resize-none ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                rows="4"
              />
              
              <div className="flex gap-2">
                <button
                  onClick={handlePost}
                  className="flex-1 farmer-button"
                >
                  <Send className="w-5 h-5 inline mr-2" />
                  {t.postButton}
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
                
                <button
                  onClick={() => setShowNewPostForm(false)}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                  }`}
                >
                  Cancel
                </button>
              </div>
              
              {isListening && (
                <div className={`text-center p-2 rounded ${darkMode ? 'bg-red-900' : 'bg-red-100'}`}>
                  <p className={`text-sm ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                    Listening... Speak your question now
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className={`farmer-card mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Categories
            </h3>
            <Filter className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-farmer-green text-white'
                      : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Expert Reviews Section */}
        <div className={`farmer-card mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t.expertReviews}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  RS
                </div>
                <div>
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Rajinder Singh
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {t.verified}
                    </span>
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    25 {t.yearsExperience}
                  </p>
                </div>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                "For wheat cultivation in Punjab, I recommend using HD-2967 variety. It's resistant to rust and gives excellent yield of 45-50 quintals per acre with proper irrigation."
              </p>
              <div className="flex items-center text-sm">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  4.8/5 - 38 {t.helpfulVotes}
                </span>
              </div>
            </div>

            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  HK
                </div>
                <div>
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Harpreet Kaur
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {t.verified}
                    </span>
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    20 {t.yearsExperience}
                  </p>
                </div>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                "Flood-resistant rice varieties like Swarna Sub-1 can survive 14 days of complete submergence. I've used them successfully in low-lying areas of my village."
              </p>
              <div className="flex items-center text-sm">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  4.9/5 - 58 {t.helpfulVotes}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t.recentPosts}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p>{t.noPosts}</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id} className={`farmer-card ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-farmer-green rounded-full flex items-center justify-center text-white font-bold">
                    {post.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {post.author}
                      </h3>
                      {post.verified && (
                        <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {t.verified}
                        </span>
                      )}
                      <span className={`ml-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {post.experience} {t.yearsExperience}
                      </span>
                    </div>
                    
                    <h4 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {post.title}
                    </h4>
                    
                    <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {post.content}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 text-xs rounded-full ${
                            darkMode 
                              ? 'bg-gray-700 text-gray-300' 
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center space-x-1 transition-colors ${
                            likedPosts.has(post.id)
                              ? 'text-red-500'
                              : darkMode
                                ? 'text-gray-400 hover:text-red-500'
                                : 'text-gray-600 hover:text-red-500'
                          }`}
                        >
                          <ThumbsUp className="w-5 h-5" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        
                        <button className={`flex items-center space-x-1 transition-colors ${
                          darkMode 
                            ? 'text-gray-400 hover:text-blue-500' 
                            : 'text-gray-600 hover:text-blue-500'
                        }`}>
                          <MessageCircle className="w-5 h-5" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        
                        <button className={`flex items-center space-x-1 transition-colors ${
                          darkMode 
                            ? 'text-gray-400 hover:text-green-500' 
                            : 'text-gray-600 hover:text-green-500'
                        }`}>
                          <Share2 className="w-5 h-5" />
                          <span className="text-sm">{post.shares}</span>
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {post.helpful} {t.helpful}
                        </span>
                      </div>
                      
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {post.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
