import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from "react";

import resumeReducer from "../Reducers/resumeReducer";
// IMPORT TYPES
import { Resume } from "../lib/types";

interface InitialType {
  state: Resume[];
  dispatch: React.Dispatch<any>;
}

const InitialState = {
  state: [],
  dispatch: () => {},
};

const MainContext = createContext<InitialType>(InitialState);

export const MainProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialState: Resume[] | null = [];

  const [state, dispatch] = useReducer(resumeReducer, initialState);

  useEffect(() => {
    const resumes = localStorage.getItem("resumes");
    if (resumes) {
      dispatch({
        type: "GET_RESUMES",
        payload: JSON.parse(resumes),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("resumes", JSON.stringify(state));
  }, [state]);

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      {children}
    </MainContext.Provider>
  );
};

// create useContext hook
export const useMainContext = () => {
  const context = useContext(MainContext);
  return context;
};
