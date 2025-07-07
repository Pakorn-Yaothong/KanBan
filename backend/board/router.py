# backend/board/router.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from . import schemas, models
from database import get_db
from user.models import User  # <-- นำเข้า User มาตรวจ FK

router = APIRouter(
    tags=["boards"],
)

@router.get("/", response_model=list[schemas.BoardOut])
def list_boards(db: Session = Depends(get_db)):
    """
    ดึงรายการบอร์ดทั้งหมด
    """
    return db.query(models.Board).all()

@router.post("/", response_model=schemas.BoardOut, status_code=201)
def create_board(data: schemas.BoardCreate, db: Session = Depends(get_db)):
    """
    สร้างบอร์ดใหม่ พร้อมตรวจว่า owner_id มีในตาราง users จริงหรือไม่
    """
    # เช็ค FK owner_id
    if not db.query(User).filter(User.id == data.owner_id).first():
        raise HTTPException(status_code=404, detail="User not found")

    board = models.Board(**data.dict())
    db.add(board)
    try:
        db.commit()
        db.refresh(board)
    except Exception:
        db.rollback()
        raise HTTPException(status_code=500, detail="Cannot create board")
    return board
