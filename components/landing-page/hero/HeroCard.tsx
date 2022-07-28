// IMPORT NEXT STUFF
import React from "react";
import Link from "next/link";

// IMPORT COMPONENTS
import { Button } from "../button/Button";

interface HeroCardProps {}

export const HeroCard: React.FC<HeroCardProps> = ({}) => {
  return (
    <div className="w-full bg-cardGray flex flex-col sm:flex-row sm:gap-5 justify-between items-center p-8 lg:py-3 rounded-2xl mt-11 lg:mt-0 lg:mb-8 xl:mb-0 drop-shadow-lg md:col-span-2 lg:col-span-1">
      <p className="sm:w-2/3 text-2xl mb-2 sm:mb-0 font-semibold flex-1 text-center sm:text-start">
        Lets create a new CV with our CV Builder
      </p>
      <Button>
        <Link href="/app">
          <a className="text-white p-5 ">Quick Start</a>
        </Link>
      </Button>
    </div>
  );
};
