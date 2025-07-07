import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Boards from "./pages/Boards";

function App() {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/boards" replace /> : <Login />}
        />
        <Route
          path="/boards"
          element={token ? <Boards /> : <Navigate to="/login" replace />}
        />
        <Route
          path="*"
          element={<Navigate to={token ? "/boards" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
