from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from . import schemas
from .models import TaskAssigner
from task.models import Task
from user.models import User
from database import get_db

router = APIRouter(
    tags=["task_assigners"],
)

@router.get("/", response_model=list[schemas.TaskAssignerOut])
def list_assigners(db: Session = Depends(get_db)):
    return db.query(TaskAssigner).all()

@router.post("/", response_model=schemas.TaskAssignerOut, status_code=201)
def assign_task(data: schemas.TaskAssignerCreate, db: Session = Depends(get_db)):
    if not db.query(Task).filter(Task.id == data.task_id).first():
        raise HTTPException(404, "Task not found")
    if not db.query(User).filter(User.id == data.user_id).first():
        raise HTTPException(404, "User not found")
    ta = TaskAssigner(**data.dict())
    db.add(ta)
    db.commit()
    db.refresh(ta)
    return ta
