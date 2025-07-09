import React from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import "../styles/Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="layout-main">
        <TopBar />
        <div className="layout-content">{children}</div>
      </div>
    </div>
  );
}
