from pydantic import BaseModel
from datetime import datetime

class SimulationCreate(BaseModel):
    user_decision: str
    history: str | None = ""

class SimulationResponse(BaseModel):
    id: int
    user_input: str
    negative_scenario: dict
    positive_scenario: dict
    timestamp: datetime
    estimativa_tempo: str

    class Config:
        from_attributes = True