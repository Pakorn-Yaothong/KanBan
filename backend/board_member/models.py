from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from database import Base
from datetime import datetime

class BoardMember(Base):
    __tablename__ = "board_members"

    id         = Column(Integer, primary_key=True, index=True)
    board_id   = Column(Integer, ForeignKey("boards.id"), nullable=False)
    user_id    = Column(Integer, ForeignKey("users.id"), nullable=False)
    role       = Column(String, nullable=False, default="viewer")
    joined_at  = Column(DateTime, default=datetime.utcnow)
