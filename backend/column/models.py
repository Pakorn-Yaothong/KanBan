from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from database import Base
from datetime import datetime

class Column(Base):
    __tablename__ = "columns"

    id         = Column(Integer, primary_key=True, index=True)
    board_id   = Column(Integer, ForeignKey("boards.id"), nullable=False)
    name       = Column(String, nullable=False)
    position   = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
