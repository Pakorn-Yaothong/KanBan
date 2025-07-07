# backend/notification/schemas.py
from pydantic import BaseModel
from datetime import datetime

class NotificationCreate(BaseModel):
    user_id: int
    title: str
    message: str
    type: str
    related_id: str | None = None

class NotificationOut(BaseModel):
    id: int
    user_id: int
    title: str
    message: str
    type: str
    related_id: str | None
    created_at: datetime
    read_at: datetime | None

    class Config:
        from_attributes = True
