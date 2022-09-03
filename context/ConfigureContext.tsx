import React, { createContext, useContext, useEffect, useReducer } from "react";

import configureReducer from "../Reducers/configureReducer";

// IMPORT TYPES
import { Config } from "../lib/types";

interface InitialType {
  state: Config[];
  dispatch: React.Dispatch<any>;
}

const InitialState = {
  state: [],
  dispatch: () => {},
};

const ConfigureContext = createContext<InitialType>(InitialState);

export const ConfigureProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialState: Config[] = [
    {
      selectedResume: "",
    },
  ];

  const [state, dispatch] = useReducer(configureReducer, initialState);

  useEffect(() => {
    const selectedResume = localStorage.getItem("resumeConfig");
    if (selectedResume) {
      dispatch({
        type: "SET_SELECTED_RESUME",
        payload: JSON.parse(selectedResume),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("resumeConfig", JSON.stringify(state));
  }, [state]);

  return (
    <ConfigureContext.Provider value={{ state, dispatch }}>
      {children}
    </ConfigureContext.Provider>
  );
};
