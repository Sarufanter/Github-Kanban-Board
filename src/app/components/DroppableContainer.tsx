import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import IssueCard from "./IssueCard";
import { useDroppable } from "@dnd-kit/core";
import { Issue } from "../types/types";

export default function DroppableContainer({ id, title, items }: { id: string | number; title: string; items: Issue[] }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      key={id}
      className={`flex h-full min-h-40 flex-col rounded-md border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50 ${
        isOver ? "ring-2 ring-blue-500" : ""
      }`}
    >
      <h3 className="mb-2 font-medium text-gray-700 dark:text-gray-200">{title}</h3>
      <div className="flex-1">
        <SortableContext items={items.map((issue) => issue.id)} strategy={verticalListSortingStrategy}>
          <ul className="flex flex-col gap-2">
            {items.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </ul>
        </SortableContext>
        {items.length === 0 && (
          <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800/30">
            <p className="text-sm text-gray-500 dark:text-gray-400">Drop items here</p>
          </div>
        )}
      </div>
    </div>
  );
}
