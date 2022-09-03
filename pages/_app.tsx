import "../styles/globals.css";
import type { AppProps } from "next/app";

//IMPORT CONTEXTS
import { MainProvider } from "../context/MainContext";
import { ConfigureProvider } from "../context/ConfigureContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigureProvider>
      <MainProvider>
        <Component {...pageProps} />{" "}
      </MainProvider>
    </ConfigureProvider>
  );
}

export default MyApp;
