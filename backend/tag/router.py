from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from . import schemas
from .models import Tag
from task.models import Task
from database import get_db

router = APIRouter(
    tags=["tags"],
)

@router.get("/", response_model=list[schemas.TagOut])
def list_tags(db: Session = Depends(get_db)):
    return db.query(Tag).all()

@router.post("/", response_model=schemas.TagOut, status_code=201)
def create_tag(data: schemas.TagCreate, db: Session = Depends(get_db)):
    if not db.query(Task).filter(Task.id == data.task_id).first():
        raise HTTPException(404, "Task not found")
    tag = Tag(**data.dict())
    db.add(tag)
    db.commit()
    db.refresh(tag)
    return tag
