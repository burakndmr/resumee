import { configureStore } from "@reduxjs/toolkit";
import createResumeReducer from "../slices/createResume/createResumeSlice";

export const store = configureStore({
  reducer: {
    createResume: createResumeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
