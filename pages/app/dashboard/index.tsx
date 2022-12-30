// ------------------ NEXT ------------------
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// ------------------ TYPESCRIPT ------------------
import { Resume } from "../../../lib/types";

// ------------------ REDUX ------------------
import { useSelector, useDispatch } from "react-redux";
import {
  addResume,
  selectAllResumes,
  deleteResume,
} from "../../../slices/resumeActions/resumeActionSlice";

// ------------------ COMPONENTS ------------------
import { Header } from "../../../components/landing-page/header/Header";
import { MainLayout } from "../../../components/landing-page/layout/MainLayout";
import { NoResume } from "../../../components/resumeCreator/dashboard/NoResume";
import { Resumee } from "../../../components/resumeCreator/dashboard/Resumee";

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const dispatch = useDispatch();

  const resumes = useSelector(selectAllResumes);

  const router = useRouter();

  const [load, setLoad] = useState(false);
  const [resumeCreated, setResumeCreated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoad(true);
    } else {
      setLoad(false);
    }
  }, []);

  const initialValue = {
    id: "",
    resumeName: "resume1",
    createInfo: {
      date: "",
      isUpdated: false,
    },
    mainInfo: {
      sectionName: "mainInfo",
      name: "",
      phone: "",
      city: "",
      jobTitle: "",
      email: "",
      links: [
        {
          name: "LinkedIn",
          url: "",
        },
        {
          name: "Github",
          url: "",
        },
      ],
    },
    profileInfo: {
      sectionName: "",
      profileDescription: "",
    },
    educationInfo: {
      sectionName: "profileInfo",
      educations: [
        {
          schoolName: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          schoolCity: "",
          schoolCountry: "",
        },
      ],
    },
    Skills: {
      sectionName: "Skills",
      skills: [
        {
          skillName: "skill1",
          skillLevel: "",
        },
        {
          skillName: "skill2",
          skillLevel: "",
        },
      ],
    },
  };

  let lastCreatedResume: Resume | undefined;
  useEffect(() => {
    lastCreatedResume = resumes.slice(-1)[0];
    if (resumeCreated) {
      setTimeout(() => {
        router.push(`/app/resumebuilder/${lastCreatedResume?.id}`);
      }, 1000);
    }
  }, [resumeCreated]);

  return (
    <MainLayout>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 mt-6 grid-flow-row-dense">
        <h1 className="font-bold text-4xl md:col-start-1">Dashboard</h1>
        <hr className="my-4 md:col-span-4 xl:col-span-6" />
        <div
          onClick={() => dispatch(addResume(initialValue))}
          className="text-white text-lg font-semibold whitespace-nowrap w-full md:col-span-1 md:col-start-4 xl:col-start-6 mb-5 md:mb-0"
        >
          <button
            onClick={() => setResumeCreated(true)}
            className="primary-btn w-full p-5"
          >
            {!resumeCreated ? "Create Resume" : "Loading"}
          </button>
        </div>
       
      </div>
      <div className="h-96">
        {!load ? (
          <p>LOADING</p>
        ) : resumes.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {resumes.map((resume: Resume) => (
              <Resumee key={resume.id} resume={resume} />
            ))}
          </div>
        ) : (
          <NoResume />
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
