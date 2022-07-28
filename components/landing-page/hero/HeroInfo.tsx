// IMPORT REACT STUFF
import React from "react";
import Link from "next/link";

interface HeroInfoProps {}

export const HeroInfo: React.FC<HeroInfoProps> = () => {
  return (
    <div className="font-montSerrat py-20 flex flex-col sm:flex-row items-center justify-around ">
      <div className="text-center mb-7 sm:mb-0">
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
      </div>
      <div className="text-center">
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
      </div>
    </div>
  );
};
