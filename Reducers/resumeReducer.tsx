import { Resume } from "../lib/types";

export default function resumeReducer(state: Resume[], action: any): Resume[] {
  switch (action.type) {
    case "SET_RESUME":
      return [...state, action.payload];
    case "GET_RESUMES":
      return [...state, ...action.payload];

    case "UPDATE_RESUME":
      return state.map((resume: Resume) =>
        resume.resumeInfo.id === action.payload.id
          ? { ...resume, ...action.payload }
          : resume
      );
    case "DELETE_RESUME":
      return state.filter((resume) => resume.resumeInfo.id !== action.payload);
    default:
      return state;
  }
}
