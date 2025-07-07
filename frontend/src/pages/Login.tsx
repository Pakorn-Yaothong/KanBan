import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { access_token } = await login(email, password);
      localStorage.setItem("token", access_token);
      navigate("/boards");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">เข้าสู่ระบบ</h1>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <label className="block mb-2">Email</label>
        <input
          type="email"
          className="border rounded px-3 py-2 w-full mb-4 focus:outline-none focus:ring"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="block mb-2">Password</label>
        <input
          type="password"
          className="border rounded px-3 py-2 w-full mb-6 focus:outline-none focus:ring"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-accent text-white py-2 rounded hover:bg-blue-700 transition">
          Login
        </button>
      </form>
    </div>
  );
}
