from pydantic import BaseModel
from datetime import datetime

class TaskAssignerCreate(BaseModel):
    task_id: int
    user_id: int

class TaskAssignerOut(BaseModel):
    id: int
    task_id: int
    user_id: int
    assigned_at: datetime

    class Config:
        from_attributes = True
