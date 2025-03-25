import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { loadIssues } from "../store/slices/issuesSlice";

const IssueLoader = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleLoadIssues = () => {
    dispatch(loadIssues(repoUrl));
  };

  return (
    <div className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="Enter GitHub repo URL"
          className="flex-1 rounded-md border p-2"
        />
        <button
          onClick={handleLoadIssues}
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Load
        </button>
      </div>
    </div>
  );
};

export default IssueLoader;
