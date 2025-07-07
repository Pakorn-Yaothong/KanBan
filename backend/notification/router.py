from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from . import schemas
from .models import Notification
from user.models import User
from database import get_db

router = APIRouter(
    tags=["notifications"],
)

@router.get("/", response_model=list[schemas.NotificationOut])
def list_notifications(db: Session = Depends(get_db)):
    return db.query(Notification).all()

@router.post("/", response_model=schemas.NotificationOut, status_code=201)
def create_notification(data: schemas.NotificationCreate, db: Session = Depends(get_db)):
    if not db.query(User).filter(User.id == data.user_id).first():
        raise HTTPException(404, "User not found")
    n = Notification(**data.dict())
    db.add(n)
    db.commit()
    db.refresh(n)
    return n
