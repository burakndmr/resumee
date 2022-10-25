import React, { createContext, useContext, useEffect, useReducer } from "react";

import configureReducer from "../Reducers/configureReducer";

// IMPORT TYPES
import { Config } from "../lib/types";

interface InitialType {
  configureState: Config[];
  configureDispatch: React.Dispatch<any>;
}

const InitialState = {
  configureState: [],
  configureDispatch: () => {},
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

  const [configureState, configureDispatch] = useReducer(
    configureReducer,
    initialState
  );

  useEffect(() => {
    const selectedResume = localStorage.getItem("resumeConfig");
    if (selectedResume) {
      configureDispatch({
        type: "SET_SELECTED_RESUME",
        payload: JSON.parse(selectedResume),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("resumeConfig", JSON.stringify(configureState));
  }, [configureState]);

  return (
    <ConfigureContext.Provider value={{ configureState, configureDispatch }}>
      {children}
    </ConfigureContext.Provider>
  );
};

// create useContext hook
export const useConfigureContext = () => {
  const context = useContext(ConfigureContext);
  return context;
};
