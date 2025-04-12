// IMPORT REACT STUFF
import React, { useEffect } from "react";
import Image from "next/image";

// IMPORT LAYOUT
import { MainLayout } from "../layout/MainLayout";
import { Feature } from "./Feature";

interface FeaturesInfoSectionProps {}

export const FeaturesInfoSection: React.FC<FeaturesInfoSectionProps> = () => {
  interface Feature {
    smallTitle: string;
    title: string;
    description: string;
    image: string;
  }

  const features: Feature[] = [
    {
      smallTitle: "WHY CHOOSE US",
      title: "Lorem ipsum dolor sit amet.",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, eligendi quod similique consequatur ea amet vitae dolorem obcaecati nobis maxime aliquid assumenda eum debitis magnam ullam quibusdam. Tempora, sapiente cumque.",
      image: "/landingPage/whyChoose1.svg",
    },
    {
      smallTitle: "WHY CHOOSE US",
      title: "Lorem ipsum dolor sit amet.",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, eligendi quod similique consequatur ea amet vitae dolorem obcaecati nobis maxime aliquid assumenda eum debitis magnam ullam quibusdam. Tempora, sapiente cumque.",
      image: "/landingPage/whyChoose2.svg",
    },
  ];

  return (
    <MainLayout>
      <section className="py-14 lg:py-20 ">
        {features.map((feature, index) => (
          <Feature feature={feature} index={index} key={index} />
        ))}
      </section>
    </MainLayout>
  );
};
