# backend/task/schemas.py
from pydantic import BaseModel
from datetime import datetime

class TaskCreate(BaseModel):
    column_id: int
    title: str
    description: str | None = None
    position: int | None = 0
    created_by: int

class TaskOut(BaseModel):
    id: int
    column_id: int
    title: str
    description: str | None
    position: int
    created_by: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class TaskMove(BaseModel):
    task_id: int
    to_column_id: int
    new_position: int
