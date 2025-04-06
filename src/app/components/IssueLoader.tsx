import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { loadIssues } from "../store/slices/issuesSlice";
import React from "react";

const IssueLoader = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const repo = useSelector((state: RootState) => state.issues.repo);
  const { loading, error } = useSelector((state: RootState) => state.issues); 

  const handleLoadIssues = () => {
    if (repoUrl.trim() === "") return;
    dispatch(loadIssues(repoUrl));
  };


  const handleClearIssues = () => {
    if (repo) {
      localStorage.removeItem(`issues_${repo.owner.login}_${repo.name}`);
    }
    dispatch(loadIssues(repoUrl));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLoadIssues();
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 p-4 bg-white dark:bg-gray-800 shadow-md rounded-xl">
      <input
        type="text"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter GitHub repo URL..."
        className="flex-1 rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-all"
      />
      <button
        onClick={handleLoadIssues}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold shadow-md transition-all hover:bg-blue-700 active:scale-95"
      >
        Load Issues
      </button>
      {repo && !loading && !error && (
        <button
          onClick={handleClearIssues}
          className="rounded-lg bg-red-600 px-6 py-3 text-white font-semibold shadow-md transition-all hover:bg-red-700 active:scale-95"
        >
          Clear Changes
        </button>
      )}
    </div>
  );
};

export default IssueLoader;
