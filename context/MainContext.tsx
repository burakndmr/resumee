import React, { createContext, useContext, useState, useReducer } from "react";

import resumeReducer from "../Reducers/resumeReducer";
// IMPORT TYPES
import { resumeType, InitialStateType } from "../lib/types";

const MainContext = createContext<{
  state: resumeType;
  dispatch: React.Dispatch<any>;
}>({
  state: { id: 0, name: "", email: "", phone: "" },
  dispatch: () => {},
});

export const MainProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialState: resumeType = {
    id: 0,
    name: "",
    email: "",
    phone: "",
  };

  const [state, dispatch] = useReducer(resumeReducer, initialState);

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

// interface Resume {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   summary: string;
//   education: Education[];
//   experience: Experience[];
//   skills: Skill[];
//   languages: Language[];
//   interests: Interest[];
//   references: Reference[];

// }

// interface Education {
//   institution: string;
//   area: string;
//   studyType: string;
//   startDate: string;
//   endDate: string;
//   gpa: string;
//   courses: string[];
// }

// interface Experience {
//   company: string;
//   position: string;
//   website: string;
//   startDate: string;
//   endDate: string;
//   summary: string;
//   highlights: string[];
// }

// interface Skill {
//   name: string;
//   level: string;
//   keywords: string[];
// }

// interface Language {
//   name: string;
//   level: string;
// }

// interface Interest {
//   name: string;
//   keywords: string[];
// }

// interface Reference {
//   name: string;
//   reference: string;
// }

// const ResumeContext = createContext<Resume | null>(null);

// export const ResumeProvider = ResumeContext.Provider;
// export const useResume = () => useContext(ResumeContext);
// export default ResumeContext;
