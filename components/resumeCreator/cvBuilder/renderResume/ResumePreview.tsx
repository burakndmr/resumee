import React, { forwardRef } from "react";
import { Resume } from "../../../../lib/types";

import moment from "moment";

type Props = {
  data: Resume;
};

const ResumePreview: React.FC<Props> = (data) => {
  const resumee: Resume = data.data;
  console.log(data);
  const date = new Date();
  console.log(date);

  let startSchoolDate = `${resumee.educationInfo?.startDate.year}${
    resumee.educationInfo?.startDate.month.length === 1
      ? "0" + resumee.educationInfo?.startDate.month
      : resumee.educationInfo?.startDate.month
  }${
    resumee.educationInfo?.startDate.day.length === 1
      ? "0" + resumee.educationInfo?.startDate.day
      : resumee.educationInfo?.startDate.day
  }`;

  let endSchoolDate = `${resumee.educationInfo?.endDate.year}${
    resumee.educationInfo?.endDate.month.length === 1
      ? "0" + resumee.educationInfo?.endDate.month
      : resumee.educationInfo?.endDate.month
  }${
    resumee.educationInfo?.endDate.day.length === 1
      ? "0" + resumee.educationInfo?.endDate.day
      : resumee.educationInfo?.endDate.day
  }`;
  return (
    <div className="aspect-realA4 scale-75 md:scale-75 lg:scale-95 xl:scale-100 box-border border-2 p-4">
      <div className="h-64 bg-orange-300 flex items-center justify-center flex-col mb-24">
        <h2 className="text-4xl font-semibold">{resumee.mainInfo?.name}</h2>
        <h6 className="text-sm italic font-thin text-gray-800">
          {resumee.mainInfo?.jobTitle}
        </h6>
      </div>
      <div className="mx-auto w-[780px]">
        <hr className="mb-8" />
        <div className="flex justify-between items-start">
          <div className="w-72">
            <div>
              <h1 className="text-xl font-semibold">Skills </h1>
              {resumee.Skills?.skills.map(
                (skill, i) =>
                  skill.skillName !== "" && (
                    <div key={i} className="flex items-center justify-start">
                      <h1 className="text-sm ml-2 text-gray-900">
                        - {skill.skillName}
                      </h1>
                      {skill.skillLevel !== "-" &&
                        Array.from({ length: Number(skill.skillLevel) }).map(
                          (level, i) => <div key={i}>Çizgi</div>
                        )}
                    </div>
                  )
              )}
            </div>
            <div>
              <h1 className="text-xl font-semibold">Education Info</h1>
              <h1 className="text-sm ml-2 text-gray-900">
                - {resumee.educationInfo?.schoolName}
              </h1>
              <div className="flex items-center justify-start">
                <h1 className="text-sm ml-2 text-gray-900">
                  {moment(startSchoolDate).format("MMMM Do YYYY")}
                </h1>
                <h1 className="text-sm ml-2 text-gray-900">
                  - {moment(endSchoolDate).format("MMMM Do YYYY")}
                </h1>
              </div>
              <div className="flex items-center justify-start">
                <h1 className="text-sm ml-2 text-gray-900">
                  {resumee.educationInfo?.schoolCity}
                </h1>
                <h1 className="text-sm ml-2 text-gray-900">
                  - {resumee.educationInfo?.schoolCountry}
                </h1>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Social Media</h1>
              <div className="flex items-center justify-start">
                {resumee.mainInfo?.links[0].url !== "" &&
                  resumee.mainInfo?.links.map((link, i) => (
                    <div key={i} className="flex items-center justify-start">
                      <h1 className="text-sm ml-2 text-gray-900">
                        - {link.url}
                      </h1>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="w-[1px] border border-gray-300 h-96 bg-gray-300"></div>
          <div className="w-72">
            <h1 className="text-xl font-semibold">Basic Info</h1>
            <h1 className="text-xl font-semibold">Language</h1>
            <h1 className="text-xl font-semibold">Projects</h1>
            <h1 className="text-xl font-semibold">Work Experience</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
