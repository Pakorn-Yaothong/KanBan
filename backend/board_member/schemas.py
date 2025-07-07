from pydantic import BaseModel
from datetime import datetime
from enum import Enum

class MemberRole(str, Enum):
    owner  = "owner"
    editor = "editor"
    viewer = "viewer"

class BoardMemberCreate(BaseModel):
    board_id: int
    user_id: int
    role: MemberRole

class BoardMemberOut(BaseModel):
    board_id: int
    user_id: int
    role: MemberRole
    joined_at: datetime

    class Config:
        from_attributes = True
