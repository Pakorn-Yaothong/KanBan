from sqlalchemy import Column as SAColumn, Integer, String, Text, DateTime, ForeignKey
from database import Base
from datetime import datetime

class Task(Base):
    __tablename__ = "tasks"

    id          = SAColumn(Integer, primary_key=True, index=True)
    column_id   = SAColumn(Integer, ForeignKey("columns.id", ondelete="CASCADE"), nullable=False)
    title       = SAColumn(String, nullable=False)
    description = SAColumn(Text, nullable=True)
    position    = SAColumn(Integer, nullable=True, default=0)
    created_by  = SAColumn(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at  = SAColumn(DateTime, default=datetime.utcnow)
    updated_at  = SAColumn(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
