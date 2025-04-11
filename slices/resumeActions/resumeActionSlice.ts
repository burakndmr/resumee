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
            createInfo: {
              ...resume.createInfo,
              date: new Date().toISOString(),
              isUpdated: false,
            },
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
              createInfo: {
                ...resume.createInfo,
                isUpdated: true,
                date: new Date().toISOString(),
              },
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
