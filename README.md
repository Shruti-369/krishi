# KRISHIMITRA (कृषिमित्र / ਕ੍ਰਿਸ਼ਿਮਿਤ੍ਰਾ)

A comprehensive farmer-friendly agricultural advisory website with multilingual support (English, Hindi, Punjabi), designed specifically for Indian farmers with features like crop advisory, weather alerts, community support, and government portal access.

## 🌾 Features

### Core Functionality
- **Authentication**: Login with phone number and farmer card
- **Dashboard**: Farmer profile, weather alerts, image upload
- **Crop Advisory**: AI-powered recommendations, photo detection, speech recognition
- **Government Portals**: Access to official agricultural services
- **Community**: Farmer reviews, tips, and Q&A platform
- **Multilingual**: Support for English, Hindi, and Punjabi
- **Voice Features**: Speech-to-text and text-to-speech
- **Mobile Optimized**: Responsive design with big buttons for accessibility

### Technical Features
- **Frontend**: React 18 with Tailwind CSS
- **Backend**: FastAPI with comprehensive API endpoints
- **Voice Integration**: Speech recognition and synthesis
- **Image Analysis**: Crop/soil disease and pest detection
- **Weather Integration**: Real-time weather alerts
- **Dark Mode**: User-friendly dark theme toggle

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- Python 3.8+
- npm or yarn

### Frontend Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm start
   ```

3. **Open browser**: Navigate to `http://localhost:3000`

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Start FastAPI server**:
   ```bash
   python run.py
   ```

4. **API Documentation**: Visit `http://localhost:8000/docs`

## 📱 Usage

### Login
- Use phone number and farmer card number to authenticate
- Voice login available in all supported languages

### Dashboard
- Complete farmer profile (farm size, experience, crop history)
- View weather alerts and current conditions
- Upload crop/soil images for analysis
- Quick access to all features

### Crop Advisory
- **Manual Input**: Select crop, soil type, moisture, weather conditions
- **Photo Detection**: Upload images for disease/pest detection
- **AI Recommendations**: Get personalized advice based on PAU datasets
- **Chatbot**: Interactive Q&A with agricultural expertise

### Community
- Ask questions and share farming tips
- Read expert farmer reviews
- Browse categorized posts (soil management, pest control, etc.)
- Like, share, and comment on posts

### Government Portals
- Carousel view of official agricultural portals
- Direct links to PAU, PM-Kisan, eNAM, etc.
- Quick access to government schemes

## 🛠️ API Endpoints

### Authentication
- `POST /auth/login` - Farmer login
- `GET /user/profile/{user_id}` - Get user profile
- `POST /user/profile/{user_id}` - Update user profile

### Weather & Location
- `GET /weather/{lat}/{lon}` - Get weather data

### Crop Advisory
- `POST /crop-advisory/analyze` - Generate AI recommendations
- `POST /crop-advisory/image-analysis` - Analyze crop images

### Community
- `POST /community/posts` - Create new post
- `GET /community/posts` - Get posts with filtering
- `POST /community/posts/{post_id}/like` - Like a post

### Government Portals
- `GET /government-portals` - Get list of official portals

## 🌐 Multilingual Support

The application supports three languages:
- **English**: Default language
- **Hindi (हिंदी)**: Complete Hindi translation
- **Punjabi (ਪੰਜਾਬੀ)**: Full Punjabi translation

Language switching is available in the navbar and affects:
- All UI text and labels
- Voice recognition language
- Text-to-speech language

## 🎤 Voice Features

### Speech-to-Text
- Available in all supported languages
- Used for login, crop advisory, and community posts
- Automatic language detection based on selected language

### Text-to-Speech
- Reads out important notifications
- Provides audio feedback for user actions
- Supports Hindi, Punjabi, and English pronunciation

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Large, touch-friendly buttons
- Optimized for low-literacy users
- Voice-first navigation for accessibility
- Big icons and clear visual hierarchy

## 🎨 Design Features

### Color Scheme
- **Primary Green**: `#228B22` (Farmer Green)
- **Earth Brown**: `#8B4513` (Soil color)
- **Wheat Yellow**: `#F5DEB3` (Accent color)
- **Dark Mode**: Complete dark theme support

### Typography
- Hindi: Noto Sans Devanagari
- Punjabi: Noto Sans Gurmukhi
- English: System fonts for better readability

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:8000
REACT_APP_WEATHER_API_KEY=your_weather_api_key
```

### Backend Configuration
Update `backend/main.py` for production:
- Database connection
- API key configurations
- CORS settings
- Authentication middleware

## 📊 Data Sources

### Agricultural Data
- **Punjab Agricultural University (PAU)**: Crop recommendations and guidelines
- **OpenWeather API**: Weather data and alerts
- **Agmarknet API**: Market prices and information
- **Government Portals**: Official schemes and services

### Disclaimer
All advisory in KRISHIMITRA is based on datasets and guidelines provided by Punjab Agricultural University (PAU).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

- **Help Line**: +91-9876543210 (24/7 support)
- **Email**: support@krishimitra.com
- **Website**: https://krishimitra.com

## 🙏 Acknowledgments

- Punjab Agricultural University (PAU) for agricultural datasets
- Indian Government for portal access and schemes
- Open source community for libraries and tools
- Local farmers for feedback and testing

---

**KRISHIMITRA** - Empowering farmers with technology for better harvests! 🌾
