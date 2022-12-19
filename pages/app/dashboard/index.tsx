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

// ------------------ COMPONENTS ------------------
import { Header } from "../../../components/landing-page/header/Header";
import { MainLayout } from "../../../components/landing-page/layout/MainLayout";
import { Button } from "../../../components/landing-page/button/Button";
import { NoResume } from "../../../components/resumeCreator/dashboard/NoResume";
import { Resumee } from "../../../components/resumeCreator/dashboard/Resumee";

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const dispatch = useDispatch();

  const resumes = useSelector(selectAllResumes);

  console.log("resumes", resumes);

  return (
    <MainLayout>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 mt-6 grid-flow-row-dense">
        <h1 className="font-bold text-4xl md:col-start-1">Dashboard</h1>
        <hr className="my-4 md:col-span-4 xl:col-span-6" />
        <Button extraCss="md:col-span-1 md:col-start-4  xl:col-start-6">
          <Link href="/app/resumebuilder/newResume">
            <a className="text-white text-lg font-semibold p-5 whitespace-nowrap ">
              Create Resume
            </a>
          </Link>
        </Button>
      </div>
      <div>
        <ul>
          {resumes.length > 0 ? (
            resumes.map((resume: Resume) => (
              <Resumee key={resume.id} resume={resume} />
            ))
          ) : (
            <NoResume />
          )}
        </ul>
      </div>
    </MainLayout>
  );
};

export default Index;
