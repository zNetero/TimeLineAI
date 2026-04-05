from sqlalchemy import Column, Integer, String, DateTime, Text
from datetime import datetime
from .database import Base

class UserDecision(Base):
    __tablename__ = "user_decisions"

    id = Column(Integer, primary_key=True, index=True)
    user_input = Column(Text)
    negative_scenario = Column(Text)
    positive_scenario = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)