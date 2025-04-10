// IMPORT REACT STUFF
// ------------------ NEXT - REACT ------------------
import { useEffect, useState } from "react";
import Head from "next/head";

// ------------------ TYPESCRIPT ------------------
import type { NextPage } from "next";

// ------------------ REACT INTERSECTION OBSERVER - FRAMER MOTION ------------------
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

// ------------------ COMPONENTS ------------------
import { MainLayout } from "../components/landing-page/layout/MainLayout";
import { Header } from "../components/landing-page/header/Header";
import { FeaturesSection } from "../components/landing-page/section-features/FeaturesSection";
import { Hero } from "../components/landing-page/hero/Hero";
import { FeaturesInfoSection } from "../components/landing-page/section-features-info/FeaturesInfoSection";
import { Footer } from "../components/landing-page/footer/Footer";
import NewVersion from "../components/new/new";

const Home: NextPage = () => {
  return (
    <div>
      {/* <MainLayout>
        <Header />
        <Hero />
      </MainLayout>
      <FeaturesSection />
      <FeaturesInfoSection />
      <Footer /> */}
      <NewVersion />
    </div>
  );
};

export default Home;
