import React from "react";
import { Resume } from "../../../../lib/types";
import Link from "next/link";
import moment from "moment";

type Props = {
  data: Resume;
};

const TemplateTwo: React.FC<Props> = (data) => {
  const resumee: Resume = data.data;

  const themeColors = {
    bgColor: `bg-${resumee.Templates?.templateColor}-300`,
    experienceColor: `bg-${resumee.Templates?.templateColor}-500`,
    textColor: `text-${resumee.Templates?.templateColor}-900`,
    borderColor: `border-${resumee.Templates?.templateColor}-300`,
  };

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

  let startWorkDate = `${resumee.ExperienceInfo?.startDate.year}${
    resumee.ExperienceInfo?.startDate.month.length === 1
      ? "0" + resumee.ExperienceInfo?.startDate.month
      : resumee.ExperienceInfo?.startDate.month
  }${
    resumee.ExperienceInfo?.startDate.day.length === 1
      ? "0" + resumee.ExperienceInfo?.startDate.day
      : resumee.ExperienceInfo?.startDate.day
  }`;

  let endWorkDate = `${resumee.ExperienceInfo?.endDate.year}${
    resumee.ExperienceInfo?.endDate.month.length === 1
      ? "0" + resumee.ExperienceInfo?.endDate.month
      : resumee.ExperienceInfo?.endDate.month
  }${
    resumee.ExperienceInfo?.endDate.day.length === 1
      ? "0" + resumee.ExperienceInfo?.endDate.day
      : resumee.ExperienceInfo?.endDate.day
  }`;

  return (
    <div className="aspect-realA4 scale-75 md:scale-75 lg:scale-95 xl:scale-100 box-border border-2 px-20">
      <div className={`flex items-start justify-start flex-col mt-28`}>
        <h2 className="text-5xl font-bold leading-10 my-4">
          {resumee.mainInfo?.name}
        </h2>
        <h6 className="text-lg font-thin text-gray-800">
          {resumee.mainInfo?.jobTitle}
        </h6>
      </div>
      <hr className={`mb-7 mt-5 bg-gray-800 h-2`} />
      <div>
        <div className="flex justify-between items-start">
          <div className="w-80">
            {resumee.Skills.skills[0].skillName !== "" && (
              <div className="mb-4">
                <h1
                  className={`text-[22px] tracking-wider mb-2 font-semibold ${themeColors.textColor}`}
                >
                  SKILLS
                </h1>
                {resumee.Skills?.skills.map(
                  (skill, i) =>
                    skill.skillName !== "" && (
                      <div key={i} className="flex items-center justify-start">
                        <h1 className="text-sm ml-2 text-gray-900 w-40">
                          - {skill.skillName}
                        </h1>
                        {skill.skillLevel !== "-" &&
                          Array.from({ length: Number(skill.skillLevel) }).map(
                            (level, i) =>
                              level !== "-" && (
                                <div
                                  key={i}
                                  className={`w-8 h-2 ${themeColors.experienceColor}`}
                                ></div>
                              )
                          )}
                      </div>
                    )
                )}
              </div>
            )}
            {resumee.Languages?.languages[0].languageName !== "" && (
              <div className="mb-4">
                <h1
                  className={`text-[22px] tracking-wider mb-2 font-semibold ${themeColors.textColor}`}
                >
                  LANGUAGE
                </h1>
                <div className="flex items-start justify-start flex-col">
                  {resumee.Languages?.languages.map(
                    (lang, i) =>
                      lang.languageName !== "" && (
                        <div
                          key={i}
                          className="flex items-center justify-start"
                        >
                          <div className="text-sm ml-2 text-gray-900 w-40">
                            - {lang.languageName}
                          </div>
                          {lang.languageLevel !== "-" &&
                            Array.from({
                              length: Number(lang.languageLevel),
                            }).map(
                              (level, i) =>
                                level !== "-" && (
                                  <div
                                    key={i}
                                    className={`w-8 h-2 ${themeColors.experienceColor}`}
                                  ></div>
                                )
                            )}
                        </div>
                      )
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="w-80">
            {resumee.Projects?.projects[0].projectName !== "" && (
              <div className="mb-4">
                <h1
                  className={`text-[22px] tracking-wider mb-2 font-semibold ${themeColors.textColor}`}
                >
                  PROJECTS
                </h1>
                <div className="flex items-start justify-start flex-col">
                  {resumee.Projects?.projects.map(
                    (project, i) =>
                      project.projectName !== "" && (
                        <div
                          key={i}
                          className="flex items-start flex-col justify-start"
                        >
                          <div className="flex items-center justify-between">
                            <div className="text-sm ml-2 font-semibold text-gray-900 ">
                              - {project.projectName}
                            </div>
                            {project.projectLink !== "" && (
                              <div className="text-sm ml-2  text-gray-900">
                                {project.projectLink}
                              </div>
                            )}
                          </div>
                          {project.projectDescription !== "" && (
                            <div className="text-sm ml-2 mt-1 text-gray-900">
                              {project.projectDescription}
                            </div>
                          )}
                          <hr
                            className={`my-2 ${themeColors.bgColor} ${themeColors.borderColor}`}
                          />
                        </div>
                      )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <hr className={`my-7 bg-gray-800 h-2`} />
        <div className="flex justify-between items-start">
          <div className="w-80">
            {resumee.educationInfo?.schoolName !== "" && (
              <div className="mb-4">
                <h1
                  className={`text-[22px] tracking-wider mb-2 font-semibold ${themeColors.textColor}`}
                >
                  EDUCATION INFO
                </h1>
                <h1 className="text-sm ml-2 text-gray-900">
                  - {resumee.educationInfo?.schoolName}
                </h1>
                <div className="flex items-center justify-start">
                  <h1 className="text-sm ml-2 text-gray-900">
                    {moment(startSchoolDate).format("MMMM Do YYYY") !==
                      "Invalid date" &&
                      moment(startSchoolDate).format("MMMM Do YYYY")}
                  </h1>
                  <h1 className="text-sm ml-2 text-gray-900">
                    -{" "}
                    {moment(endSchoolDate).format("MMMM Do YYYY") !==
                      "Invalid date" &&
                      moment(endSchoolDate).format("MMMM Do YYYY")}
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
            )}
          </div>
          <div className="w-80">
            {resumee.ExperienceInfo?.companyName !== "" && (
              <div className="mb-4">
                <h1
                  className={`text-[22px] tracking-wider mb-2 font-semibold ${themeColors.textColor}`}
                >
                  WORK EXPERIENCE
                </h1>
                <div className="flex items-start justify-start flex-col">
                  {resumee.ExperienceInfo?.companyName !== "" && (
                    <div className="flex items-start justify-center flex-col">
                      <div className="text-sm ml-2  font-semibold text-gray-900">
                        {resumee.ExperienceInfo?.companyName}
                      </div>
                      <div className="flex items-center justify-between my-2">
                        <div className="text-sm ml-2 text-gray-900">
                          {moment(startWorkDate).format("MMMM Do YYYY") !==
                            "Invalid date" &&
                            moment(startWorkDate).format("MMMM Do YYYY")}
                        </div>
                        <div className="text-sm ml-2 text-gray-900">
                          {moment(endWorkDate).format("MMMM Do YYYY") !==
                            "Invalid date" &&
                            "- " + moment(endWorkDate).format("MMMM Do YYYY")}
                        </div>
                      </div>
                      {resumee.ExperienceInfo?.jobDescription !== "" && (
                        <div className="text-sm ml-2 text-gray-900">
                          {resumee.ExperienceInfo?.jobDescription}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-start">
          <div className="w-80"></div>
          <div className="w-80"></div>
        </div>
        <hr className={`my-7 bg-gray-800 h-2`} />
        <div className="flex justify-between items-start">
          <div className="w-80">
            {resumee.mainInfo?.links[0].url !== "" && (
              <div className="mb-4">
                <h1
                  className={`text-[22px] tracking-wider mb-2 font-semibold ${themeColors.textColor}`}
                >
                  SOCIAL MEDIA
                </h1>
                <div className="flex items-start justify-start flex-col">
                  {resumee.mainInfo?.links[0].url !== "" &&
                    resumee.mainInfo?.links.map((link, i) => (
                      <div key={i} className="flex items-center justify-start">
                        {link.name !== "" && (
                          <div className="text-sm ml-2 font-semibold text-gray-900">
                            {link.name}:
                          </div>
                        )}
                        <div>
                          <a
                            className="text-sm ml-2 text-gray-900 w-40"
                            href={link.url}
                          >
                            {link.url}
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
          <div className="w-80">
            {resumee.mainInfo?.phone !== "" && (
              <div className="mb-4">
                <h1
                  className={`text-[22px] tracking-wider mb-2 font-semibold ${themeColors.textColor}`}
                >
                  BASIC INFO
                </h1>
                <div className="flex items-start justify-start flex-col">
                  {resumee.mainInfo?.phone !== "" && (
                    <div className="text-sm ml-2 text-gray-900 w-40">
                      <span className="font-semibold">Number: </span>
                      {resumee.mainInfo?.phone}
                    </div>
                  )}
                  {resumee.mainInfo?.email !== "" && (
                    <div className="text-sm ml-2 text-gray-900 w-40">
                      <span className="font-semibold">Email: </span>
                      {resumee.mainInfo?.email}
                    </div>
                  )}

                  {resumee.mainInfo?.city !== "" && (
                    <div className="text-sm ml-2 text-gray-900 w-40">
                      <span className="font-semibold">City: </span>
                      {resumee.mainInfo?.city}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateTwo;
