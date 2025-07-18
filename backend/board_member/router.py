from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional

from . import schemas
from .models import BoardMember
from board.models import Board
from user.models import User
from database import get_db

router = APIRouter(
    tags=["board_members"],
)

@router.get("/", response_model=list[schemas.BoardMemberOut])
def list_board_members(board_id: Optional[int] = Query(None), db: Session = Depends(get_db)):
    query = db.query(BoardMember)
    if board_id is not None:
        query = query.filter(BoardMember.board_id == board_id)
    return query.all()

@router.post("/", response_model=schemas.BoardMemberOut, status_code=201)
def add_board_member(data: schemas.BoardMemberCreate, db: Session = Depends(get_db)):
    if not db.query(Board).filter(Board.id == data.board_id).first():
        raise HTTPException(404, "Board not found")
    if not db.query(User).filter(User.id == data.user_id).first():
        raise HTTPException(404, "User not found")
    bm = BoardMember(**data.dict())
    db.add(bm)
    db.commit()
    db.refresh(bm)
    return bm
