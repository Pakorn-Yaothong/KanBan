import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import type { DraggableProvided, DroppableProvided } from "react-beautiful-dnd";
import type { Task } from "../api";
import { createTask } from "../api";
import TaskModal from "./TaskModal";

interface Props {
  column: {
    id: number;
    name: string;
    tasks?: Task[];
    boardId: number; // เพิ่ม field boardId
  };
}

export default function Column({ column }: Props) {
  const [newTitle, setNewTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>(column.tasks ?? []);

  const handleAddTask = async () => {
    if (!newTitle.trim()) return;

    const userId = Number(localStorage.getItem("user_id"));
    if (isNaN(userId)) {
      alert("Session หมดอายุ กรุณาเข้าสู่ระบบใหม่");
      localStorage.clear();
      window.location.href = "/login";
      return;
    }

    try {
      const newTask = await createTask({
        column_id: column.id,
        title: newTitle,
        description: "",
        position: tasks.length,
        created_by: userId,
      });

      setTasks((prev) => [...prev, newTask]);
      setNewTitle("");
      setIsAdding(false);
    } catch (error) {
      console.error("เพิ่มการ์ดล้มเหลว:", error);
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg w-72 p-4 flex-shrink-0 shadow-md">
      <h3 className="font-bold text-gray-700 mb-3">{column.name}</h3>

      <Droppable droppableId={String(column.id)}>
        {(provided: DroppableProvided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[50px]"
          >
            {tasks.map((task, idx) => (
              <Draggable key={task.id} draggableId={String(task.id)} index={idx}>
                {(provided: DraggableProvided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white rounded p-3 mb-2 shadow cursor-pointer"
                    onClick={() => setSelectedTask(task)}
                  >
                    <div className="font-medium text-gray-800">{task.title}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {isAdding ? (
        <div className="mt-2">
          <input
            className="w-full text-sm p-2 border rounded mb-1 focus:outline-none focus:ring"
            placeholder="ชื่อการ์ด..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddTask}
              className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
            >
              เพิ่มการ์ด
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewTitle("");
              }}
              className="text-sm text-gray-600 hover:underline"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="text-sm text-gray-600 hover:underline mt-2"
        >
          + เพิ่มการ์ด
        </button>
      )}

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          boardId={column.boardId} // ส่ง boardId ไปที่ TaskModal
        />
      )}
    </div>
  );
}
