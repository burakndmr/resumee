import React from "react";
import Image from "next/image";
import { HeroCard } from "./HeroCard";
import { HeroInfo } from "./HeroInfo";

interface HeroProps {}
// TODO HERO SECTION DUZENLE
// TODO SVGLERI ADAM ET

export const Hero: React.FC<HeroProps> = ({}) => {
  return (
    <section className="flex flex-col ">
      <div className="flex justify-between items-start">
        <div className="flex items-center flex-1 flex-col ">
          <h1 className="text-7xl font-bold mt-44">
            Build your cv for new job
          </h1>
          <HeroCard />
        </div>
        <div className="mt-12">
          <Image
            src="/landingPage/heroMainPhoto.svg"
            alt="hero"
            height={545}
            width={730}
          />
        </div>
      </div>
      <HeroInfo />
    </section>
  );
};
