from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
import os

app = FastAPI()

# POVOLENIE SPOJENIA (CORS) - Toto je kritické!
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # V produkcii tu dáš konkrétnu adresu
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pripojenie k MongoDB
client = AsyncIOMotorClient("mongodb+srv://driplock_db_user:Karneval123@cluster0.xekrcse.mongodb.net/?appName=Cluster0")
db = client.boccaccio_db
collection = db.daily_menu

class DailyMenu(BaseModel):
    soup: str
    mainCourse: str
    price: str

@app.get("/api/daily-menu")
async def get_menu():
    menu = await collection.find().sort("_id", -1).to_list(1)
    if menu:
        # Prekonvertujeme ObjectId na string pre JSON
        menu[0]["_id"] = str(menu[0]["_id"])
        return menu[0]
    return {"soup": "Pripravujeme...", "mainCourse": "Pripravujeme...", "price": "8,90 €"}

@app.post("/api/daily-menu")
async def update_menu(menu: DailyMenu):
    await collection.delete_many({}) # Vymažeme staré menu (chceme len jedno aktuálne)
    result = await collection.insert_one(menu.dict())
    return {"status": "success", "id": str(result.inserted_id)}