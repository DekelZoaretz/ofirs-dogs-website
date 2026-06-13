import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { dogsReducer } from './features/dogs/dogs.slice';
import { catsReducer } from './features/cats/cats.slice';
import { uiReducer } from './features/ui/ui.slice';

export const store = configureStore({
  reducer: {
    dogs: dogsReducer,
    cats: catsReducer,
    ui: uiReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
