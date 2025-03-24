import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Issue } from "../types/types";

export default function IssueCard({ issue }: { issue: Issue }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: issue.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const createdAt = new Date(issue.created_at);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab touch-none rounded border bg-white p-3 active:cursor-grabbing dark:border-gray-700 dark:bg-gray-700 ${
        isDragging ? "z-10 opacity-50 shadow-md" : ""
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
          {issue.title}
        </a>
        <div>
          #{issue.number || "?"} | {diffInDays} days ago
          <br />
          <a
            href={issue.user.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {issue.user?.login || "No name"}
          </a>{" "}
          | Comments: {issue.comments || 0}
        </div>
      </div>
    </li>
  );
}
