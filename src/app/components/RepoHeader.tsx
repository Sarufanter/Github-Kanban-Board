"use client";

import { RootState } from "../store/store";
import { useSelector } from "react-redux";


const RepoHeader = () => {
  const repo = useSelector((state: RootState) => state.issues.repo);

  if (!repo || !repo.owner) return null;

  return (
    <div className="repo-header bg-gray-100 p-4 rounded-md flex items-center gap-2 dark:bg-gray-800">
      <a
        href={repo.owner?.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 font-semibold"
      >
        {repo.owner?.login}
      </a>
      <span>&gt;</span>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 font-semibold"
      >
        {repo.name}
      </a>
      <span className="ml-auto text-gray-600 dark:text-gray-300">
        ⭐ {repo.stargazers_count?.toLocaleString() || "?"} stars
      </span>
    </div>
  );
};

export default RepoHeader;
