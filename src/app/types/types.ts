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
