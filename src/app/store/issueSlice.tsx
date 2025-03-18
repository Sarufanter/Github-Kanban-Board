import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {IssuesState, Issue,} from '@/app/types/types'


const initialState: IssuesState = {
  issues: [],
  todo: [],
  inProgress: [],
  done: [],
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setIssues: (state, action: PayloadAction<Issue[]>) => {
      state.issues = action.payload;
      state.todo = action.payload.filter(
        (issue) => !issue.assignee && issue.state === "open"
      );
      state.inProgress = action.payload.filter(
        (issue) => issue.assignee && issue.state === "open"
      );
      state.done = action.payload.filter((issue) => issue.state === "closed");
    },
  },
});

export const { setIssues } = issuesSlice.actions;
export default issuesSlice.reducer;
