import {
  createSlice,
  PayloadAction,
  nanoid,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { Resume } from "../../lib/types";

import { auth, db } from "../../utils/firebase";
import { doc, setDoc, collection } from "firebase/firestore";

const initialState: Resume[] = [];

// const addResumeThunk = createAsyncThunk() => async (dispatch: any) => {
//   const collectionRef = collection(db, "resumes");
//   const docRef = await addDoc(collectionRef, {
//     ...resume,
//     id: nanoid(),
//     createInfo: {
//       ...resume.createInfo,
//       date: new Date().toISOString(),
//       isUpdated: false,
//     },
//   });
//   dispatch(addResume({ ...resume, id: docRef.id }));
// };

const resumeActionSlice = createSlice({
  name: "createResume",
  initialState,
  reducers: {
    addResume: {
      reducer: (state, action: PayloadAction<Resume>) => {
        state.push(action.payload);
      },
      prepare: (resume: Resume) => {
        // const collectionRef = collection(db, "resumes");
        // addDoc(collectionRef, {
        //   ...resume,
        //   id: nanoid(),
        //   createInfo: {
        //     ...resume.createInfo,
        //     date: new Date().toISOString(),
        //     isUpdated: false,
        //   },
        // });
        return {
          payload: {
            ...resume,
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
    loadResumes: (state, action: PayloadAction<Resume[]>) => {
      return action.payload;
    },
  },
});

export const selectAllResumes = (state: any) => state.createResume;

export const { addResume, deleteResume, updateResume, loadResumes } =
  resumeActionSlice.actions;

export default resumeActionSlice.reducer;
