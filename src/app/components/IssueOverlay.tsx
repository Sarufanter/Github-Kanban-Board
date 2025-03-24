import { Issue } from "../types/types";

export default function IssueOverlay({ issue }: { issue:Issue | null}) {
  
  if (!issue) return null;

  const createdAt = new Date(issue.created_at);
  const diffInDays = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
  return (
    <div className="cursor-grabbing touch-none rounded border bg-white p-3 shadow-md dark:border-gray-700 dark:bg-gray-700 text-center">
      <div className="flex flex-col items-center gap-3">
        <div>{issue.title}</div>
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
    </div>
  )
}