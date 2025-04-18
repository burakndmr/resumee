"use client";
import React from "react";
import { logOut } from "@/app/actions/auth/logout/action";

const SignOutButton = () => {
  return <button onClick={logOut}>Sign Out</button>;
};

export default SignOutButton;
