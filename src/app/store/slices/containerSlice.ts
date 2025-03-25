import { Container } from "@/app/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Container = {
  id: "",
  title: "",
  items: [] ,
};

const repoSlice = createSlice({
  name: "container",
  initialState,
  reducers: {
    setContainer: (state, action: PayloadAction<Container>) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.items[] = action.payload.items[]
    },
  },
});

export const { setContainer } = repoSlice.actions;
export default repoSlice.reducer;
