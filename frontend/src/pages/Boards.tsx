import React, { useEffect, useState } from "react";
import { fetchBoards, Board } from "../api";
import Layout from "../components/Layout";
import BoardView from "../components/BoardView";

export default function Boards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoards()
      .then((data) => setBoards(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  // เอาแค่บอร์ดแรกมาแสดง
  const board = boards[0];

  return (
    <Layout>
      <BoardView columns={board.columns} />
    </Layout>
  );
}
