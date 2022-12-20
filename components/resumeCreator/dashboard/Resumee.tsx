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
    <div key={resume.id} className="flex justify-center sm:justify-start gap-3">
      <Link href={`resumebuilder/${resume.id}`}>
        <a className="h-[200px] sm:h-52 md:h-60 w-36 md:w-44 sm:h-40 relative">
          <Image
            src="/dashboard/InitialSkeletonResumee.svg"
            // layout="intrinsic"
            // width={120}
            // height={176}
            layout="fill" // required
            objectFit="scale-down"
          />
        </a>
      </Link>
      <div>
        <p>{resume.mainInfo.name}</p>
        <button onClick={() => dispatch(deleteResume(resume.id))}>
          DELETE_RESUME
        </button>
      </div>
    </div>
  );
};
