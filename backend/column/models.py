#kanban\backend\column\models.py
from sqlalchemy import Column as SAColumn, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class ColumnModel(Base):
    __tablename__ = "columns"

    id         = SAColumn(Integer, primary_key=True, index=True)
    board_id   = SAColumn(Integer, ForeignKey("boards.id"), nullable=False)
    name       = SAColumn(String, nullable=False)
    position   = SAColumn(Integer, default=0)
    created_at = SAColumn(DateTime, default=datetime.utcnow)
    updated_at = SAColumn(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# ✅ ใส่ไว้ท้ายไฟล์
from board.models import Board
ColumnModel.board = relationship("Board", back_populates="columns")
