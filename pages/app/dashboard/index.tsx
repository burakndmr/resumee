import React, { useEffect } from "react";

import { Resume } from "../../../lib/types";

// IMPORT CONTEXTS
import { useMainContext } from "../../../context/MainContext";
import Link from "next/link";
import { useConfigureContext } from "../../../context/ConfigureContext";

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const { state, dispatch } = useMainContext();

  const { configureState, configureDispatch } = useConfigureContext();

  console.log("dashboard", state);

  const handleResume = (id: String) => {
    configureDispatch({
      type: "SET_SELECTED_RESUME",
      payload: {
        selectedResume: id,
      },
    });
  };

  return (
    <>
      <h1>Dashboard</h1>

      <h2>RESUME LIST</h2>
      <Link href="resumebuilder/newResume">
        <a>
          <button>ADD RESUME</button>
        </a>
      </Link>
      <div>
        <ul>
          {state.map((resume: Resume) => (
            <li
              onClick={() => handleResume(resume.resumeInfo.id)}
              key={resume.resumeInfo.id}
            >
              <Link href={`resumebuilder/${resume.resumeInfo.id}`}>
                <a>{resume.mainInfo.name}</a>
              </Link>
              <button
                onClick={() =>
                  dispatch({
                    type: "DELETE_RESUME",
                    payload: resume.resumeInfo.id,
                  })
                }
              >
                DELETE THIS SHIT
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Index;
