import React, { useEffect, useState } from "react";
import type { Task } from "../api";
import { assignUserToTask, fetchBoardMembers } from "../api";
import "../styles/TaskModal.css";

interface User {
  id: number;
  username: string;
  email: string;
}

interface Props {
  task: Task;
  onClose: () => void;
  boardId: number;
}

export default function TaskModal({ task, onClose, boardId }: Props) {
  const [members, setMembers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBoardMembers(boardId).then(setMembers);
    setSelectedUser((task as any).assignee_id ?? null);
  }, [boardId, (task as any).assignee_id]);

  const handleAssign = async () => {
    if (selectedUser === null) return;
    setLoading(true);
    try {
      await assignUserToTask({ task_id: task.id, user_id: selectedUser });
      alert("อัปเดตผู้รับผิดชอบเรียบร้อยแล้ว");
      onClose();
    } catch (error) {
      console.error("อัปเดตผู้รับผิดชอบล้มเหลว:", error);
      alert("เกิดข้อผิดพลาดในการอัปเดต");
    }
    setLoading(false);
  };

  return (
    <div className="task-modal-overlay">
      <div className="task-modal">
        <button
          onClick={onClose}
          className="task-modal-close"
        >
          ×
        </button>

        <h2 className="task-modal-title">
          📝 {task.title}
        </h2>

        <div className="task-modal-section">
          <label className="task-modal-label">รายละเอียด</label>
          <div className="task-modal-description">
            {task.description || "ยังไม่มีรายละเอียด"}
          </div>
        </div>

        <div className="task-modal-section">
          <label className="task-modal-label">ผู้รับผิดชอบ</label>
          <select
            className="task-modal-select"
            value={selectedUser ?? ""}
            onChange={(e) => setSelectedUser(Number(e.target.value))}
          >
            <option value="">-- เลือกผู้รับผิดชอบ --</option>
            {members.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div className="task-modal-actions">
          <button
            onClick={handleAssign}
            disabled={loading || selectedUser === null}
            className={`task-modal-save ${loading || selectedUser === null ? "disabled" : ""}`}
          >
            {loading ? "กำลังบันทึก..." : "บันทึก"}
          </button>
          <button
            onClick={onClose}
            className="task-modal-cancel"
          >
            ยกเลิก
          </button>
        </div>

        <div className="task-modal-footer">
          สร้างเมื่อ: {task.created_at ? new Date(task.created_at).toLocaleString("th-TH") : "ไม่ทราบเวลา"}
        </div>
      </div>
    </div>
  );
}
