from sqlalchemy import Column as SAColumn, Integer, String, DateTime
from database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id            = SAColumn(Integer, primary_key=True, index=True)
    username      = SAColumn(String, unique=True, index=True, nullable=False)
    email         = SAColumn(String, unique=True, index=True, nullable=False)
    password_hash = SAColumn(String, nullable=False)
    first_name    = SAColumn(String, nullable=True)
    last_name     = SAColumn(String, nullable=True)
    created_at    = SAColumn(DateTime, default=datetime.utcnow)
    updated_at    = SAColumn(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
