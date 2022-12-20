import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import {
  addResume,
  deleteResume,
  updateResume,
} from "../slices/resumeActions/resumeActionSlice";
import type { RootState } from "./store";
import { Resume } from "../lib/types";

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(addResume, deleteResume, updateResume),
  effect: (action, listenerApi: any) => {
    localStorage.setItem(
      "resumes",
      JSON.stringify(listenerApi.getState().createResume)
    );
  },
});
