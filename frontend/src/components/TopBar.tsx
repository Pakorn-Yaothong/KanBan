import React from "react";

export default function TopBar() {
  return (
    <div className="bg-white shadow p-4 flex items-center justify-between">
      <h2 className="text-xl font-semibold">My Kanban Board</h2>
      <button className="bg-accent text-white px-4 py-1 rounded">สร้าง</button>
    </div>
  );
}
