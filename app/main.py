from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from .database import engine, Base, get_db
from .engine import FutureEngine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="FutureMe AI")
future_ai = FutureEngine()

@app.get("/")
def home():
    return { "message": "FutureMe AI rodando"}

@app.post("/simulate")
def simulate_future(user_decision: str):
    result = future_ai.generate_future(user_decision)
    return { "simulation": result }