// REACT STUFF
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// IMPORT PACKAGES
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

import { auth } from "../../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Card } from "flowbite-react";
import { getImageSize } from "next/dist/server/image-optimizer";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const [user, loading] = useAuthState(auth);
  const animation = useAnimation();

  const [headerRef, headerInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (headerInView) {
      animation.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
          ease: "easeInOut",
        },
      });
    } else {
      animation.start({
        opacity: 0,
        y: -10,
        transition: {
          duration: 1,
          ease: "easeInOut",
        },
      });
    }
  }, [headerInView]);

  return (
    <motion.header
      ref={headerRef}
      animate={animation}
      className="pt-5 md:pt-12"
    >
      <nav className="flex justify-between items-center">
        <motion.div
          ref={headerRef}
          animate={animation}
          className="font-extrabold opacity-0 text-4xl"
        >
          <Link href="/">
            <a>
              <Image src="/logo.svg" alt="logo" height={50} width={177} />
            </a>
          </Link>
        </motion.div>
        {!user ? (
          <motion.div ref={headerRef} animate={animation} className="opacity-0">
            <Link href="/auth/Login">
              <a className="text-gray-500 font-medium text-lg primary-btn px-3">
                Login
              </a>
            </Link>
          </motion.div>
        ) : (
          <Link href="/auth/Profile">
            <div className="flex items-center justify-center gap-4">
              <h1>{user.displayName}</h1>
              {user.photoURL !== null ? (
                <img className="rounded-full w-16" src={user.photoURL} />
              ) : null}
            </div>
          </Link>
        )}
      </nav>
    </motion.header>
  );
};
