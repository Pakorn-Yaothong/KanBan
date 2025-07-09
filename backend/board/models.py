#backend/board/models.py
from sqlalchemy import Column as SAColumn, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
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

# ✅ ใส่ไว้ท้ายไฟล์ เพื่อไม่ให้ circular import ผิดพลาด
from column.models import ColumnModel
Board.columns = relationship("ColumnModel", back_populates="board", cascade="all, delete-orphan")
