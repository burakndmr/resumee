// ------------------ NEXT - REACT ------------------
import React, { useEffect, useState } from "react";

import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Router from "next/router";

// ------------------ TYPESCRIPT ------------------
import { Config, Resume } from "../../../lib/types";

// ----------------- FLOWBITE -----------------
import { Alert, Progress } from "flowbite-react";

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

  return (
    <>
      {formik.values?.mainInfo?.name === undefined ? (
        <p>LOADING</p>
      ) : (
        <>
          <h1>{formik?.values?.mainInfo?.name}</h1>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="mainInfo.name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.mainInfo.name}
            />
            <input
              id="phone"
              name="mainInfo.phone"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.mainInfo.phone}
            />
            <button onClick={() => Router.push("/app/dashboard")} type="submit">
              YAZDIR
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default App;
