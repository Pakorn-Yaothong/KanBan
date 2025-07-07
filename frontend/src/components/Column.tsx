// src/components/Column.tsx

import React from "react";
import { Draggable } from "react-beautiful-dnd";
import type { DraggableProvided } from "react-beautiful-dnd";
import type { Task } from "../api";

interface Props {
  column: { id: number; name: string; tasks: Task[] };
}

export default function Column({ column }: Props) {
  return (
    <>
      {column.tasks.map((task, idx) => (
        <Draggable
          key={task.id}
          draggableId={String(task.id)}
          index={idx}
        >
          {(provided: DraggableProvided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="bg-white rounded p-2 mb-2 shadow"
            >
              {task.title}
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
}
