import React, { useEffect, useState } from "react";
import { fetchBoards, Board } from "../api";
import Layout from "../components/Layout";
import BoardView from "../components/BoardView";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Boards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    let cancelled = false;

    fetchBoards()
      .then((data) => {
        if (!cancelled) setBoards(data);
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("โหลดบอร์ดล้มเหลว:", err);
          setError("ไม่สามารถโหลดบอร์ดได้");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();
    navigate("/login");
  };

  if (loading) return <div className="p-8 text-center">⏳ กำลังโหลด...</div>;
  if (error) return <div className="p-8 text-center text-red-500">❌ {error}</div>;

  const board = boards[0];

  return (
    <Layout>
      <header className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
        <h2 className="text-2xl font-semibold tracking-wide">
          {board ? board.name : "Kanban Board"}
        </h2>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 text-sm px-3 py-1 rounded hover:bg-gray-100"
        >
          ออกจากระบบ
        </button>
      </header>

      {board && Array.isArray(board.columns) ? (
        <div className="bg-gray-100 min-h-[calc(100vh-4rem)]">
          <BoardView columns={board.columns} boardId={board.id} />
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">📭 ยังไม่มีบอร์ดในระบบ</div>
      )}
    </Layout>
  );
}
