// src/components/BoardView.tsx

import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import type { DropResult, DroppableProvided } from "react-beautiful-dnd";
import Column from "./Column";
import type { Column as ColumnType } from "../api";

interface Props {
  columns: ColumnType[];
}

export default function BoardView({ columns }: Props) {
  const onDragEnd = (result: DropResult) => {
    console.log("moved", result);
    // TODO: เรียก API อัพเดตตำแหน่ง
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 overflow-x-auto py-4">
        {columns.map((col) => (
          <Droppable droppableId={String(col.id)} key={col.id}>
            {(provided: DroppableProvided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-card rounded p-3 w-64 flex-shrink-0"
              >
                <h3 className="font-bold mb-3">{col.name}</h3>
                <Column column={col} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
