from sqlalchemy import Column, Integer, ForeignKey, DateTime
from database import Base
from datetime import datetime

class TaskAssigner(Base):
    __tablename__ = "task_assigners"

    id          = Column(Integer, primary_key=True, index=True)
    task_id     = Column(Integer, ForeignKey("tasks.id"), nullable=False)
    user_id     = Column(Integer, ForeignKey("users.id"), nullable=False)
    assigned_at = Column(DateTime, default=datetime.utcnow)
