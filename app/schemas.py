from pydantic import BaseModel
from datetime import datetime

class SimulationCreate(BaseModel):
    user_decision: str

class SimulationResponse(BaseModel):
    id: int
    user_input: str
    negative_scenario: str
    positive_scenario: str
    timestamp: datetime

    class Config:
        from_attributes = True