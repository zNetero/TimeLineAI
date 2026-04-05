import json
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from .database import engine, Base, get_db
from .engine import FutureEngine
from . import models, schemas, database, engine

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="FutureMe AI")
future_ai = engine.FutureEngine()

@app.get("/")
def home():
    return { "message": "FutureMe AI rodando"}

@app.post("/simulate", response_model=schemas.SimulationResponse)
def simulate_future(request: schemas.SimulationCreate, db: Session = Depends(database.get_db)):
    
    history_records = db.query(models.UserDecision).order_by(models.UserDecision.timestamp.desc()).limit(3).all()
    history_text = " ".join([h.user_input for h in history_records])

    raw_result = future_ai.generate_future(request.user_decision, history=history_text)
    
    data = json.loads(raw_result)

    new_entry = models.UserDecision(
        user_input=request.user_decision,
        negative_scenario=data['cenario_negativo'],
        positive_scenario=data['cenario_positivo']
    )
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    
    return new_entry