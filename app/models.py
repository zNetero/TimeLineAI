from sqlalchemy import Column, Integer, String, DateTime, Text, JSON
from datetime import datetime
from .database import Base

class UserDecision(Base):
    __tablename__ = "user_decisions"

    id = Column(Integer, primary_key=True, index=True)
    user_input = Column(String)
    negative_scenario = Column(JSON)
    positive_scenario = Column(JSON)
    timestamp = Column(DateTime, default=datetime.utcnow)