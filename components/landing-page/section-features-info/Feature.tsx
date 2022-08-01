// IMPORT REACT
import React from "react";
import Image from "next/image";

// TYPES
interface FeatureProps {
  feature: {
    smallTitle: string;
    title: string;
    description: string;
    image: string;
  };
  index: number;
}

export const Feature: React.FC<FeatureProps> = ({ feature, index }) => {
  const evenNumber: boolean = index % 2 == 0;

  return (
    <div
      className="mb-12 lg:mb-16 grid md:grid-cols-2 gap-5 xl:gap-40 lg:place-items-center"
      key={index}
    >
      <div className={` ${evenNumber ? "md:order-first" : "md:order-last"}`}>
        <h3
          className={`font-medium text-lg mb-2 text-center  text-primary ${
            evenNumber ? "lg:text-start" : "lg:text-end"
          }`}
        >
          {feature.smallTitle}
        </h3>
        <h2
          className={`font-bold text-4xl mb-6 text-center text-titleBlack ${
            evenNumber ? "lg:text-start" : "lg:text-end"
          }`}
        >
          {feature.title}
        </h2>
        <p
          className={`font-normal mb-6 text-center lg:text-start text-textGray ${
            evenNumber ? "lg:text-start" : "lg:text-end"
          }`}
        >
          {feature.description}
        </p>
      </div>
      <Image src={feature.image} alt={feature.title} height={395} width={580} />
    </div>
  );
};
