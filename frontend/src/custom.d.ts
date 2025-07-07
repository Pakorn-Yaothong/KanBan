// src/custom.d.ts

declare module "react-beautiful-dnd" {
  import React from "react";

  export interface DropResult {
    draggableId: string;
    type: string;
    source: { droppableId: string; index: number };
    destination?: { droppableId: string; index: number } | null;
    reason?: "DROP" | "CANCEL";
  }

  export interface DroppableProvided {
    innerRef(el: HTMLElement | null): void;
    droppableProps: Record<string, any>;
    placeholder: React.ReactNode;
  }

  export interface DraggableProvided {
    innerRef(el: HTMLElement | null): void;
    draggableProps: Record<string, any>;
    dragHandleProps: Record<string, any>;
  }

  // เปลี่ยนจาก ComponentType ให้เป็น FC ที่มี children ด้วย
  export const DragDropContext: React.FC<{
    onDragEnd: (result: DropResult) => void;
    children?: React.ReactNode;
  }>;

  export const Droppable: React.FC<{
    droppableId: string;
    children: (provided: DroppableProvided) => React.ReactNode;
  }>;

  export const Draggable: React.FC<{
    draggableId: string;
    index: number;
    children: (provided: DraggableProvided) => React.ReactNode;
  }>;
}

// react-dom/client ก็เหมือนเดิม
declare module "react-dom/client" {
  import { ReactElement } from "react";
  export function createRoot(container: Element | DocumentFragment): {
    render(children: ReactElement): void;
    unmount(): void;
  };
}
