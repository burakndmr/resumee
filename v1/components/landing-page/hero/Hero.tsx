//IMPORT REACT
import React, { useEffect } from "react";
import Image from "next/image";

//IMPORT PACKAGES
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

// IMPORT COMPONENTS
import { HeroCard } from "./HeroCard";
import { HeroInfo } from "./HeroInfo";

interface HeroProps {}

export const Hero: React.FC<HeroProps> = ({}) => {
  const h1Animation = useAnimation();
  const imageAnimation = useAnimation();

  const [h1Ref, h1InView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [imageRef, imageInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (h1InView) {
      h1Animation.start({
        opacity: 1,
        x: 0,
        transition: {
          duration: 1,
          ease: "easeInOut",
        },
      });
    } else {
      h1Animation.start({
        opacity: 0,
        x: -50,
        transition: {
          duration: 1,
          ease: "easeInOut",
        },
      });
    }
  }, [h1InView]);

  useEffect(() => {
    if (imageInView) {
      imageAnimation.start({
        opacity: 1,
        x: 0,
        transition: {
          duration: 1,
          ease: "easeInOut",
        },
      });
    } else {
      imageAnimation.start({
        opacity: 0,
        x: 10,

        transition: {
          duration: 1.5,
          ease: "easeInOut",
        },
      });
    }
  }, [imageInView]);

  return (
    <section>
      <div className="grid md:grid-cols-2 lg:gap-x-16 h-[calc(100vh-150px)] sm:h-auto">
        <motion.h1
          animate={h1Animation}
          ref={h1Ref}
          className="text-4xl opacity-0 md:text-7xl text-center md:text-start font-bold mt-6 md:mt-14 md:mt-30 xl:mt-44 "
        >
          Build your cv for new job
        </motion.h1>

        <motion.div
          animate={imageAnimation}
          ref={imageRef}
          className="mt-10 opacity-0 mx-6 md:mx-0 row-span-2"
        >
          <Image
            src="/landingPage/heroMainPhoto.svg"
            alt="hero"
            height={545}
            width={730}
            loading="lazy"
          />
        </motion.div>
        <HeroCard />
      </div>
      <HeroInfo />
    </section>
  );
};
