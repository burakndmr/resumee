import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { Resume } from "../../lib/types";

const initialState: Resume[] = [];

const resumeActionSlice = createSlice({
  name: "createResume",
  initialState,
  reducers: {
    addResume: {
      reducer: (state, action: PayloadAction<Resume>) => {
        state.push(action.payload);
      },
      prepare: (resume: Resume) => {
        return {
          payload: {
            ...resume,
            id: nanoid(),
          },
        };
      },
    },
    updateResume: (state, action: PayloadAction<Resume>) => {
      const { id } = action.payload;

      const selectedResume = state.find((resume) => resume.id === id);
      if (selectedResume) {
        return state.map((resume) => {
          if (resume.id === id) {
            return {
              ...resume,
              ...action.payload,
            };
          } else {
            return resume;
          }
        });
      }
    },
    deleteResume: (state, action: PayloadAction<string>) => {
      return state.filter((resume) => resume.id !== action.payload);
    },
  },
});

export const selectAllResumes = (state: any) => state.createResume;

export const { addResume, deleteResume, updateResume } =
  resumeActionSlice.actions;

export default resumeActionSlice.reducer;
