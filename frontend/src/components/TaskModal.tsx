import React, { useEffect, useState } from "react";
import type { Task } from "../api";
import { assignUserToTask, fetchBoardMembers } from "../api";

interface User {
  id: number;
  username: string;
  email: string;
}

interface Props {
  task: Task;
  onClose: () => void;
  boardId: number; // รับ boardId เพื่อดึงสมาชิก
}

export default function TaskModal({ task, onClose, boardId }: Props) {
  const [members, setMembers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBoardMembers(boardId).then(setMembers);
    setSelectedUser((task as any).assignee_id ?? null); // แก้ TS error ชั่วคราว
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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-3 text-gray-800">
          📝 {task.title}
        </h2>

        <div className="mb-4">
          <label className="text-sm text-gray-600 block mb-1">รายละเอียด</label>
          <div className="bg-gray-100 p-3 rounded text-gray-700 text-sm min-h-[60px]">
            {task.description || "ยังไม่มีรายละเอียด"}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-600 block mb-1">ผู้รับผิดชอบ</label>
          <select
            className="w-full border rounded p-2"
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

        <div className="flex justify-end gap-2">
          <button
            onClick={handleAssign}
            disabled={loading || selectedUser === null}
            className={`px-4 py-2 rounded text-white ${
              loading || selectedUser === null
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "กำลังบันทึก..." : "บันทึก"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            ยกเลิก
          </button>
        </div>

        <div className="text-xs text-gray-500 mt-4">
          สร้างเมื่อ: {task.created_at ? new Date(task.created_at).toLocaleString("th-TH") : "ไม่ทราบเวลา"}
        </div>
      </div>
    </div>
  );
}
