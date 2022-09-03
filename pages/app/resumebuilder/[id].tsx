import React, { Dispatch } from "react";
import type { NextPage } from "next";

import uniqid from "uniqid";

import { Resume } from "../../../lib/types";

import { useMainContext } from "../../../context/MainContext";

import { useFormik, Formik, Form, Field } from "formik";

import Link from "next/link";
import Router from "next/router";

const App: NextPage = () => {
  const { state, dispatch } = useMainContext();

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
