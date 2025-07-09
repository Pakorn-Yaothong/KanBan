from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class InvitationCreate(BaseModel):
    user_id: int
    board_id: int
    sender_id: int
    status: str = "pending"

class InvitationOut(BaseModel):
    id: int
    user_id: int
    board_id: int
    sender_id: int
    status: str
    created_at: datetime
    responded_at: Optional[datetime]

    class Config:
        from_attributes = True
