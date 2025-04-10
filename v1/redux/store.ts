import { configureStore } from "@reduxjs/toolkit";
import createResumeReducer from "../slices/resumeActions/resumeActionSlice";
import { listenerMiddleware } from "./middleware";

const resumeState =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("resumes") || "null")
    : null;

export const store = configureStore({
  preloadedState: {
    createResume: resumeState === null ? [] : resumeState,
  },
  reducer: {
    createResume: createResumeReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    listenerMiddleware.middleware,
  ],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
