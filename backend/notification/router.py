from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from . import schemas
from .models import Notification
from user.models import User
from database import get_db
from auth.dependencies import get_current_user

# 👇 เพิ่มสำหรับ invitation
from invitation.models import Invitation
from invitation.schemas import InvitationOut

router = APIRouter(
    tags=["notifications"],
)

# ✅ Noti สำหรับผู้ใช้ปัจจุบัน
@router.get("/me", response_model=list[schemas.NotificationOut])
def get_my_notifications(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return (
        db.query(Notification)
        .filter(Notification.user_id == current_user.id)
        .order_by(Notification.created_at.desc())
        .all()
    )

# ✅ สร้าง noti ธรรมดา
@router.post("/", response_model=schemas.NotificationOut, status_code=201)
def create_notification(
    data: schemas.NotificationCreate,
    db: Session = Depends(get_db)
):
    if not db.query(User).filter(User.id == data.user_id).first():
        raise HTTPException(404, "User not found")
    n = Notification(**data.dict())
    db.add(n)
    db.commit()
    db.refresh(n)
    return n

# ✅ ดึงคำเชิญที่ยัง pending สำหรับ user ปัจจุบัน
@router.get("/invitations/me", response_model=list[InvitationOut])
def get_my_invitations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(Invitation).filter(
        Invitation.user_id == current_user.id,
        Invitation.status == "pending"
    ).all()

# ✅ ตอบรับ / ปฏิเสธคำเชิญ
@router.patch("/invitations/{invitation_id}")
def respond_invitation(
    invitation_id: int,
    action: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    inv = db.query(Invitation).filter(
        Invitation.id == invitation_id,
        Invitation.user_id == current_user.id
    ).first()
    if not inv:
        raise HTTPException(404, "Invitation not found")
    if action not in ["accept", "reject"]:
        raise HTTPException(400, "Invalid action")

    inv.status = "accepted" if action == "accept" else "rejected"
    db.commit()
    return {"success": True}
