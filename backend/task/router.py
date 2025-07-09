# backend/task/router.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from . import schemas, models          # task.schemas, task.models
from column.models import ColumnModel
from user.models   import User         # <— นำเข้า User จากโมดูล user
from database import get_db

router = APIRouter()

@router.get("/", response_model=list[schemas.TaskOut])
def list_tasks(db: Session = Depends(get_db)):
    return db.query(models.Task).all()

@router.post("/", response_model=schemas.TaskOut, status_code=201)
def create_task(data: schemas.TaskCreate, db: Session = Depends(get_db)):
    # ตรวจสอบว่า column_id มีอยู่จริงไหม
    if not db.get(ColumnModel, data.column_id):
        raise HTTPException(status_code=404, detail="Column not found")
    # ตรวจสอบว่า created_by (user_id) มีอยู่จริงไหม
    if not db.get(User, data.created_by):
        raise HTTPException(status_code=404, detail="User not found")

    task = models.Task(**data.dict())
    db.add(task)
    db.commit()
    db.refresh(task)
    return task

@router.put("/move", response_model=schemas.TaskOut)
def move_task(data: schemas.TaskMove, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == data.task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if not db.get(ColumnModel, data.to_column_id):
        raise HTTPException(status_code=404, detail="Target column not found")

    task.column_id = data.to_column_id
    task.position = data.new_position
    db.commit()
    db.refresh(task)
    return task