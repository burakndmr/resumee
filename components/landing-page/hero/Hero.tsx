import React from "react";
import Image from "next/image";
import { HeroCard } from "./HeroCard";
import { HeroInfo } from "./HeroInfo";

interface HeroProps {}

// TODO FOR RESPONSIVE => DELETE NAV BTN
// TODO FOR RESPONSIVE => re-design quickstart section
// TODO FOR RESPONSIVE => add responsive to description section

export const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <>
      <section className="">
        <div className="grid md:grid-cols-2 lg:gap-x-4">
          <h1 className="text-6xl md:text-7xl text-center md:text-start font-bold  mt-14 md:mt-30 xl:mt-44 ">
            Build your cv for new job
          </h1>

          <div className="mt-12 row-span-2">
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
