import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { MainLayout } from "../../components/landing-page/layout/MainLayout";
import { Card } from "flowbite-react";

import { FcGoogle } from "react-icons/fc";

import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../utils/firebase";
import Link from "next/link";

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/app/dashboard");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const onLogin = (e: any) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        route.push("/app/dashboard");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(true);
      });
  };

  useEffect(() => {
    if (user) {
      route.push("/app/dashboard");
    } else {
      console.log("login");
    }
  }, [user]);

  return (
    <div>
      <MainLayout>
        <Card className="mt-32 max-w-xl mx-auto">
          <div className="flex flex-col">
            <h1 className="font-semibold text-3xl text-gray-900">Login</h1>
            <button
              onClick={googleLogin}
              className="flex items-center relative justify-center bg-gray-700 hover:bg-gray-800 rounded-lg py-3 px-5 mt-3"
            >
              <FcGoogle className=" absolute left-4 text-3xl" />
              <p className="text-white">Sign Up with Google</p>
            </button>
            <form>
              <div className="flex flex-col items-start justify-center">
                <label
                  className="text-sm mt-3 text-gray-900"
                  htmlFor="email-address"
                >
                  Email address
                </label>
                <input
                  className="input-normal"
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(false);
                  }}
                />
              </div>

              <div className="flex flex-col items-start justify-center">
                <label
                  className="text-sm mt-3 text-gray-900"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="input-normal"
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                />
              </div>
              <div
                className={
                  error ? "flex flex-col items-start justify-center" : "hidden"
                }
              >
                <p className="text-sm mt-3 text-red-600">
                  Something wrong, please try again
                </p>
              </div>
              <div>
                <button className="primary-btn mt-3" onClick={onLogin}>
                  Login
                </button>
              </div>
            </form>
            <p className="text-sm mt-3 text-center">
              Already have an account?{" "}
              <Link href={"/auth/Login"}>
                <span className="cursor-pointer text-primary">Login</span>
              </Link>
            </p>
          </div>
        </Card>
      </MainLayout>
    </div>
  );
};

export default SignUp;
