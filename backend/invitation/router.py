from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from . import schemas
from .models import Invitation
from user.models import User
from database import get_db
from auth.dependencies import get_current_user

router = APIRouter()

@router.get("/me", response_model=list[schemas.InvitationOut])
def get_my_invitations(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Invitation).filter(
        Invitation.user_id == current_user.id,
        Invitation.status == "pending"
    ).all()

@router.post("/", response_model=schemas.InvitationOut)
def send_invitation(data: schemas.InvitationCreate, db: Session = Depends(get_db)):
    existing = db.query(Invitation).filter_by(
        user_id=data.user_id, board_id=data.board_id, status="pending"
    ).first()
    if existing:
        raise HTTPException(400, detail="Invitation already sent")

    inv = Invitation(**data.dict())
    db.add(inv)
    db.commit()
    db.refresh(inv)
    return inv

@router.patch("/{invitation_id}")
def respond_invitation(invitation_id: int, action: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    inv = db.query(Invitation).filter_by(id=invitation_id, user_id=current_user.id).first()
    if not inv:
        raise HTTPException(404, "Invitation not found")
    if action not in ["accept", "reject"]:
        raise HTTPException(400, "Invalid action")

    inv.status = "accepted" if action == "accept" else "rejected"
    inv.responded_at = datetime.utcnow()
    db.commit()
    return {"success": True}
