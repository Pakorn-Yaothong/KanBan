import React from "react";
import { NavLink } from "react-router-dom";
import {
  InboxIcon,
  ViewBoardsIcon,
} from "@heroicons/react/outline";
import "../styles/Sidebar.css";

const routes = [
  { name: "Inbox", to: "/inbox", icon: <InboxIcon className="w-6 h-6" /> },
  { name: "Boards", to: "/boards", icon: <ViewBoardsIcon className="w-6 h-6" /> },
];

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      {routes.map((r) => (
        <NavLink
          key={r.to}
          to={r.to}
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          {r.icon}
          <span className="sidebar-label">{r.name}</span>
        </NavLink>
      ))}
    </div>
  );
}
