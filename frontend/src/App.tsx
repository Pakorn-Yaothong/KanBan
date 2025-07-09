import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import BoardsPage from "./pages/Boards";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

function AppRoutes() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={!token ? <LoginPage /> : <Navigate to="/boards" replace />}
      />
      <Route
        path="/register"
        element={!token ? <RegisterPage /> : <Navigate to="/boards" replace />}
      />
      <Route
        path="/boards"
        element={token ? <BoardsPage /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<Navigate to={token ? "/boards" : "/login"} replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
