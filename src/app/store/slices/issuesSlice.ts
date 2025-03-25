import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchIssues } from "../../services/githubApi";
import { Issue, Container } from "../../types/types";

interface IssuesState {
  repo: {
    owner: { login: string; html_url: string };
    name: string;
    html_url: string;
    stargazers_count: number;
  } | null;
  containers: Container[];
  loading: boolean;
  error: string | null;
}
interface Repo {
    owner: { login: string; html_url: string };
    name: string;
    html_url: string;
    stargazers_count: number;
  }
// Початковий стан
const initialState: IssuesState = {
  repo: null,
  containers: [],
  loading: false,
  error: null,
};

// Async Thunk для завантаження issues
export const loadIssues = createAsyncThunk(
  "issues/loadIssues",
  async (repoUrl: string, { rejectWithValue }) => {
    try {
      const repoName = repoUrl.replace("https://github.com/", "");

      const repoResponse = await fetch(
        `https://api.github.com/repos/${repoName}`
      );
      const repoData = await repoResponse.json();

      const issues: Issue[] = await fetchIssues(repoUrl);

      const todoIssues = issues.filter(
        (issue) => issue.state === "open" && !issue.assignee
      );
      const inProgressIssues = issues.filter(
        (issue) => issue.state === "open" && issue.assignee
      );
      const doneIssues = issues.filter((issue) => issue.state === "closed");

      return {
        repo: {
          owner: repoData.owner,
          name: repoData.name,
          html_url: repoData.html_url,
          stargazers_count: repoData.stargazers_count,
        },
        containers: [
          { id: "todo", title: "To Do", items: todoIssues },
          { id: "in-progress", title: "In Progress", items: inProgressIssues },
          { id: "done", title: "Done", items: doneIssues },
        ],
      };
    } catch (error) {
      return rejectWithValue("Failed to fetch issues");
    }
  }
);

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadIssues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadIssues.fulfilled,
        (
          state,
          action: PayloadAction<{ repo: Repo; containers: Container[] }>
        ) => {
          state.loading = false;
          state.repo = action.payload.repo; 
          state.containers = action.payload.containers;
        }
      )
      .addCase(loadIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      
  },
});

export default issuesSlice.reducer;
