import { UniqueIdentifier } from "@dnd-kit/core";

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
export interface IssuesState {
  repo: {
    owner: { login: string; html_url: string };
    name: string;
    html_url: string;
    stargazers_count: number;
  } | null;
  containers: Container[];
  loading: boolean;
  error: string | null;
  activeId: UniqueIdentifier | null;
}