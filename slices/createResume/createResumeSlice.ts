import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { Resume } from "../../lib/types";

const initialState: Resume[] = [];

const createResumeSlice = createSlice({
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
      const existingResume = state.find((resume) => resume.id === id);

      if (existingResume) {
        console.log("RESUME", state[Number(id)]);
        console.log(
          "RESUMEEE",
          state.find((resume) => resume.id === id)
        );
      }
    },
    deleteResume: (state, action: PayloadAction<string>) => {
      return state.filter((resume) => resume.id !== action.payload);
    },
  },
});

export const selectAllResumes = (state: any) => state.createResume;

export const { addResume, deleteResume, updateResume } =
  createResumeSlice.actions;

export default createResumeSlice.reducer;
