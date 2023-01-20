import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { MainLayout } from "../../components/landing-page/layout/MainLayout";
import { Card } from "flowbite-react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { loadResumes } from "../../slices/resumeActions/resumeActionSlice";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const route = useRouter();

  const dispatch = useDispatch();
  const [user, loading] = useAuthState(auth);

  const getData = async () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (!user) {
      route.push("/auth/Login");
    }
  };

  useEffect(() => {
    getData();
  }, [user, loading]);

  const logoutHandler = () => {
    auth.signOut();
    dispatch(loadResumes([]));
  };

  return (
    <div>
      <MainLayout>
        <Card className="mt-32 max-w-xl mx-auto">
          <div className="flex flex-col">
            <h1 className="font-semibold text-3xl text-gray-900">Profile</h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center mt-5 gap-5 justify-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user?.photoURL || "/dashboard/default-avatar.png"}
                  alt="profile"
                  className="w-12 h-12 rounded-full"
                />
                <p className="text-gray-700 text-xl">
                  Welcome {user?.displayName}
                </p>
              </div>
              <button
                onClick={() => logoutHandler()}
                className="primary-btn max-w-[120px]"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </Card>
      </MainLayout>
    </div>
  );
};

export default Profile;
