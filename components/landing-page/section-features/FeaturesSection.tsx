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
      icon: "icon-fast-cv-builder",
    },
    {
      title: "Fast CV Builder",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nisi fuga vel! Ea alias corporis voluptas corrupti, excepturi dolorem deleniti!",
      icon: "icon-fast-cv-builder",
    },
    {
      title: "Fast CV Builder",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nisi fuga vel! Ea alias corporis voluptas corrupti, excepturi dolorem deleniti!",
      icon: "icon-fast-cv-builder",
    },
  ];
  return (
    <section className="py-28 bg-sectionBg text-center">
      <MainLayout>
        <h3 className="tracking-widest font-bold text-2xl text-clearPurple">
          OUR FEATURES
        </h3>
        <h1 className="mb-20 font-bold text-4xl text-titleBlack leading-10">
          CREATE CV, RESUME AND BLA BLA
        </h1>
        <div className="flex justify-evenly items-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center w-73 shadow-lg bg-white rounded-lg p-8 "
            >
              <div className="flex items-center justify-center bg-yellow text-white rounded-full">
                {feature.icon}
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
