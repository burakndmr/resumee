// IMPORT REACT STUFF
import React from "react";
import Image from "next/image";
import Link from "next/link";

// IMPORT LAYOUT
import { MainLayout } from "../layout/MainLayout";

// IMPORT COMPONENTS
//

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="bg-titleBlack pt-5 md:pt-20 text-white ">
      <MainLayout>
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center pb-10">
          <Link href="/">
            <a className="mb-5 md:justify-self-start ">
              <Image src="/logo.svg" alt="logo" height={50} width={130} />
            </a>
          </Link>

          <div className="flex flex-col sm:flex-row md:items-start justify-center gap-10 md:flex-1">
            <div className="flex flex-col items-center justify-center">
              <h4 className="font-semibold">RESOURCES</h4>
              <Link href="https://www.untitledui.com/">
                <a className="hover:underline">Untitled UI</a>
              </Link>
              <Link href="https://www.figma.com/community/file/1098100460677441788">
                <a className="hover:underline">Landing Page</a>
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h4 className="font-semibold">FOLLOW ME</h4>
              <Link href="https://www.youtube.com/c/burakdemiryt">
                <a className="hover:underline">Youtube</a>
              </Link>
              <Link href="https://github.com/burakndmr">
                <a className="hover:underline">Github</a>
              </Link>
              <Link href="https://twitter.com/burakdmr09">
                <a className="hover:underline">Twitter</a>
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
      <div className="py-10 border-t-2 border-textGray">
        <MainLayout>
          <div className="flex flex-col gap-5  sm:flex-row items-center justify-between">
            <p className="text-textGray">© 2022 Hakkım helal olsun</p>
            <div className="flex items-center justify-center gap-5">
              <Link href="https://github.com/burakndmr">
                <a>
                  <Image src="/landingPage/github.svg" height={24} width={24} />
                </a>
              </Link>
              <Link href="https://www.instagram.com/burak.dmrr00/">
                <a>
                  <Image
                    src="/landingPage/instagram.svg"
                    height={24}
                    width={24}
                  />
                </a>
              </Link>
              <Link href="https://twitter.com/burakdmr09">
                <a>
                  <Image
                    src="/landingPage/twitter.svg"
                    height={24}
                    width={24}
                  />
                </a>
              </Link>
              <Link href="https://www.youtube.com/c/burakdemiryt">
                <a>
                  <Image
                    src="/landingPage/youtube.svg"
                    height={24}
                    width={24}
                  />
                </a>
              </Link>
              <Link href="https://tr.linkedin.com/in/burak-demir-8a5410189">
                <a>
                  <Image
                    src="/landingPage/linkedin.svg"
                    height={24}
                    width={24}
                  />
                </a>
              </Link>
            </div>
          </div>
        </MainLayout>
      </div>
    </footer>
  );
};
