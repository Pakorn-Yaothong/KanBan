from sqlalchemy import Column as SAColumn, Integer, String, Text, DateTime, ForeignKey
from database import Base
from datetime import datetime

class Notification(Base):
    __tablename__ = "notifications"

    id         = SAColumn(Integer, primary_key=True, index=True)
    user_id    = SAColumn(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title      = SAColumn(String, nullable=False)
    message    = SAColumn(Text, nullable=False)
    type       = SAColumn(String, nullable=False)
    related_id = SAColumn(String, nullable=True)
    created_at = SAColumn(DateTime, default=datetime.utcnow)
    read_at    = SAColumn(DateTime, nullable=True)
