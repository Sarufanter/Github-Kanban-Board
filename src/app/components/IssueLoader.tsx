"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchIssues } from "../services/githubApi";
import { setIssues } from "../store/issueSlice";

const IssueLoader = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const dispatch = useDispatch();

  const loadIssues = async () => {
    const issues = await fetchIssues(repoUrl);
    dispatch(setIssues(issues)); // Оновлюємо Redux
  };

  return (
    <div>
      <input
        type="text"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        placeholder="Enter GitHub repo URL"
      />
      <button onClick={loadIssues}>Load Issues</button>
    </div>
  );
};

export default IssueLoader;
