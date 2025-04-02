import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import IssueCard from "./IssueCard";
import { useDroppable } from "@dnd-kit/core";
import { Issue } from "../types/types";
import React from "react";
export default function DroppableContainer({ id, title, items }: { id: string | number; title: string; items: Issue[] }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      key={id}
      className={`flex flex-col rounded-lg border border-gray-300 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 shadow-sm transition-all ease-in-out
        h-full overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-rose-900 dark:scrollbar-track-gray-800
        ${isOver ? "ring-2 ring-blue-500" : ""}
      `}
    >
      <h3 className="mb-3 text-xl font-semibold tracking-wide text-center text-gray-800 dark:text-gray-200">
        {title}
      </h3>
      <div className="flex-1">
        <SortableContext items={items.map((issue) => issue.id)} strategy={verticalListSortingStrategy}>
          <ul className="flex flex-col gap-3 text-left">
            {items.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </ul>
        </SortableContext>
        {items.length === 0 && (
          <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-gray-400 bg-gray-100/50 dark:border-gray-600 dark:bg-gray-800/50">
            <p className="text-sm text-gray-500 dark:text-gray-400">Drop items here</p>
          </div>
        )}
      </div>
    </div>
  );
}
