# backend/task/router.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from . import schemas, models          # task.schemas, task.models
from column.models import Column       # <— นำเข้า Column จากโมดูล column
from user.models   import User         # <— นำเข้า User จากโมดูล user
from database import get_db

router = APIRouter()

@router.get("/", response_model=list[schemas.TaskOut])
def list_tasks(db: Session = Depends(get_db)):
    return db.query(models.Task).all()

@router.post("/", response_model=schemas.TaskOut, status_code=201)
def create_task(data: schemas.TaskCreate, db: Session = Depends(get_db)):
    # ตรวจสอบว่า column_id มีอยู่จริงไหม
    if not db.get(Column, data.column_id):
        raise HTTPException(status_code=404, detail="Column not found")
    # ตรวจสอบว่า created_by (user_id) มีอยู่จริงไหม
    if not db.get(User, data.created_by):
        raise HTTPException(status_code=404, detail="User not found")

    task = models.Task(**data.dict())
    db.add(task)
    db.commit()
    db.refresh(task)
    return task
