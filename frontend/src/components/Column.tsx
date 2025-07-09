import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import type { DraggableProvided, DroppableProvided } from "react-beautiful-dnd";
import type { Task } from "../api";
import { createTask } from "../api";
import TaskModal from "./TaskModal";
import "../styles/Column.css";

interface Props {
  column: {
    id: number;
    name: string;
    tasks?: Task[];
    boardId: number;
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
    <div className="column-container">
      <h3 className="column-title">{column.name}</h3>

      <Droppable droppableId={String(column.id)}>
        {(provided: DroppableProvided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="task-list"
          >
            {tasks.map((task, idx) => (
              <Draggable key={task.id} draggableId={String(task.id)} index={idx}>
                {(provided: DraggableProvided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="task-card"
                    onClick={() => setSelectedTask(task)}
                  >
                    <div className="task-title">{task.title}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {isAdding ? (
        <div className="add-task-container">
          <input
            className="add-task-input"
            placeholder="ชื่อการ์ด..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            autoFocus
          />
          <div className="add-task-actions">
            <button
              onClick={handleAddTask}
              className="btn-add-task"
            >
              เพิ่มการ์ด
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewTitle("");
              }}
              className="btn-cancel-task"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="btn-show-add"
        >
          + เพิ่มการ์ด
        </button>
      )}

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          boardId={column.boardId}
        />
      )}
    </div>
  );
}
