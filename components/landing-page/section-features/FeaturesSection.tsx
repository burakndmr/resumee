import React, { useEffect } from "react";
import Image from "next/image";

//IMPORT PACKAGES
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

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
      icon: "/landingPage/lightningLogo.svg",
    },
    {
      title: "Fast CV Builder",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nisi fuga vel! Ea alias corporis voluptas corrupti, excepturi dolorem deleniti!",
      icon: "/landingPage/notAccountLogo.svg",
    },
    {
      title: "Fast CV Builder",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nisi fuga vel! Ea alias corporis voluptas corrupti, excepturi dolorem deleniti!",
      icon: "/landingPage/saveAndDownloadLogo.svg",
    },
  ];

  const animation = useAnimation();
  const titleAnimation = useAnimation();

  const [ref, InView] = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const [titleRef, titleInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (InView) {
      animation.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      });
    } else {
      animation.start({
        opacity: 0,
        y: 20,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      });
    }
  }, [InView]);

  useEffect(() => {
    if (titleInView) {
      titleAnimation.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      });
    } else {
      titleAnimation.start({
        opacity: 0,
        y: 20,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      });
    }
  }, [titleInView]);

  return (
    <section className="py-28 bg-sectionBg text-center">
      <MainLayout>
        <motion.h3
          animate={titleAnimation}
          ref={titleRef}
          className="tracking-widest font-bold text-xl sm:text-2xl text-clearPurple"
        >
          OUR FEATURES
        </motion.h3>
        <motion.h1
          animate={titleAnimation}
          ref={titleRef}
          className="mb-20 font-bold text-3xl mx-2 sm:text-4xl sm:mx-0  text-titleBlack leading-10 "
        >
          CREATE CV, RESUME AND BLA BLA
        </motion.h1>
        <motion.div
          animate={animation}
          ref={ref}
          className="flex flex-col  md:flex-row md:flex-wrap gap-4 justify-evenly items-center"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col justify-between items-center w-73 mb-4 lg:mb-0 shadow-lg bg-white rounded-lg p-8 "
            >
              <div className=" flex items-center justify-center bg-imageYellow text-white rounded-full w-24 h-24 mb-12 shadow-md">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  height={45}
                  width={45}
                />
              </div>
              <h3 className="font-semibold text-xl mb-4">{feature.title}</h3>
              <p className="text-sm font-normal text-textGray">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </MainLayout>
    </section>
  );
};
