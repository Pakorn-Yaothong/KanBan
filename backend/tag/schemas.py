# backend/tag/schemas.py
from pydantic import BaseModel
from datetime import datetime

class TagCreate(BaseModel):
    task_id: int
    name: str
    color: str

class TagOut(BaseModel):
    id: int
    task_id: int
    name: str
    color: str
    created_at: datetime

    class Config:
        from_attributes = True
