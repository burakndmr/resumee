// ------------- NEXTJS -------------
import Image from "next/image";
import Link from "next/link";

// ------------- TYPESCRIPT -------------
import { Resume } from "../../../lib/types";

// ------------- REDUX -------------
import { useDispatch } from "react-redux";
import { deleteResume } from "../../../slices/resumeActions/resumeActionSlice";

interface ResumeeProps {
  resume: Resume;
}

export const Resumee: React.FC<ResumeeProps> = ({ resume }) => {
  const dispatch = useDispatch();

  return (
    <li key={resume.id}>
      <Link href={`resumebuilder/${resume.id}`}>
        <a>{resume.mainInfo.name}</a>
      </Link>
      <button onClick={() => dispatch(deleteResume(resume.id))}>
        DELETE_RESUME
      </button>
    </li>
  );
};
