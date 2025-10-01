from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import asyncio
import json
import base64
from typing import List, Optional
import logging
from datetime import datetime
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="KRISHIMITRA API",
    description="Backend API for KRISHIMITRA - Farmer-friendly agricultural advisory platform",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock data storage
users_db = {}
posts_db = []
weather_cache = {}
crop_recommendations_cache = {}

@app.get("/")
async def root():
    return {"message": "Welcome to KRISHIMITRA API", "version": "1.0.0"}

@app.post("/auth/login")
async def login(phone_number: str = Form(...), farmer_card: str = Form(...)):
    """Authenticate farmer with phone number and farmer card"""
    try:
        # Mock authentication - in real app, verify with database
        if len(phone_number) == 10 and len(farmer_card) >= 5:
            user_data = {
                "id": f"farmer_{phone_number}",
                "phone_number": phone_number,
                "farmer_card": farmer_card,
                "name": f"Farmer {phone_number[-4:]}",
                "join_date": datetime.now().isoformat(),
                "farm_size": "",
                "farming_years": "",
                "crop_history": "",
                "soil_type": ""
            }
            
            users_db[phone_number] = user_data
            logger.info(f"User logged in: {phone_number}")
            return {"success": True, "user": user_data}
        else:
            raise HTTPException(status_code=400, detail="Invalid credentials")
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(status_code=500, detail="Login failed")

