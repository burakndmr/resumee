// IMPORT REACT STUFF
import React, { useEffect } from "react";
import Link from "next/link";

// IMPORT PACKAGES
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

interface HeroInfoProps {}

export const HeroInfo: React.FC<HeroInfoProps> = () => {
  const animation = useAnimation();

  const [firstRef, firstInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [secondRef, secondInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (firstInView) {
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
        y: -100,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      });
    }
  }, [firstInView]);

  useEffect(() => {
    if (secondInView) {
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
        y: -100,
        transition: {
          duration: 0.5,

          ease: "easeInOut",
        },
      });
    }
  }, [secondInView]);

  return (
    <div className="font-montSerrat py-20 flex flex-col sm:flex-row items-center justify-around ">
      <motion.div
        animate={animation}
        ref={firstRef}
        className="text-center opacity-0 mb-7 sm:mb-0"
      >
        <h3 className="text-xl font-semibold">
          Create a CV in{" "}
          <span className="text-primary underline font-bold">minutes</span>
        </h3>
        <p className="mt-4 mb-6 max-w-xs">
          You can create a CV with own CV Builder within minutes.
        </p>
        <Link href="/">
          <a className="text-primary underline font-bold ">view more</a>
        </Link>
      </motion.div>
      <motion.div
        animate={animation}
        ref={secondRef}
        className="text-center opacity-0"
      >
        <h3 className="text-xl font-semibold">
          You {"don't"} need{" "}
          <span className="text-primary underline font-bold">an account</span>
        </h3>
        <p className="mt-4 mb-6 max-w-xs">
          You can create a CV and download it without an account.
        </p>
        <Link href="/">
          <a className="text-primary underline font-bold ">view more</a>
        </Link>
      </motion.div>
    </div>
  );
};
