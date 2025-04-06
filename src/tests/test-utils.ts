import { Issue } from "@/app/types/types";

export const createMockIssue = (id: number, login: string): Issue => ({
    id,
    number: id,
    title: `Issue ${id}`,
    state: "open",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    html_url: `https://github.com/test/repo/issues/${id}`,
    assignee: null,
    comments: 3,
    user: {
      login,
      avatar_url: "",
      html_url: `https://github.com/${login}`,
    },
  });
