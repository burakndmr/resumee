import React from "react";

import { MainLayout } from "../../components/landing-page/layout/MainLayout";
import { Card } from "flowbite-react";

import { FcGoogle } from "react-icons/fc";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  return (
    <div>
      <MainLayout>
        <Card className="mt-32 max-w-xl mx-auto">
          <div className="flex flex-col">
            <h1 className="font-semibold text-3xl text-gray-900">Login</h1>
            <button className="flex items-center relative justify-center bg-gray-700 hover:bg-gray-800 rounded py-3 px-5 mt-3">
              <FcGoogle className=" absolute left-4 text-3xl" />
              <p className="text-white">Login with Google</p>
            </button>
          </div>
        </Card>
      </MainLayout>
    </div>
  );
};

export default Login;
