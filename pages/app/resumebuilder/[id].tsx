import React, { Dispatch, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import uniqid from "uniqid";

import { Config, Resume } from "../../../lib/types";

import { useMainContext } from "../../../context/MainContext";

import { useFormik, Formik, Form, Field } from "formik";

import Link from "next/link";
import Router from "next/router";
import { useConfigureContext } from "../../../context/ConfigureContext";

const App: NextPage = () => {
  const router = useRouter();

  const { state, dispatch } = useMainContext();

  const { configureState } = useConfigureContext();

  const configureArray = [];
  configureState.map((el) => configureArray.push(el));

  // const SelectedId = configureArray.filter(
  //   (config: Config) => config.selectedResume === router.query.id
  // );
  // console.log("SELECTED ID", SelectedId);
  const formik = useFormik({
    initialValues: {
      resumeInfo: {
        resumeName: "resume1",
        id: uniqid(),
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
    },

    // For if context or localStorage has value, initial value is change
    // enableReinitialize: true,

    onSubmit: (values) => {
      const resumeLenght = state.length;
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
      dispatch({
        type: "SET_RESUME",
        payload: values,
      });
      // }
    },
  });

  console.log("resumeBuilder", state);
  return (
    <>
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
