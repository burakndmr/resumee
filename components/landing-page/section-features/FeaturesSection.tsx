import React from "react";

// IMPORT LAYOUT
import { MainLayout } from "../layout/MainLayout";

interface FeaturesSectionProps {}

export const FeaturesSection: React.FC<FeaturesSectionProps> = () => {
  interface Feature {
    title: string;
    description: string;
    icon: string;
  }

  const features: Feature[] = [
    {
      title: "Fast CV Builder",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nisi fuga vel! Ea alias corporis voluptas corrupti, excepturi dolorem deleniti!",
      icon: "./landingPage/lightningLogo.svg",
    },
    {
      title: "Fast CV Builder",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nisi fuga vel! Ea alias corporis voluptas corrupti, excepturi dolorem deleniti!",
      icon: "./landingPage/notAccountLogo.svg",
    },
    {
      title: "Fast CV Builder",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nisi fuga vel! Ea alias corporis voluptas corrupti, excepturi dolorem deleniti!",
      icon: "./landingPage/saveAndDownloadLogo.svg",
    },
  ];
  return (
    <section className="py-28 bg-sectionBg text-center">
      <MainLayout>
        <h3 className="tracking-widest font-bold text-xl sm:text-2xl text-clearPurple">
          OUR FEATURES
        </h3>
        <h1 className="mb-20 font-bold text-3xl mx-2 sm:text-4xl sm:mx-0  text-titleBlack leading-10 ">
          CREATE CV, RESUME AND BLA BLA
        </h1>
        <div className="flex flex-col  md:flex-row md:flex-wrap gap-4 justify-evenly items-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center w-73 mb-4 lg:mb-0 shadow-lg bg-white rounded-lg p-8 "
            >
              <div className=" flex items-center justify-center bg-yellow text-white rounded-full w-24 h-24 mb-12 shadow-md">
                <img src={feature.icon} alt={feature.title} />
              </div>
              <h3 className="font-semibold text-xl mb-4">{feature.title}</h3>
              <p className="text-sm font-normal text-textGray">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </MainLayout>
    </section>
  );
};
