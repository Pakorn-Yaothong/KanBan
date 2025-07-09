import React from "react";
import NotificationDropdown from "./NotificationDropdown";

export default function TopBar() {
  const handleAdd = () => {
    // TODO: แสดง modal สำหรับเพิ่ม task หรือ column
    console.log("เปิด modal สำหรับ Add");
  };

  const handleInvite = () => {
    // TODO: แสดง modal สำหรับเชิญสมาชิกเข้าบอร์ด
    console.log("เปิด modal สำหรับ Invite");
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow px-6 py-3 flex items-center justify-between">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">
        My Kanban Board
      </h2>

      <div className="flex items-center gap-3">
        {/* 🔔 แจ้งเตือน dropdown */}
        <NotificationDropdown />

        {/* ✉️ เชิญเพื่อน */}
        <button
          onClick={handleInvite}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded shadow text-sm"
        >
          Invite
        </button>

        {/* ➕ เพิ่ม task หรือ column */}
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded shadow text-sm"
        >
          Add
        </button>
      </div>
    </div>
  );
}
