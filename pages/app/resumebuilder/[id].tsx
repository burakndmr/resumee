// ------------------ NEXT - REACT ------------------
import React, { useEffect, useState } from "react";

import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Router from "next/router";

// ------------------ TYPESCRIPT ------------------
import { Config, Resume } from "../../../lib/types";

// ----------------- FLOWBITE -----------------
import { Alert, Card } from "flowbite-react";

// ------------------ CUSTOM COMPS ------------------
import { Progress } from "../../../components/resumeCreator/cvBuilder/Progress";

import { BuilderLayout } from "../../../components/resumeCreator/cvBuilder/layout/CvBuilderLayout";

// ------------------ FORMIK ------------------
import { useFormik, Formik, Form, Field } from "formik";

// ------------------ REDUX ------------------
import { useSelector, useDispatch } from "react-redux";
import {
  addResume,
  selectAllResumes,
  updateResume,
} from "../../../slices/resumeActions/resumeActionSlice";

const App: NextPage = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const resumes = useSelector(selectAllResumes);

  const isNewResume: Boolean = router.query.id === "newResume";

  // Initial Values for the form
  const initialValue = {
    id: "",
    resumeName: "resume1",
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
      sectionName: "profileInfo",
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

  const selectedResumeArr = resumes.filter(
    (resume: Resume) => resume.id === router.query.id
  );

  const formik = useFormik({
    initialValues: isNewResume ? initialValue : selectedResumeArr[0],
    enableReinitialize: true,
    onSubmit: (values) => {
      if (isNewResume) {
        dispatch(addResume(values));
      } else {
        dispatch(updateResume(values));
      }
    },
  });

  const [progress, setProgress] = useState(0);

  return (
    <>
      {formik.values?.mainInfo?.name === undefined ? (
        <p>LOADING</p>
      ) : (
        <BuilderLayout>
          <div className="pt-10 md:pt-14 lg:pt-36">
            <Progress progress={progress} />
            <h1 className="text-4xl md:text-5xl lg:text-6xl my-6 md:my-9 lg:my-12 text-center font-bold font-sans">
              Tell us a little about yourself
            </h1>
            <Card>
              <h1>{formik?.values?.mainInfo?.name}</h1>
              <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      id="name"
                      name="mainInfo.name"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.mainInfo.name}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Name</label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      id="phone"
                      name="mainInfo.phone"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.mainInfo.phone}
                    />
                  </div>
                </div>
                <button
                  onClick={() => Router.push("/app/dashboard")}
                  type="submit"
                >
                  YAZDIR
                </button>
              </form>
            </Card>
          </div>
        </BuilderLayout>
      )}
    </>
  );
};

export default App;
