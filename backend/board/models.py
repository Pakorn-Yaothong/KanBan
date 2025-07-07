from sqlalchemy import Column as SAColumn, Integer, String, Text, DateTime, ForeignKey
from database import Base
from datetime import datetime

class Board(Base):
    __tablename__ = "boards"

    id          = SAColumn(Integer, primary_key=True, index=True)
    owner_id    = SAColumn(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name        = SAColumn(String, nullable=False)
    description = SAColumn(Text, nullable=True)
    created_at  = SAColumn(DateTime, default=datetime.utcnow)
    updated_at  = SAColumn(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
