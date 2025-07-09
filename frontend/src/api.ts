import axios from "axios";

// 🔧 สร้าง axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor ใส่ token อัตโนมัติ
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("📡 Requesting:", `${config.baseURL ?? ""}${config.url ?? ""}`);
  return config;
});

// ✅ Interceptor ดักจับ error ทั่วไป
api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", err.response?.data || err.message);
    return Promise.reject(err);
  }
);

//
// =================== 🔐 AUTH ===================
//

export interface LoginRes {
  access_token: string;
  token_type: string;
  user_id: number;
}

export function login(email: string, password: string): Promise<LoginRes> {
  return api
    .post<LoginRes>("/auth/login", { email, password })
    .then((res) => res.data);
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export function register(data: RegisterPayload): Promise<any> {
  return api.post("/auth/", data).then((res) => res.data);
}

//
// =================== 📋 BOARDS ===================
//

export interface Task {
  id: number;
  title: string;
  description?: string;
  created_at?: string;
  assignee_id?: number; // เพิ่มบรรทัดนี้
}

export interface Column {
  id: number;
  name: string;
  tasks: Task[];
}

export interface Board {
  id: number;
  name: string;
  columns: Column[];
}

export function fetchBoards(): Promise<Board[]> {
  return api.get<Board[]>("/boards/").then((res) => res.data);
}

//
// ✅ MOVE TASK (Drag & Drop)
export function moveTask(data: {
  task_id: number;
  to_column_id: number;
  new_position: number;
}): Promise<any> {
  return api.put("/tasks/move", data).then((res) => res.data);
}

export function createTask(data: {
  column_id: number;
  title: string;
  description?: string;
  position?: number;
  created_by: number;
}): Promise<any> {
  return api.post("/tasks/", data).then((res) => res.data);
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export function fetchBoardMembers(boardId: number): Promise<User[]> {
  return api.get<User[]>(`/board-members?board_id=${boardId}`).then(res => res.data);
}

export function assignUserToTask(data: {
  task_id: number;
  user_id: number;
}): Promise<any> {
  return api.post("/task-assigners/", data).then(res => res.data);
}

export default api;
