import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchIssues } from "../../services/githubApi";
import { Issue, Container } from "../../types/types";
import { UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

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
  activeId: UniqueIdentifier | null;
}

const initialState: IssuesState = {
  repo: null,
  containers: [],
  loading: false,
  error: null,
  activeId: null,
};

export const loadIssues = createAsyncThunk(
  "issues/loadIssues",
  async (repoUrl: string, { rejectWithValue }) => {
    try {
      const repoName = repoUrl.replace("https://github.com/", "");

      const repoResponse = await fetch(
        `https://api.github.com/repos/${repoName}`
      );
      const repoData = await repoResponse.json();

      if (repoData.message) {
        return rejectWithValue(`Failed to fetch repo: ${repoData.message}`);
      }
      const issues: Issue[] = await fetchIssues(repoUrl);

      const todoIssues = issues.filter(
        (issue) => issue.state === "open" && !issue.assignee
      );
      const inProgressIssues = issues.filter(
        (issue) => issue.state === "open" && issue.assignee
      );
      const doneIssues = issues.filter((issue) => issue.state === "closed");

      const newState = {
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
      return newState;
    } catch (err) {
      console.error(err);
      return rejectWithValue("Failed to fetch issues");
    }
  }
);

const findContainerId = (
  itemId: UniqueIdentifier,
  containers: Container[]
): UniqueIdentifier | undefined => {
  for (const container of containers) {
    if (container.id === itemId) return container.id;
    if (container.items.some((item) => item.id === itemId)) return container.id;
  }
  return undefined;
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setActiveId: (state, action: PayloadAction<UniqueIdentifier | null>) => {
      state.activeId = action.payload;
    },

    dragOver: (
      state,
      action: PayloadAction<{
        activeId: UniqueIdentifier;
        overId: UniqueIdentifier;
      }>
    ) => {
      const { activeId, overId } = action.payload;

      const activeContainerId = findContainerId(activeId, state.containers);
      const overContainerId = findContainerId(overId, state.containers);
      if (
        !activeContainerId ||
        !overContainerId ||
        activeContainerId === overContainerId
      )
        return;

      const activeContainer = state.containers.find(
        (c) => c.id === activeContainerId
      );
      const overContainer = state.containers.find(
        (c) => c.id === overContainerId
      );

      if (!activeContainer || !overContainer) return;

      const activeIndex = activeContainer.items.findIndex(
        (item) => item.id === activeId
      );
      if (activeIndex === -1) return;

      const [activeItem] = activeContainer.items.splice(activeIndex, 1);

      const overIndex = overContainer.items.findIndex(
        (item) => item.id === overId
      );
      const insertIndex =
        overIndex !== -1 ? overIndex + 1 : overContainer.items.length;

      overContainer.items.splice(insertIndex, 0, activeItem);
    },
    dragEnd: (
      state,
      action: PayloadAction<{
        activeId: UniqueIdentifier;
        overId: UniqueIdentifier;
      }>
    ) => {
      const { activeId, overId } = action.payload;

      const activeContainerId = findContainerId(activeId, state.containers);
      const overContainerId = findContainerId(overId, state.containers);

      if (
        !activeContainerId ||
        !overContainerId ||
        activeContainerId !== overContainerId
      ) {
        state.activeId = null;
        return;
      }

      const container = state.containers.find(
        (c) => c.id === activeContainerId
      );
      if (!container) {
        state.activeId = null;
        return;
      }

      const activeIndex = container.items.findIndex(
        (item) => item.id === activeId
      );
      const overIndex = container.items.findIndex((item) => item.id === overId);
      if (activeIndex === -1 || overIndex === -1) {
        state.activeId = null;
        return;
      }

      container.items = arrayMove(container.items, activeIndex, overIndex);
      state.activeId = null;

      if (state.repo) {
        localStorage.setItem(
          `issues_${state.repo.owner.login}_${state.repo.name}`,
          JSON.stringify(state.containers)
        );
      }
    },
  },
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
          action: PayloadAction<{
            repo: IssuesState["repo"];
            containers: Container[];
          }>
        ) => {
          state.loading = false;
          state.repo = action.payload.repo;

          const repoKey = `issues_${action.payload.repo?.owner.login}_${action.payload.repo?.name}`;
    const storedContainers = localStorage.getItem(repoKey);
    let mergedContainers = action.payload.containers;

    if (storedContainers) {
      const savedContainers: Container[] = JSON.parse(storedContainers);

      // Отримуємо всі існуючі issueId у збережених контейнерах
      const existingIssueIds = new Set(
        savedContainers.flatMap((container) => container.items.map((i) => i.id))
      );

      // Оновлення списку issues: додаємо тільки ті, яких ще немає у будь-якій колонці
      mergedContainers = savedContainers.map((savedContainer) => {
        const freshContainer = action.payload.containers.find(
          (c) => c.id === savedContainer.id
        );

        if (!freshContainer) return savedContainer; // Якщо колонка була видалена, зберігаємо стару

        // Додаємо лише нові issues, які ще не присутні в жодній колонці
        const newIssues = freshContainer.items.filter(
          (issue) => !existingIssueIds.has(issue.id)
        );

        return {
          ...savedContainer,
          items: [...savedContainer.items, ...newIssues], // Додаємо лише унікальні нові issues
        };
      });
    }

    state.containers = mergedContainers;

    // Оновлюємо localStorage після об'єднання
    localStorage.setItem(repoKey, JSON.stringify(mergedContainers));
  }
      )
      .addCase(loadIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { setActiveId, dragOver, dragEnd } = issuesSlice.actions;
export default issuesSlice.reducer;
