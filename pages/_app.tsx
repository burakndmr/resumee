import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

// ------------------ REDUX ------------------
import { Provider } from "react-redux";
import { store } from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
        <Head>
            <title>resumee | Create your CV</title>
            <link rel="icon" href="/favicon.ico" />
            <link
                href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@400;600;700&display=swap"
                rel="stylesheet"
            />
        </Head>
      <Component {...pageProps} />
      <Analytics />
    </Provider>
  );
}

export default MyApp;
