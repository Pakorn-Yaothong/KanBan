from sqlalchemy import Column as SAColumn, Integer, ForeignKey, String, DateTime
from database import Base
from datetime import datetime

class Invitation(Base):
    __tablename__ = "invitations"

    id           = SAColumn(Integer, primary_key=True, index=True)
    user_id      = SAColumn(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    board_id     = SAColumn(Integer, ForeignKey("boards.id", ondelete="CASCADE"), nullable=False)
    sender_id    = SAColumn(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    status       = SAColumn(String, default="pending")
    created_at   = SAColumn(DateTime, default=datetime.utcnow)
    responded_at = SAColumn(DateTime, nullable=True)
