import { Issue } from "../types/types";

export default function IssueOverlay({ issue }: { issue: Issue | null }) {
  if (!issue) return null;

  const createdAt = new Date(issue.created_at);
  const diffInDays = Math.floor(
    (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="pointer-events-none cursor-grabbing select-none rounded-xl border border-gray-300 bg-white p-4 text-left shadow-lg transition-all duration-200 dark:border-gray-600 dark:bg-gray-700">
      <div className="flex flex-col gap-3">
        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {issue.title}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          #{issue.number || "?"} | {diffInDays} days ago
        </div>
        <div className="flex items-center justify-between gap-2 text-sm text-gray-500 dark:text-gray-400">
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
    </div>
  );
}
