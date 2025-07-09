// ✅ frontend\src\pages\Login.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { access_token, user_id } = await login(email, password);
      setToken(access_token); // ✅ token ใส่ context
      localStorage.setItem("user_id", String(user_id)); // ✅ เพิ่ม user_id ลง localStorage
      navigate("/boards");
    } catch (err: any) {
      setError(err.response?.data?.detail || "ไม่สามารถเข้าสู่ระบบได้");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          เข้าสู่ระบบ
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-sm mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            อีเมล
          </label>
          <input
            type="email"
            className="mb-4 w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-700 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            รหัสผ่าน
          </label>
          <input
            type="password"
            className="mb-6 w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-700 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-300">
          ยังไม่มีบัญชี?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            สมัครสมาชิก
          </Link>
        </p>
      </div>
    </div>
  );
}