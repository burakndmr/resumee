import React from "react";
import Image from "next/image";

interface NoResumeProps {}

export const NoResume: React.FC<NoResumeProps> = () => {
  return (
    <div className="flex justify-center items-center flex-col mt-12 md:mt-7">
      <Image src="/dashboard/noResumee.svg" width={170} height={170} />
      <h1 className="max-w-md text-center my-4 text-xl">
        Click the &#39;&#39;Create Resume&#39;&#39; button to create your first
        resume
      </h1>
    </div>
  );
};
