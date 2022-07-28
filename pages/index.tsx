// IMPORT REACT STUFF
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

// IMPORT TYPES
import type { NextPage } from "next";

// IMPORT COMPONENTS
import { MainLayout } from "../components/landing-page/layout/MainLayout";
import { Header } from "../components/landing-page/header/Header";
import { FeaturesSection } from "../components/landing-page/section-features/FeaturesSection";
import { Hero } from "../components/landing-page/hero/Hero";

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
    </div>
  );
};

export default Home;
