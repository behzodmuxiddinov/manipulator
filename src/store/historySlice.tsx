import { getLocalStorage } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

interface HistoryItem {
  original: string;
  optimized: string;
  datetime: string;
}

const historySlice = createSlice({
  name: "history",
  initialState: getLocalStorage('history', true) || [] as HistoryItem[],
  reducers: {
    addHistory(state, {payload}) {
      state.push(payload);
    },
  },
});

export const { addHistory } = historySlice.actions;
export default historySlice.reducer;
