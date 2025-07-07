from pydantic import BaseModel
from datetime import datetime

class ColumnCreate(BaseModel):
    board_id: int
    name: str
    position: int | None = 0

class ColumnOut(BaseModel):
    id: int
    board_id: int
    name: str
    position: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
