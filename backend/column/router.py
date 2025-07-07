# backend/column/router.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from . import models, schemas
from database import get_db
from board.models import Board   # <-- เปลี่ยนตรงนี้

router = APIRouter(
    tags=["columns"],
)

@router.get("/", response_model=list[schemas.ColumnOut])
def list_columns(db: Session = Depends(get_db)):
    """
    ดึงรายการคอลัมน์ทั้งหมด
    """
    return db.query(models.Column).all()

@router.post("/", response_model=schemas.ColumnOut, status_code=201)
def create_column(data: schemas.ColumnCreate, db: Session = Depends(get_db)):
    """
    สร้างคอลัมน์ใหม่ (ตรวจสอบ board_id ว่ามีอยู่)
    """
    if not db.get(Board, data.board_id):
        raise HTTPException(status_code=404, detail="Board not found")

    col = models.Column(
        board_id=data.board_id,
        name=data.name,
        position=data.position or 0
    )
    db.add(col)
    db.commit()
    db.refresh(col)
    return col
