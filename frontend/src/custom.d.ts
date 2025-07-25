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

// แยก declare react-dom/client แยกไฟล์ได้
declare module "react-dom/client" {
  import { ReactElement } from "react";
  export function createRoot(container: Element | DocumentFragment): {
    render(children: ReactElement): void;
    unmount(): void;
  };
}
