import React, { useEffect, useRef, useState } from "react";
import api from "../api";

interface Notification {
  id: number;
  sender: string;
  board_name: string;
  board_id: number;
  status: "pending" | "accepted" | "rejected";
}

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      api.get("/notifications/me").then((res) => setNotifications(res.data));
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = async (id: number, action: "accept" | "reject") => {
    await api.patch(`/notifications/${id}?action=${action}`);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((prev) => !prev)} className="relative hover:text-blue-500">
        🔔
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border z-50 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-gray-500 text-sm text-center">ไม่มีแจ้งเตือน</div>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="p-3 border-b border-gray-200">
                <div className="text-sm font-semibold">{n.sender} เชิญเข้าร่วมบอร์ด</div>
                <div className="text-xs text-gray-500">{n.board_name}</div>
                <div className="mt-2 flex justify-end gap-2">
                  <button
                    className="px-2 py-1 text-sm bg-green-500 text-white rounded"
                    onClick={() => handleAction(n.id, "accept")}
                  >
                    ตอบรับ
                  </button>
                  <button
                    className="px-2 py-1 text-sm bg-gray-400 text-white rounded"
                    onClick={() => handleAction(n.id, "reject")}
                  >
                    ปฏิเสธ
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
