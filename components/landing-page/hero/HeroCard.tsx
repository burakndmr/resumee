// IMPORT NEXT STUFF
import React from "react";
import Link from "next/link";

// IMPORT COMPONENTS
import { Button } from "../button/Button";

interface HeroCardProps {}

export const HeroCard: React.FC<HeroCardProps> = ({}) => {
  return (
    <div className="w-full bg-cardGray flex justify-between items-center p-8 rounded-2xl mt-11 drop-shadow-lg">
      <p className="w-2/3 text-2xl font-semibold flex-1  ">
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
