// IMPORT REACT STUFF
import React from "react";
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
      <section className="py-14 lg:py-20">
        {features.map((feature, index) => (
          <Feature feature={feature} index={index} key={index} />
          // <div
          //   className="mb-12 lg:mb-16 grid md:grid-cols-2 gap-5 xl:gap-40 lg:place-items-center"
          //   key={index}
          // >
          //   <div
          //     className={` ${
          //       (index + 1) % 2 == 0 ? "md:order-first" : "md:order-last"
          //     }`}
          //   >
          //     <h3
          //       className={`font-medium text-lg mb-2 text-center  text-primary ${
          //         (index + 1) % 2 == 0 ? "lg:text-start" : "lg:text-end"
          //       }`}
          //     >
          //       {feature.smallTitle}
          //     </h3>
          //     <h2
          //       className={`font-bold text-4xl mb-6 text-center text-titleBlack ${
          //         (index + 1) % 2 == 0 ? "lg:text-start" : "lg:text-end"
          //       }`}
          //     >
          //       {feature.title}
          //     </h2>
          //     <p
          //       className={`font-normal mb-6 text-center lg:text-start text-textGray ${
          //         (index + 1) % 2 == 0 ? "lg:text-start" : "lg:text-end"
          //       }`}
          //     >
          //       {feature.description}
          //     </p>
          //   </div>
          //   <Image
          //     src={feature.image}
          //     alt={feature.title}
          //     height={395}
          //     width={580}
          //   />
          // </div>
        ))}
      </section>
    </MainLayout>
  );
};
