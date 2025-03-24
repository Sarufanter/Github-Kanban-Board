import { useState } from "react";
import { fetchIssues } from "../services/githubApi";
import { Container, Issue } from "../types/types";

interface IssueLoaderProps {
  setContainers: React.Dispatch<React.SetStateAction<Container[]>>;
  setRepo: React.Dispatch<
    React.SetStateAction<{
      owner: { login: string; html_url: string };
      name: string;
      html_url: string;
      stargazers_count: number;
    } | null>
  >;
}

const IssueLoader: React.FC<IssueLoaderProps> = ({ setContainers, setRepo }) => {
  const [repoUrl, setRepoUrl] = useState("");

  const loadIssues = async () => {
    const repoName = repoUrl.replace("https://github.com/", "");
    
    // 🔹 Отримання даних про репозиторій
    const repoResponse = await fetch(`https://api.github.com/repos/${repoName}`);
    const repoData = await repoResponse.json();

    setRepo({
      owner: repoData.owner,
      name: repoData.name,
      html_url: repoData.html_url,
      stargazers_count: repoData.stargazers_count,
    });

    // 🔹 Завантаження issues
    const issues: Issue[] = await fetchIssues(repoUrl);

    const todoIssues = issues.filter(issue => issue.state === "open" && !issue.assignee);
    const inProgressIssues = issues.filter(issue => issue.state === "open" && issue.assignee);
    const doneIssues = issues.filter(issue => issue.state === "closed");

    setContainers([
      { id: "todo", title: "To Do", items: todoIssues },
      { id: "in-progress", title: "In Progress", items: inProgressIssues },
      { id: "done", title: "Done", items: doneIssues },
    ]);
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
          onClick={loadIssues}
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Load
        </button>
      </div>
    </div>
  );
};

export default IssueLoader;
