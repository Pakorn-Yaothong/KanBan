#backend/board/schemas.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from column.schemas import ColumnOut
from typing import List
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
    updated_at: Optional[datetime]

    # ✅ เพิ่มตรงนี้!
    columns: List[ColumnOut] = []

    class Config:
        from_attributes = True
