// src/pages/Register.tsx

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register, RegisterPayload } from "../api";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterPayload>({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await register(form);
      setSuccess("✅ ลงทะเบียนสำเร็จ กำลังนำไปยังหน้าเข้าสู่ระบบ...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      const detail = err?.response?.data?.detail || "เกิดข้อผิดพลาดบางอย่าง";
      setError(`❌ ${detail}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">สมัครสมาชิก</h2>

        <input
          name="username"
          placeholder="ชื่อผู้ใช้"
          value={form.username}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full mb-4"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="อีเมล"
          value={form.email}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full mb-4"
          required
        />
        <input
          name="first_name"
          placeholder="ชื่อจริง"
          value={form.first_name}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full mb-4"
        />
        <input
          name="last_name"
          placeholder="นามสกุล"
          value={form.last_name}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full mb-4"
        />
        <input
          name="password"
          type="password"
          placeholder="รหัสผ่าน"
          value={form.password}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full mb-6"
          required
        />

        <button type="submit" className="w-full bg-accent text-white py-2 rounded hover:bg-blue-700 transition">
          สมัครสมาชิก
        </button>

        {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-4">{success}</p>}

        <p className="text-center text-sm mt-6">
          มีบัญชีอยู่แล้ว? <Link to="/login" className="text-blue-500 underline">เข้าสู่ระบบ</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
