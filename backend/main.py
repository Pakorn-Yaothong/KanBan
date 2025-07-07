from fastapi import FastAPI
from database import Base, engine

# import models (no relationships needed)
from user.models           import User
from board.models          import Board
from board_member.models   import BoardMember
from column.models         import Column
from task.models           import Task
from tag.models            import Tag
from notification.models   import Notification
from task_assigner.models  import TaskAssigner

# import routers
from auth.router           import router as auth_router
from user.router           import router as user_router
from board.router          import router as board_router
from board_member.router   import router as board_member_router
from column.router         import router as column_router
from task.router           import router as task_router
from tag.router            import router as tag_router
from notification.router   import router as notification_router
from task_assigner.router  import router as task_assigner_router

app = FastAPI(
    title="Kanban API",
    version="0.1.0",
    description="CRUD for users, boards, columns, tasks, tags, notifications, members, assigners"
)

app.include_router(auth_router,           prefix="/auth",           tags=["auth"])
app.include_router(user_router,           prefix="/users",          tags=["users"])
app.include_router(board_router,          prefix="/boards",         tags=["boards"])
app.include_router(board_member_router,   prefix="/board-members",  tags=["board_members"])
app.include_router(column_router,         prefix="/columns",        tags=["columns"])
app.include_router(task_router,           prefix="/tasks",          tags=["tasks"])
app.include_router(tag_router,            prefix="/tags",           tags=["tags"])
app.include_router(notification_router,   prefix="/notifications",  tags=["notifications"])
app.include_router(task_assigner_router,  prefix="/task-assigners", tags=["task_assigners"])

# สร้างตารางทั้งหมดเมื่อสตาร์ท 
Base.metadata.create_all(bind=engine)
