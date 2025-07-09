#kanban\backend\column\schemas.py
from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class ColumnCreate(BaseModel):
    board_id: int
    name: str
    position: Optional[int] = 0

class ColumnOut(BaseModel):
    id: int
    board_id: int
    name: str
    position: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
