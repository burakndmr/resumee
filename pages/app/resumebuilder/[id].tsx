import React, { Dispatch, useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import uniqid from "uniqid";

import { Config, Resume } from "../../../lib/types";

import { useMainContext } from "../../../context/MainContext";

import { useFormik, Formik, Form, Field } from "formik";

import Link from "next/link";
import Router from "next/router";
import { useConfigureContext } from "../../../context/ConfigureContext";

// ------------------ REDUX ------------------

import { useSelector, useDispatch } from "react-redux";

import {
  addResume,
  selectAllResumes,
  updateResume,
} from "../../../slices/createResume/createResumeSlice";

const App: NextPage = () => {
  const router = useRouter();

  console.log("router", router.query);

  // const { state, dispatch } = useMainContext();

  const { configureState } = useConfigureContext();

  const configureArray = [];
  configureState.map((el) => configureArray.push(el));

  const dispatch = useDispatch();

  const resumes = useSelector(selectAllResumes);

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

  const defaultValue = {
    id: "",
    resumeName: "resume1",
    mainInfo: {
      sectionName: "mainInfo",
      name: "BURAKKKKKK",
      phone: "123123123",
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

  if (router.query.id === "newResume") {
    console.log("NEW RESUME");
  } else {
    console.log("OLD RESUME");
  }

  const selectedResumeArr = resumes.filter(
    (resume: Resume) => resume.id === router.query.id
  );

  const selectedResume = selectedResumeArr[0];

  const [initialState, setInitialState] = useState(initialValue);

  console.log("initialState", initialState);

  useEffect(() => {
    if (router.query.id == "newResume") {
      setInitialState(initialValue);
    } else {
      setInitialState(selectedResume);

      console.log("selected", selectedResume);
    }
  }, []);

  // const SelectedId = configureArray.filter(
  //   (config: Config) => config.selectedResume === router.query.id
  // );
  // console.log("SELECTED ID", SelectedId);
  const formik = useFormik({
    initialValues: initialState,
    enableReinitialize: true,
    // For if context or localStorage has value, initial value is change
    // enableReinitialize: true,

    onSubmit: (values) => {
      // if (resumeLenght > 0) {
      //   dispatch({
      //     type: "SET_RESUME",
      //     payload: values,
      //   });
      // } else {
      //   dispatch({
      //     type: "SET_RESUME",
      //     payload: [],
      //   });
      // dispatch({
      //   type: "SET_RESUME",
      //   payload: values,
      // });

      // }
      if (router.query.id === "newResume") {
        dispatch(addResume(values));
      } else {
        dispatch(updateResume(values));
      }
    },
  });

  return (
    <>
      <h1>{initialState?.mainInfo?.name}</h1>
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
      {/* {
        <div>
          {Array.isArray(state) &&
            state.map((el: Resume, i: Number) => (
              <div key={i.toString()}>{el.mainInfo.name}</div>
            ))}
        </div>
      } */}
    </>
  );
};

export default App;
