import "../styles/globals.css";
import type { AppProps } from "next/app";

//IMPORT CONTEXTS
import { MainProvider } from "../context/MainContext";
import { ConfigureProvider } from "../context/ConfigureContext";

// IMPORT REDUX
import { Provider } from "react-redux";
import { store } from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ConfigureProvider>
        <MainProvider>
          <Component {...pageProps} />{" "}
        </MainProvider>
      </ConfigureProvider>
    </Provider>
  );
}

export default MyApp;
