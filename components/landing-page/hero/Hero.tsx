import React from "react";
import Image from "next/image";
import { HeroCard } from "./HeroCard";
import { HeroInfo } from "./HeroInfo";

interface HeroProps {}

export const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <>
      <section>
        <div className="grid md:grid-cols-2 lg:gap-x-4 h-[calc(100vh-150px)] sm:h-auto">
          <h1 className="text-4xl md:text-7xl text-center md:text-start font-bold mt-6 md:mt-14 md:mt-30 xl:mt-44 ">
            Build your cv for new job
          </h1>

          <div className="mt-10 mx-6 md:mx-0 row-span-2">
            <Image
              src="/landingPage/heroMainPhoto.svg"
              alt="hero"
              height={545}
              width={730}
            />
          </div>
          <HeroCard />
        </div>
        <HeroInfo />
      </section>
    </>
  );
};
