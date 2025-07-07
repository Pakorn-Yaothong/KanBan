from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class BoardCreate(BaseModel):
    owner_id: int
    name: str
    description: str | None = None

class BoardOut(BaseModel):
    id: int
    owner_id: int
    name: str
    description: str | None
    created_at: datetime
    updated_at: Optional[datetime]  # เปลี่ยนตรงนี้ให้รองรับ None

    class Config:
        from_attributes = True
