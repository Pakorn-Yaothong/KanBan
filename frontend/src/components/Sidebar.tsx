import React from "react";
import { NavLink } from "react-router-dom";
import {
  InboxIcon,
  ViewBoardsIcon,
} from "@heroicons/react/outline";

const routes = [
  { name: "Inbox", to: "/inbox", icon: <InboxIcon className="w-6 h-6" /> },
  { name: "Boards", to: "/boards", icon: <ViewBoardsIcon className="w-6 h-6" /> },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-sidebar text-white flex flex-col p-4 space-y-4">
      {routes.map((r) => (
        <NavLink
          key={r.to}
          to={r.to}
          className={({ isActive }) =>
            `flex items-center p-2 rounded ${
              isActive ? "bg-accent" : "hover:bg-gray-700"
            }`
          }
        >
          {r.icon}
          <span className="ml-3">{r.name}</span>
        </NavLink>
      ))}
    </div>
  );
}
