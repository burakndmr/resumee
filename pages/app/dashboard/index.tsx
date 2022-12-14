import { Resume } from "../../../lib/types";
import Link from "next/link";

// IMPORT CONTEXTS
// import { useMainContext } from "../../../context/MainContext";
// import { useConfigureContext } from "../../../context/ConfigureContext";

// IMPORT REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllResumes,
  deleteResume,
} from "../../../slices/createResume/createResumeSlice";

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  // const { state, dispatch } = useMainContext();

  // const { configureState, configureDispatch } = useConfigureContext();

  // console.log("dashboard", state);

  // const handleResume = (id: String) => {
  //   configureDispatch({
  //     type: "SET_SELECTED_RESUME",
  //     payload: {
  //       selectedResume: id,
  //     },
  //   });
  // };

  const dispatch = useDispatch();

  const resumes = useSelector(selectAllResumes);

  return (
    <>
      <h1>Dashboard</h1>

      <h2>RESUME LIST</h2>
      <Link href="/app/resumebuilder/newResume">
        <a>
          <button>ADD RESUME</button>
        </a>
      </Link>
      <div>
        <ul>
          {resumes &&
            resumes.map((resume: Resume) => (
              <li key={resume.id}>
                <Link href={`resumebuilder/${resume.id}`}>
                  <a>{resume.mainInfo.name}</a>
                </Link>
                <button onClick={() => dispatch(deleteResume(resume.id))}>
                  DELETE_RESUME
                </button>
              </li>
            ))}
          {/* {state.map((resume: Resume) => (
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
          ))} */}
        </ul>
      </div>
    </>
  );
};

export default Index;
