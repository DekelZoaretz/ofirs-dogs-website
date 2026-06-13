import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TabType = 'dogs' | 'cats';

interface UIState {
  activeTab: TabType;
}

const initialState: UIState = {
  activeTab: 'dogs',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<TabType>) {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
