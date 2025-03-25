interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface Issue {
  id: number | string;
  number: number;
  title: string;
  state: string;
  created_at: string;
  html_url: string;
  assignee: GitHubUser | null;
  comments: number;
  user: GitHubUser;
}

export interface Container {
  id: string;
  title: string;
  items: Issue[];
}
export interface Repo {
  owner: { login: string; html_url: string };
  name: string;
  html_url: string;
  stargazers_count: number;
}
