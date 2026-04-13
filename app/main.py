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
        
        history_text = request.history or ""

        raw_result = future_ai.generate_future(request.user_decision, history=history_text)
        
        import re
        cleaned_data = re.sub(r"```json|```", "", raw_result).strip()
        data = json.loads(cleaned_data)

        negative = data.get("cenario_negativo", {}) or {}
        positive = data.get("cenario_positivo", {}) or {}

        def pick(payload: dict, *keys: str, default: str = "Sem dados disponíveis") -> str:
            for key in keys:
                value = payload.get(key)
                if isinstance(value, str) and value.strip():
                    return value.strip()
            return default

        normalized_negative = {
            "1_mes": pick(negative, "1_mes", "1 mês", "um_mes"),
            "3_meses": pick(negative, "3_meses", "3 meses", "tres_meses"),
            "6_meses": pick(negative, "6_meses", "6 meses", "seis_meses"),
            "consequencias": pick(negative, "consequencias", "consequência", "consequencia"),
        }
        normalized_positive = {
            "1_mes": pick(positive, "1_mes", "1 mês", "um_mes"),
            "3_meses": pick(positive, "3_meses", "3 meses", "tres_meses"),
            "6_meses": pick(positive, "6_meses", "6 meses", "seis_meses"),
            "ganhos": pick(positive, "ganhos", "beneficios", "benefícios"),
        }

        new_entry = models.UserDecision(
            user_input=request.user_decision,
            negative_scenario=normalized_negative,
            positive_scenario=normalized_positive
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