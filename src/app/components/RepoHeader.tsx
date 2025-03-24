"use client";

interface Repo {
  owner: {
    login: string;
    html_url: string;
  };
  name: string;
  html_url: string;
  stargazers_count: number;
}

interface RepoHeaderProps {
  repo: Repo | null;
}

const RepoHeader: React.FC<RepoHeaderProps> = ({ repo }) => {
  if (!repo) return null; 

  return (
    <div className="repo-header bg-gray-100 p-4 rounded-md flex items-center gap-2 dark:bg-gray-800">
      <a
        href={repo.owner.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 font-semibold"
      >
        {repo.owner.login}
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
