// ------------------ NEXT ------------------
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// ------------------ TYPESCRIPT ------------------
import { Resume } from "../../../lib/types";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../utils/firebase";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
// ------------------ REDUX ------------------
import { useSelector, useDispatch } from "react-redux";
import {
  addResume,
  selectAllResumes,
  deleteResume,
  loadResumes,
} from "../../../slices/resumeActions/resumeActionSlice";

// ------------------ COMPONENTS ------------------
import { Header } from "../../../components/landing-page/header/Header";
import { MainLayout } from "../../../components/landing-page/layout/MainLayout";
import { NoResume } from "../../../components/resumeCreator/dashboard/NoResume";
import { Resumee } from "../../../components/resumeCreator/dashboard/Resumee";
import { Spinner } from "flowbite-react";
import { nanoid } from "@reduxjs/toolkit";

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

  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  const getData = async () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (!user) {
      route.push("/auth/Login");
    }
  };

  useEffect(() => {
    getData();
  }, [user, loading]);

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
          name: "",
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
      schoolName: "",
      degree: "",
      fieldOfStudy: "",
      startDate: {
        day: "",
        month: "",
        year: "",
      },
      endDate: {
        day: "",
        month: "",
        year: "",
      },
      schoolCity: "",
      schoolCountry: "",
    },
    ExperienceInfo: {
      sectionName: "experienceInfo",
      companyName: "",
      position: "",
      jobTitle: "",
      startDate: {
        day: "",
        month: "",
        year: "",
      },
      endDate: {
        day: "",
        month: "",
        year: "",
      },
      jobDescription: "",
    },
    Skills: {
      sectionName: "Skills",
      skills: [
        {
          skillName: "",
          skillLevel: "",
        },
      ],
    },
    Languages: {
      sectionName: "languages",
      languages: [
        {
          languageName: "",
          languageLevel: "",
        },
      ],
    },
    Projects: {
      sectionName: "projects",
      projects: [
        {
          projectName: "",
          projectDescription: "",
          projectLink: "",
        },
      ],
    },
    Templates: {
      sectionName: "templates",
      templateName: "",
      templateId: "",
      templateColor: "",
    },
  };

  // let lastCreatedResume: Resume | undefined;
  // useEffect(() => {
  //   lastCreatedResume = resumes.slice(-1)[0];
  //   if (resumeCreated) {
  //     setTimeout(() => {}, 5000);
  //   }
  // }, [resumeCreated]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadData = async () => {
    const q = query(collection(db, "resumes"), where("user", "==", user?.uid));
    const resumes: any[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      resumes.push(JSON.parse(doc.data().data));
    });
    console.log(resumes);
    dispatch(loadResumes(resumes));
  };

  useEffect(() => {
    if (user?.uid) {
      loadData();
    }
  }, [user]);

  const createResumee = async () => {
    const id = nanoid();
    await setDoc(doc(db, "resumes", id), {
      id: id,
      user: user?.uid,
      data: `{"id":"${id}","resumeName":"resume1","createInfo":{"date":"","isUpdated":false},"mainInfo":{"sectionName":"mainInfo","name":"","phone":"","city":"","jobTitle":"","email":"","links":[{"name":"","url":""}]},"profileInfo":{"sectionName":"","profileDescription":""},"educationInfo":{"sectionName":"profileInfo","schoolName":"","degree":"","fieldOfStudy":"","startDate":{"day":"","month":"","year":""},"endDate":{"day":"","month":"","year":""},"schoolCity":"","schoolCountry":""},"ExperienceInfo":{"sectionName":"experienceInfo","companyName":"","position":"","jobTitle":"","startDate":{"day":"","month":"","year":""},"endDate":{"day":"","month":"","year":""},"jobDescription":""},"Skills":{"sectionName":"Skills","skills":[{"skillName":"","skillLevel":""}]},"Languages":{"sectionName":"languages","languages":[{"languageName":"","languageLevel":""}]},"Projects":{"sectionName":"projects","projects":[{"projectName":"","projectDescription":"","projectLink":""}]},"Templates":{"sectionName":"templates","templateName":"","templateId":"","templateColor":""}}`,
    });
    dispatch(
      addResume({
        ...initialValue,
        id: id,
      })
    );
    router.push(`/app/resumebuilder/${id}`);
  };

  return (
    <MainLayout>
      {resumeCreated ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Spinner color="warning" size="xl" />
        </div>
      ) : (
        <>
          <Header />
          <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 mt-6 grid-flow-row-dense">
            <h1 className="font-bold text-4xl md:col-start-1">Dashboard</h1>
            <hr className="my-4 md:col-span-4 xl:col-span-6" />
            <div
              onClick={() => createResumee()}
              className="text-white text-lg font-semibold whitespace-nowrap w-full md:col-span-1 md:col-start-4 xl:col-start-6 mb-5 md:mb-0"
            >
              <button
                onClick={() => setResumeCreated(true)}
                className="primary-btn w-full p-5"
              >
                Create Resume
              </button>
            </div>
          </div>
          <div
            className={!load ? "h-96 flex items-center justify-center" : "h-96"}
          >
            {!load ? (
              <Spinner color="warning" size="xl" />
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
        </>
      )}
    </MainLayout>
  );
};

export default Index;
