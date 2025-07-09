import React, { useState, useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "./Column";
import type { Column as ColumnType } from "../api";
import { moveTask, fetchBoards } from "../api";

interface Props {
  columns: ColumnType[];
  boardId: number; // เพิ่ม prop boardId
}

export default function BoardView({ columns, boardId }: Props) {
  const [columnState, setColumnState] = useState<ColumnType[]>(columns);

  useEffect(() => {
    setColumnState(columns);
  }, [columns]);

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const taskId = parseInt(draggableId);
    const toColumnId = parseInt(destination.droppableId);
    const newPosition = destination.index;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    try {
      await moveTask({
        task_id: taskId,
        to_column_id: toColumnId,
        new_position: newPosition,
      });

      // ดึงข้อมูลบอร์ดใหม่เพื่ออัพเดต UI
      const freshBoards = await fetchBoards();
      if (freshBoards.length > 0) {
        setColumnState(freshBoards[0].columns);
      }
    } catch (error) {
      console.error("ไม่สามารถย้าย Task ได้:", error);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 p-4 overflow-x-auto min-h-[calc(100vh-6rem)]">
        {columnState.map((col) => (
          <Column
            key={col.id}
            column={{ ...col, boardId }} // ส่ง boardId ให้ Column
          />
        ))}
      </div>
    </DragDropContext>
  );
}
