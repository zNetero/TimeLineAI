from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from . import models, schemas, database, engine
import json
import traceback 

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

future_ai = engine.FutureEngine()


@app.middleware("http")
async def catch_exceptions_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as exc:
        print("--- 🚨 ERRO NO BACKEND 🚨 ---")
        traceback.print_exc() 
        return JSONResponse(
            status_code=500,
            content={"detail": "Erro interno no servidor", "msg": str(exc)},
            headers={"Access-Control-Allow-Origin": "*"} 
        )

@app.post("/simulate")
def simulate(request: schemas.SimulationCreate, db: Session = Depends(database.get_db)):
    try:
        
        history_records = db.query(models.UserDecision).order_by(models.UserDecision.timestamp.desc()).limit(3).all()
        history_text = " ".join([h.user_input for h in history_records])

        
        raw_result = future_ai.generate_future(request.user_decision, history=history_text)
        
        import re
        cleaned_data = re.sub(r"```json|```", "", raw_result).strip()
        data = json.loads(cleaned_data)
        
        
        new_entry = models.UserDecision(
            user_input=request.user_decision,
            negative_scenario=data['cenario_negativo'],
            positive_scenario=data['cenario_positivo']
        )
        db.add(new_entry)
        db.commit()
        db.refresh(new_entry)
        
        return {
            "id": new_entry.id,
            "user_input": new_entry.user_input,
            "negative_scenario": new_entry.negative_scenario,
            "positive_scenario": new_entry.positive_scenario,
            "timestamp": new_entry.timestamp.isoformat(),
            "estimativa_tempo": data.get("estimativa_tempo", "Não estimada")
        }
    except Exception as e:
        db.rollback()
        print(f"Erro na rota simulate: {e}")
        raise e