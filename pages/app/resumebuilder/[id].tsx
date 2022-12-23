// ------------------ NEXT - REACT ------------------
import React, { useEffect, useState } from "react";

import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Router from "next/router";

// ------------------ TYPESCRIPT ------------------
import { Resume } from "../../../lib/types";

// ----------------- FLOWBITE -----------------
import { Alert, Card } from "flowbite-react";

// ------------------ CUSTOM COMPS ------------------
import { Progress } from "../../../components/resumeCreator/cvBuilder/progress/Progress";

import { BuilderLayout } from "../../../components/resumeCreator/cvBuilder/layout/CvBuilderLayout";

// ------------------ FORMIK ------------------
import { useFormik } from "formik";
import * as Yup from "yup";

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

  const formSchema = Yup.object().shape({
    mainInfo: Yup.object().shape({
      name: Yup.string().required("Please enter your name"),
      phone: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
    }),
  });

  const formik = useFormik<Resume>({
    initialValues: isNewResume ? initialValue : selectedResumeArr[0],
    validationSchema: formSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      isNewResume
        ? dispatch(addResume(values))
        : dispatch(updateResume(values));
    },
  });

  const [progress, setProgress] = useState(20);

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
              <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      className={
                        formik.errors.mainInfo?.name &&
                        formik.touched.mainInfo?.name
                          ? "input-error"
                          : "input-normal"
                      }
                      id="name"
                      name="mainInfo.name"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.mainInfo.name}
                    />
                    <div>
                      {formik.errors.mainInfo?.name &&
                      formik.touched.mainInfo?.name ? (
                        <p className="text-sm text-red-600">
                          {formik.errors.mainInfo?.name}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone">Name</label>
                    <input
                      className="input-normal"
                      id="phone"
                      name="mainInfo.phone"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.mainInfo.phone}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      className={
                        formik.errors.mainInfo?.email &&
                        formik.touched.mainInfo?.email
                          ? "input-error"
                          : "input-normal"
                      }
                      id="email"
                      name="mainInfo.email"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.mainInfo.email}
                    />
                    <div>
                      {formik.errors.mainInfo?.email &&
                      formik.touched.mainInfo?.email ? (
                        <p className="text-sm text-red-600">
                          {formik.errors.mainInfo?.email}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={
                    isNewResume
                      ? formik.dirty && formik.isValid
                        ? () => Router.push("/app/dashboard")
                        : () => console.log("not ready")
                      : formik.isValid
                      ? () => Router.push("/app/dashboard")
                      : () => console.log("not ready")
                  }
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
