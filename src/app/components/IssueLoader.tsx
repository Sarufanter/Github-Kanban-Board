import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { loadIssues } from "../store/slices/issuesSlice";
import React from "react";

const IssueLoader = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleLoadIssues = () => {
    if (repoUrl.trim() === "") return;
    dispatch(loadIssues(repoUrl));
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-xl">
      <input
        type="text"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        placeholder="Enter GitHub repo URL..."
        className="flex-1 rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-all"
      />
      <button
        onClick={handleLoadIssues}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold shadow-md transition-all hover:bg-blue-700 active:scale-95"
      >
        Load Issues
      </button>
    </div>
  );
};

export default IssueLoader;
