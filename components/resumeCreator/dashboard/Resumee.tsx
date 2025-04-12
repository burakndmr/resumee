// ------------- NEXTJS -------------
import Image from "next/image";
import Link from "next/link";

// ------------- TYPESCRIPT -------------
import { Resume } from "../../../lib/types";

// ------------- REDUX -------------
import { useDispatch } from "react-redux";
import { deleteResume } from "../../../slices/resumeActions/resumeActionSlice";
import moment from "moment";

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
            layout="fill"
            objectFit="scale-down"
          />
        </a>
      </Link>
      <div>
        <p>{resume.mainInfo.name}</p>
        <p className="text-sm text-gray-600">
          {resume.createInfo.isUpdated ? "Updated " : "Created "}
          {moment(resume.createInfo.date).format("DD MMMM, HH:mm")}
        </p>
        <button onClick={() => dispatch(deleteResume(resume.id))}>
          DELETE_RESUME
        </button>
      </div>
    </div>
  );
};
