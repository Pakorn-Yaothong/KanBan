# backend/user/router.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from . import models, schemas
from database import get_db

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(
    tags=["users"],
)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

@router.get("/", response_model=list[schemas.UserOut])
def list_users(db: Session = Depends(get_db)):
    """
    ดึงรายการผู้ใช้ทั้งหมด
    """
    return db.query(models.User).all()

@router.post("/", response_model=schemas.UserOut, status_code=201)
def create_user(data: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    สร้างผู้ใช้ใหม่ พร้อมแฮชรหัสผ่าน
    """
    # ตรวจสอบซ้ำ username / email
    if db.query(models.User).filter(models.User.username == data.username).first():
        raise HTTPException(status_code=400, detail="Username already registered")
    if db.query(models.User).filter(models.User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    # แฮชรหัสผ่าน
    hashed_pw = get_password_hash(data.password)

    # สร้าง instance ของ User
    user = models.User(
        username=data.username,
        email=data.email,
        password_hash=hashed_pw,
        first_name=data.first_name,
        last_name=data.last_name
    )
    db.add(user)
    try:
        db.commit()
        db.refresh(user)
    except Exception:
        db.rollback()
        raise HTTPException(status_code=500, detail="Cannot create user")
    return user
