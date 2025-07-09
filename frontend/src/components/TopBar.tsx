import React from "react";
import NotificationDropdown from "./NotificationDropdown";
import "../styles/TopBar.css";

export default function TopBar() {
  const handleAdd = () => {
    console.log("เปิด modal สำหรับ Add");
  };

  const handleInvite = () => {
    console.log("เปิด modal สำหรับ Invite");
  };

  return (
    <div className="topbar-container">
      <h2 className="topbar-title">My Kanban Board</h2>

      <div className="topbar-actions">
        <NotificationDropdown />

        <button
          onClick={handleInvite}
          className="topbar-button invite"
        >
          Invite
        </button>

        <button
          onClick={handleAdd}
          className="topbar-button add"
        >
          Add
        </button>
      </div>
    </div>
  );
}
