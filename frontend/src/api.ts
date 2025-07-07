import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ใส่ token อัตโนมัติถ้ามี
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export interface LoginRes {
  access_token: string;
  token_type: string;
}
export function login(email: string, password: string) {
  return api
    .post<LoginRes>("/auth/login", { email, password })
    .then((res) => res.data);
}

// Boards
export interface Board {
  id: number;
  name: string;
  columns: Column[];
}
export interface Column {
  id: number;
  name: string;
  tasks: Task[];
}
export interface Task {
  id: number;
  title: string;
}
export function fetchBoards() {
  return api.get<Board[]>("/boards/").then((res) => res.data);
}
