# backend/auth/router.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta

from auth.schemas import UserCreate, UserOut, LoginData, Token
from auth.auth_service import create_user, authenticate_user
from database import get_db
from auth.jwt import create_access_token  # สมมติว่ามีฟังก์ชันสร้าง JWT

router = APIRouter()

@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register_user(data: UserCreate, db: Session = Depends(get_db)):
    try:
        user = create_user(db, data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return user

@router.post("/login", response_model=Token)
def login(data: LoginData, db: Session = Depends(get_db)):
    user = authenticate_user(db, data.email, data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token({"sub": str(user.id)}, expires_delta=timedelta(hours=1))
    return {
    "access_token": access_token,
    "token_type": "bearer",
    "user_id": user.id  # ✅ เพิ่ม user_id ใน response
}
