# backend/user/schemas.py
from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    first_name: str | None = None
    last_name: str | None = None
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    first_name: str | None
    last_name: str | None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
