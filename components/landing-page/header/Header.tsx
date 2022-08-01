// REACT STUFF
import React from "react";
import Link from "next/link";
import Image from "next/image";

// COMPONENTS
import { Button } from "../button/Button";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <header className="pt-5 md:pt-12">
      <nav className="flex justify-between items-center ">
        <div className="font-extrabold text-4xl">
          <Link href="/">
            <a>
              <Image src="/logo.svg" alt="logo" height={50} width={177} />
            </a>
          </Link>
        </div>
        <Button>
          <Link href="/app">
            <a className="text-white m-7 hidden sm:inline">Get Started</a>
          </Link>
        </Button>
      </nav>
    </header>
  );
};
