import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommandsState {
  currentCommands: string;
  optimizedCommands: string;
  runAnimation: boolean;
}

const initialState: CommandsState = {
  currentCommands: "",
  optimizedCommands: "",
  runAnimation: false,
};

const commandsSlice = createSlice({
  name: "commands",
  initialState,
  reducers: {
    setCommands(state, action: PayloadAction<{ original: string; optimized: string }>) {
      state.currentCommands = action.payload.original;
      state.optimizedCommands = action.payload.optimized;
      state.runAnimation = true;
    },
    stopAnimation(state) {
      state.runAnimation = false;
    },
  },
});

export const { setCommands, stopAnimation } = commandsSlice.actions;
export default commandsSlice.reducer;
