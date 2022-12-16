// ------------------ NEXT ------------------
import Link from "next/link";

// ------------------ TYPESCRIPT ------------------
import { Resume } from "../../../lib/types";

// ------------------ REDUX ------------------
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllResumes,
  deleteResume,
} from "../../../slices/resumeActions/resumeActionSlice";

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
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
        </ul>
      </div>
    </>
  );
};

export default Index;
