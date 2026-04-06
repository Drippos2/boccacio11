from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
import os

app = FastAPI()

# POVOLENIE SPOJENIA (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pripojenie k MongoDB
client = AsyncIOMotorClient("mongodb+srv://driplock_db_user:Karneval123@cluster0.xekrcse.mongodb.net/?appName=Cluster0")
db = client.boccaccio_db
collection = db.daily_menu
# NOVÁ KOLEKCIA PRE ŠTATISTIKY
stats_collection = db.stats

class DailyMenu(BaseModel):
    soup: str
    mainCourse: str
    price: str

# --- PÔVODNÉ FUNKCIE PRE MENU ---

@app.get("/api/daily-menu")
async def get_menu():
    menu = await collection.find().sort("_id", -1).to_list(1)
    if menu:
        menu[0]["_id"] = str(menu[0]["_id"])
        return menu[0]
    return {"soup": "Pripravujeme...", "mainCourse": "Pripravujeme...", "price": "8,90 €"}

@app.post("/api/daily-menu")
async def update_menu(menu: DailyMenu):
    await collection.delete_many({}) 
    result = await collection.insert_one(menu.dict())
    return {"status": "success", "id": str(result.inserted_id)}

# --- NOVÉ FUNKCIE PRE NÁVŠTEVNOSŤ ---

@app.get("/api/track-visit")
async def track_visit():
    """Túto funkciu zavolá hlavná stránka pri každom načítaní"""
    await stats_collection.update_one(
        {"_id": "site_stats"},
        {"$inc": {"total_visits": 1}},
        upsert=True
    )
    return {"status": "recorded"}

@app.get("/api/stats")
async def get_stats():
    """Túto funkciu bude volať Admin Panel každých 10 sekúnd"""
    stats = await stats_collection.find_one({"_id": "site_stats"})
    if stats:
        return {"total_visits": stats.get("total_visits", 0)}
    return {"total_visits": 0}