from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
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
stats_collection = db.stats

# AKTUALIZOVANÝ MODEL - pridané polia pre médiá
class DailyMenu(BaseModel):
    soup: str
    mainCourse: str
    price: str
    announcement: Optional[str] = ""
    image: Optional[str] = ""
    mediaType: Optional[str] = "none"    # Nové pole
    mediaContent: Optional[str] = ""     # Nové pole

# --- FUNKCIE PRE MENU ---

@app.get("/api/daily-menu")
async def get_menu():
    menu = await collection.find().sort("_id", -1).to_list(1)
    if menu:
        data = menu[0]
        data["_id"] = str(data["_id"])
        
        # Zabezpečenie, aby frontend vždy dostal všetky polia (aj keby boli v DB prázdne)
        return {
            "soup": data.get("soup", "Pripravujeme..."),
            "mainCourse": data.get("mainCourse", "Pripravujeme..."),
            "price": data.get("price", "8,90 €"),
            "announcement": data.get("announcement", ""),
            "image": data.get("image", ""),
            "mediaType": data.get("mediaType", "none"),
            "mediaContent": data.get("mediaContent", "")
        }
        
    return {
        "soup": "Pripravujeme...", 
        "mainCourse": "Pripravujeme...", 
        "price": "8,90 €",
        "announcement": "",
        "image": "",
        "mediaType": "none",
        "mediaContent": ""
    }

@app.post("/api/daily-menu")
async def update_menu(menu: DailyMenu):
    # Vymažeme staré menu a vložíme nové (všetky polia vrátane médií)
    await collection.delete_many({}) 
    result = await collection.insert_one(menu.dict())
    return {"status": "success", "id": str(result.inserted_id)}

# --- FUNKCIE PRE NÁVŠTEVNOSŤ ---

@app.get("/api/track-visit")
async def track_visit():
    await stats_collection.update_one(
        {"_id": "site_stats"},
        {"$inc": {"total_visits": 1}},
        upsert=True
    )
    return {"status": "recorded"}

@app.get("/api/stats")
async def get_stats():
    stats = await stats_collection.find_one({"_id": "site_stats"})
    if stats:
        return {"total_visits": stats.get("total_visits", 0)}
    return {"total_visits": 0}