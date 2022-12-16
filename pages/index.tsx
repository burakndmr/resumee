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

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>resumee | Create your CV</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <MainLayout>
        <Header />
        <Hero />
      </MainLayout>
      <FeaturesSection />
      <FeaturesInfoSection />
      <Footer />
    </div>
  );
};

export default Home;
