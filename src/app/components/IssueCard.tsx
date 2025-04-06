import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Issue } from "../types/types";
import React from "react";

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
      className={`relative cursor-grab select-none rounded-2xl border border-gray-300 bg-white p-4 shadow-sm transition-all duration-200 active:cursor-grabbing dark:border-gray-600 dark:bg-gray-700 ${
        isDragging ? "scale-105 shadow-md opacity-50" : "hover:shadow-lg"
      }`}
    >
      <div className="flex flex-col gap-3">
        <a
          href={issue.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-gray-900 transition hover:underline dark:text-gray-100"
        >
          {issue.title}
        </a>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          #{issue.number || "?"} | {diffInDays} days ago
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <a
            href={issue.user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {issue.user?.login || "No name"}
          </a>
          <span>💬 {issue.comments || 0}</span>
        </div>
      </div>
    </li>
  );
}
