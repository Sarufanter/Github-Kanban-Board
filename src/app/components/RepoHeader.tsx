"use client";

import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import React from "react";

const RepoHeader = () => {
  const repo = useSelector((state: RootState) => state.issues.repo);

  if (!repo || !repo.owner) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 bg-white shadow-md p-4 rounded-lg dark:bg-gray-800">
      <a
        href={repo.owner?.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 text-lg font-medium hover:underline"
      >
        {repo.owner?.login}
      </a>
      <span className="text-gray-500 dark:text-gray-400">&gt;</span>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 text-lg font-medium hover:underline"
      >
        {repo.name}
      </a>
      <span className="ml-auto text-gray-700 dark:text-gray-300 text-sm md:text-base">
        ⭐ {repo.stargazers_count?.toLocaleString() || "?"} stars
      </span>
    </div>
  );
};

export default RepoHeader;
