from sqlalchemy import Column as SAColumn, Integer, String, DateTime, ForeignKey
from database import Base
from datetime import datetime

class Tag(Base):
    __tablename__ = "task_tags"

    id         = SAColumn(Integer, primary_key=True, index=True)
    task_id    = SAColumn(Integer, ForeignKey("tasks.id", ondelete="CASCADE"), nullable=False)
    name       = SAColumn(String, nullable=False)
    color      = SAColumn(String, nullable=False)
    created_at = SAColumn(DateTime, default=datetime.utcnow)