@app.get("/user/profile/{user_id}")
async def get_user_profile(user_id: str):
    """Get user profile data"""
    try:
        user = users_db.get(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return {"success": True, "user": user}
    except Exception as e:
        logger.error(f"Profile fetch error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch profile")

@app.post("/user/profile/{user_id}")
async def update_user_profile(
    user_id: str,
    farm_size: Optional[str] = None,
    farming_years: Optional[str] = None,
    crop_history: Optional[str] = None,
    soil_type: Optional[str] = None
):
    """Update user profile data"""
    try:
        if user_id not in users_db:
            raise HTTPException(status_code=404, detail="User not found")
        
        user = users_db[user_id]
        if farm_size is not None:
            user["farm_size"] = farm_size
        if farming_years is not None:
            user["farming_years"] = farming_years
        if crop_history is not None:
            user["crop_history"] = crop_history
        if soil_type is not None:
            user["soil_type"] = soil_type
            
        users_db[user_id] = user
        logger.info(f"Profile updated for user: {user_id}")
        return {"success": True, "message": "Profile updated successfully"}
    except Exception as e:
        logger.error(f"Profile update error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update profile")

@app.get("/weather/{lat}/{lon}")
async def get_weather(lat: float, lon: float):
    """Get weather data for given coordinates"""
    try:
        # Mock weather data - in real app, integrate with OpenWeather API
        weather_data = {
            "temperature": 28.5,
            "humidity": 65,
            "wind_speed": 12,
            "description": "Partly Cloudy",
            "location": {"lat": lat, "lon": lon},
            "alerts": [
                {
                    "type": "warning",
                    "message": "Heavy rainfall expected in next 2 days"
                },
                {
                    "type": "info", 
                    "message": "Optimal conditions for wheat planting"
                }
            ],
            "timestamp": datetime.now().isoformat()
        }
        
        weather_cache[f"{lat}_{lon}"] = weather_data
        return {"success": True, "weather": weather_data}
    except Exception as e:
        logger.error(f"Weather fetch error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch weather")

@app.post("/crop-advisory/analyze")
async def analyze_crop_advisory(
    crop_type: str = Form(...),
    soil_type: str = Form(...),
    moisture_level: str = Form(...),
    weather_condition: str = Form(...),
    location: Optional[str] = Form(None)
):
    """Generate AI crop recommendations based on input parameters"""
    try:
        # Mock AI recommendations
        recommendations = {
            "crop": crop_type,
            "soil": soil_type,
            "moisture": moisture_level,
            "weather": weather_condition,
            "location": location,
            "recommendations": {
                "soil_management": generate_soil_advice(soil_type, moisture_level),
                "pest_control": generate_pest_control_advice(crop_type, weather_condition),
                "yield_improvement": generate_yield_advice(crop_type, soil_type),
                "irrigation": generate_irrigation_advice(moisture_level, weather_condition),
                "fertilizers": generate_fertilizer_advice(crop_type, soil_type),
                "planting_time": generate_planting_time_advice(crop_type, weather_condition),
                "harvesting": generate_harvesting_advice(crop_type)
            },
            "confidence_score": 0.85,
            "timestamp": datetime.now().isoformat()
        }
        
        crop_recommendations_cache[f"{crop_type}_{soil_type}"] = recommendations
        logger.info(f"Generated recommendations for {crop_type} in {soil_type}")
        return {"success": True, "recommendations": recommendations}
    except Exception as e:
        logger.error(f"Crop advisory error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate recommendations")

@app.post("/crop-advisory/image-analysis")
async def analyze_crop_image(image: UploadFile = File(...)):
    """Analyze uploaded crop/soil image for disease and pest detection"""
    try:
        # Read image data
        image_data = await image.read()
        
        # Mock image analysis - in real app, use ML model
        analysis_result = {
            "crop_detected": "Wheat",
            "disease_detected": "No diseases detected",
            "pest_detected": "Minor aphid infestation",
            "soil_health": "Good",
            "confidence_scores": {
                "crop_detection": 0.92,
                "disease_detection": 0.95,
                "pest_detection": 0.78,
                "soil_health": 0.85
            },
            "recommendations": [
                "Apply neem oil spray for aphid control",
                "Soil appears healthy, continue current practices",
                "Monitor for early signs of rust disease"
            ],
            "image_size": len(image_data),
            "timestamp": datetime.now().isoformat()
        }
        
        logger.info(f"Image analyzed: {image.filename}")
        return {"success": True, "analysis": analysis_result}
    except Exception as e:
        logger.error(f"Image analysis error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to analyze image")

@app.post("/community/posts")
async def create_post(
    author: str = Form(...),
    title: str = Form(...),
    content: str = Form(...),
    category: str = Form(...),
    tags: Optional[str] = Form(None)
):
    """Create a new community post"""
    try:
        post = {
            "id": len(posts_db) + 1,
            "author": author,
            "title": title,
            "content": content,
            "category": category,
            "tags": tags.split(",") if tags else [],
            "likes": 0,
            "comments": 0,
            "shares": 0,
            "helpful": 0,
            "timestamp": datetime.now().isoformat(),
            "verified": False
        }
        
        posts_db.append(post)
        logger.info(f"New post created by {author}")
        return {"success": True, "post": post}
    except Exception as e:
        logger.error(f"Post creation error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create post")

@app.get("/community/posts")
async def get_posts(category: Optional[str] = None, limit: int = 20):
    """Get community posts with optional category filter"""
    try:
        filtered_posts = posts_db
        if category and category != "all":
            filtered_posts = [post for post in posts_db if post["category"] == category]
        
        # Sort by timestamp (newest first)
        filtered_posts.sort(key=lambda x: x["timestamp"], reverse=True)
        
        return {"success": True, "posts": filtered_posts[:limit]}
    except Exception as e:
        logger.error(f"Posts fetch error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch posts")

@app.post("/community/posts/{post_id}/like")
async def like_post(post_id: int):
    """Like a community post"""
    try:
        post = next((p for p in posts_db if p["id"] == post_id), None)
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")
        
        post["likes"] += 1
        logger.info(f"Post {post_id} liked")
        return {"success": True, "likes": post["likes"]}
    except Exception as e:
        logger.error(f"Like post error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to like post")

@app.get("/government-portals")
async def get_government_portals():
    """Get list of government portals"""
    try:
        portals = [
            {
                "id": 1,
                "title": "Punjab Agricultural University Portal",
                "description": "Research, education, and extension services for farmers",
                "url": "https://www.pau.edu",
                "category": "Education & Research",
                "logo": "pau_logo.png"
            },
            {
                "id": 2,
                "title": "Kisan Suvidha",
                "description": "Government of India's farmer information portal",
                "url": "https://www.kisansuvidha.gov.in",
                "category": "Information",
                "logo": "kisan_suvidha_logo.png"
            },
            {
                "id": 3,
                "title": "PM-Kisan Samman Nidhi",
                "description": "Direct income support scheme for farmers",
                "url": "https://pmkisan.gov.in",
                "category": "Financial Support",
                "logo": "pm_kisan_logo.png"
            },
            {
                "id": 4,
                "title": "Mandi Board Punjab",
                "description": "Agricultural marketing and price information",
                "url": "https://www.mandiboard.gov.in",
                "category": "Marketing",
                "logo": "mandi_board_logo.png"
            },
            {
                "id": 5,
                "title": "myScheme Portal",
                "description": "Government schemes and benefits information",
                "url": "https://www.myscheme.gov.in",
                "category": "Government Schemes",
                "logo": "myscheme_logo.png"
            },
            {
                "id": 6,
                "title": "eNAM",
                "description": "National Agriculture Market for online trading",
                "url": "https://www.enam.gov.in",
                "category": "Trading",
                "logo": "enam_logo.png"
            }
        ]
        
        return {"success": True, "portals": portals}
    except Exception as e:
        logger.error(f"Government portals error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch portals")

# Helper functions for generating recommendations
def generate_soil_advice(soil_type: str, moisture_level: str) -> str:
    """Generate soil management advice"""
    advice_map = {
        "Clay Soil": "Add organic matter and sand to improve drainage. Avoid over-watering.",
        "Sandy Soil": "Add compost and organic matter to improve water retention.",
        "Loamy Soil": "Maintain organic matter content with regular composting.",
        "Silty Soil": "Improve drainage with sand and organic matter.",
        "Black Soil": "Excellent for cotton and sugarcane. Maintain pH between 6.5-7.5.",
        "Red Soil": "Add lime and organic matter to improve fertility."
    }
    return advice_map.get(soil_type, "Consult local agricultural extension officer for soil-specific advice.")

def generate_pest_control_advice(crop_type: str, weather_condition: str) -> str:
    """Generate pest control advice"""
    crop_pests = {
        "Wheat": "Monitor for aphids and rust diseases. Use neem oil spray in humid conditions.",
        "Rice": "Watch for stem borer and blast disease. Apply proper drainage in rainy season.",
        "Maize": "Control corn earworm and armyworm. Use Bt varieties for better resistance.",
        "Cotton": "Monitor for bollworm and whitefly. Use integrated pest management.",
        "Sugarcane": "Control shoot borer and red rot disease. Maintain field hygiene."
    }
    return crop_pests.get(crop_type, "Regular field monitoring and integrated pest management recommended.")

def generate_yield_advice(crop_type: str, soil_type: str) -> str:
    """Generate yield improvement advice"""
    return f"For {crop_type} in {soil_type}: Use high-yielding varieties, proper spacing, timely weeding, and balanced fertilization for optimal yields."

def generate_irrigation_advice(moisture_level: str, weather_condition: str) -> str:
    """Generate irrigation advice"""
    if moisture_level in ["Very Dry", "Dry"]:
        return "Increase irrigation frequency. Consider drip irrigation for water efficiency."
    elif moisture_level == "Very Moist":
        return "Reduce irrigation to prevent waterlogging. Improve drainage."
    else:
        return "Maintain regular irrigation schedule based on crop requirements."

def generate_fertilizer_advice(crop_type: str, soil_type: str) -> str:
    """Generate fertilizer recommendations"""
    fertilizer_map = {
        "Wheat": "Apply NPK 120:60:40 kg/ha. Split application recommended.",
        "Rice": "Apply NPK 150:75:60 kg/ha. Use slow-release fertilizers.",
        "Maize": "Apply NPK 180:90:60 kg/ha. Side dressing for nitrogen.",
        "Cotton": "Apply NPK 100:50:50 kg/ha. Foliar application for micronutrients.",
        "Sugarcane": "Apply NPK 250:100:100 kg/ha. Organic manure recommended."
    }
    return fertilizer_map.get(crop_type, "Consult soil test results for specific fertilizer recommendations.")

def generate_planting_time_advice(crop_type: str, weather_condition: str) -> str:
    """Generate planting time advice"""
    planting_times = {
        "Wheat": "October-November for Rabi season. Ensure soil temperature 15-20°C.",
        "Rice": "June-July for Kharif season. Transplant when seedlings are 25-30 days old.",
        "Maize": "May-June for Kharif season. Plant when soil temperature is above 10°C.",
        "Cotton": "April-May for Kharif season. Plant when soil temperature is 18-20°C.",
        "Sugarcane": "October-November or February-March. Plant setts in moist soil."
    }
    return planting_times.get(crop_type, "Plant according to local climatic conditions and crop calendar.")

def generate_harvesting_advice(crop_type: str) -> str:
    """Generate harvesting advice"""
    harvesting_advice = {
        "Wheat": "Harvest when grains are hard and moisture content is 14-16%.",
        "Rice": "Harvest when 80% grains are golden yellow. Moisture content 20-22%.",
        "Maize": "Harvest when kernels are dented and moisture content is 20-25%.",
        "Cotton": "Harvest when bolls are fully opened. Pick in dry weather conditions.",
        "Sugarcane": "Harvest when cane is 12-18 months old. Cut close to ground level."
    }
    return harvesting_advice.get(crop_type, "Harvest at proper maturity stage for best quality and yield.")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
