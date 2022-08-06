import React, { Dispatch } from "react";
import type { NextPage } from "next";

import { resumeType } from "../../lib/types";

import { useMainContext } from "../../context/MainContext";
import { useFormik, Formik, Form, Field } from "formik";

const App: NextPage = () => {
  const { state, dispatch } = useMainContext();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },

    onSubmit: (values) => {
      console.log(values);
      dispatch({
        type: "SET_RESUME",
        payload: values,
      });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />

        <label htmlFor="email">email</label>
        <input
          id="email"
          name="email"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.phone}
        />
        <button type="submit">EKLE</button>
      </form>
      <div>
        {state.name}
        {state.email}
        {state.phone}
      </div>
    </>
  );
};

export default App;
