// IMPORT REACT
import React, { useEffect } from "react";
import Image from "next/image";

// IMPORT PACKAGES
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

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

  const animation = useAnimation();

  const [ref, InView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (InView) {
      animation.start({
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      });
    } else if (!InView && evenNumber) {
      animation.start({
        opacity: 0,
        x: 10,
        transition: {
          duration: 1.5,
          ease: "easeInOut",
        },
      });
    } else {
      animation.start({
        opacity: 0,
        x: -10,
        transition: {
          duration: 1.5,
          ease: "easeOut",
        },
      });
    }
  }, [InView]);

  return (
    <motion.div
      className="mb-12 lg:mb-16 grid md:grid-cols-2 gap-5 xl:gap-40 lg:place-items-center"
      key={index}
      animate={animation}
      ref={ref}
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
      <Image
        src={feature.image}
        alt={feature.title}
        height={395}
        width={580}
        loading="lazy"
      />
    </motion.div>
  );
};
