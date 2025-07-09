import React, { useEffect, useRef, useState } from "react";
import api from "../api";
import "../styles/NotificationDropdown.css";

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
    <div className="notification-container" ref={ref}>
      <button onClick={() => setOpen((prev) => !prev)} className="notification-button">
        🔔
        {notifications.length > 0 && (
          <span className="notification-badge">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="notification-dropdown">
          {notifications.length === 0 ? (
            <div className="notification-empty">ไม่มีแจ้งเตือน</div>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="notification-item">
                <div className="notification-sender">{n.sender} เชิญเข้าร่วมบอร์ด</div>
                <div className="notification-board">{n.board_name}</div>
                <div className="notification-actions">
                  <button
                    className="btn-accept"
                    onClick={() => handleAction(n.id, "accept")}
                  >
                    ตอบรับ
                  </button>
                  <button
                    className="btn-reject"
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
