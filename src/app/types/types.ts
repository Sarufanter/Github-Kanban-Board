export interface GitHubUser {
    login: string;
    avatar_url: string;
    html_url: string;
  }
  
  export interface Issue {
    id: number;
    number: number;
    title: string;
    state: string;
    created_at: string;
    html_url: string;
    assignee: GitHubUser | null;
    comments: number;
    user: GitHubUser;
  }
  
  export interface IssuesState {
    issues: Issue[];
    todo: Issue[];
    inProgress: Issue[];
    done: Issue[];
  }
  export type Isdsada = {
    issues: Issue[];
    todo: Issue[];
    inProgress: Issue[];
    done: Issue[];
  }