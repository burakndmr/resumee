// IMPORT NEXT STUFF
import React, { useEffect } from "react";
import Link from "next/link";

// IMPORT PACKAGES
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

// IMPORT COMPONENTS
import { Button } from "../button/Button";

interface HeroCardProps {}

export const HeroCard: React.FC<HeroCardProps> = ({}) => {
  const animation = useAnimation();

  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
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
        y: 100,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      });
    }
  }, [inView]);

  return (
    <motion.div
      animate={animation}
      ref={ref}
      className="w-full opacity-0 bg-cardGray flex flex-col sm:flex-row sm:gap-5 justify-start items-center p-8 lg:py-3 rounded-2xl mt-5 md:mt-11 lg:mt-0 lg:mb-8 xl:mb-0 drop-shadow-lg md:col-span-2 lg:col-span-1"
    >
      <p className="sm:w-2/3 text-[#333] leading-5 text-lg sm:text-2xl mb-4 sm:mb-0 font-semibold flex-1 text-center sm:text-start">
        Lets create a new CV with our CV Builder
      </p>

      <Button>
        <Link href="/app/dashboard">
          <a className="text-white text-lg font-semibold p-5">Create CV</a>
        </Link>
      </Button>
    </motion.div>
  );
};
