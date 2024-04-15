from fastapi import FastAPI, Depends, Body
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson.objectid import ObjectId  # for handling ObjectIds
import uvicorn

# Replace with your actual connection string
mongo_uri = "mongodb+srv://cinera2:z7Mi1ts4ASIcf2oc@mern.jdhu32d.mongodb.net/?retryWrites=true&w=majority&appName=Mern"

# Connect to MongoDB
client = MongoClient(mongo_uri)
db = client["ani-fox-db"]  # Replace with your database name

app = FastAPI()

# CORS configuration (adjust as needed)
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)


# Dependency for accessing the database
async def get_db():
    yield db


@app.get("/api/anime")
async def find_anime_by_id(db: MongoClient = Depends(get_db), ani_id: str = Body(...)):
    # Convert string ID to ObjectId for MongoDB
    object_id = ObjectId(ani_id)
    result = await db.animes.find_one({"_id": object_id})  # Use _id for MongoDB
    return result


@app.get("/api/animeGenres")
async def find_anime_by_genre(db: MongoClient = Depends(get_db), genre: str = Body(...)):
    result = await db.animes.find({"genres": genre}).to_list()  # Use to_list() for returning data
    return result


@app.get("/api/featured")
async def get_featured_anime(db: MongoClient = Depends(get_db)):
    result = await db.featured.find().to_list()
    return result


@app.get("/health")
async def health_check():
    return {"message": "Server is healthy!"}


# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)
