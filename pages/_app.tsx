import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

// ------------------ REDUX ------------------
import { Provider } from "react-redux";
import { store } from "../redux/store";

import { Flowbite } from "flowbite-react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Flowbite
        theme={{
          theme: {
            // card: {
            //   children:
            //     "flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col p-8",
            // },
            tab: {
              tablist: {
                tabitem: {
                  styles: {
                    underline: {
                      active: {
                        on: "text-primary border-b-2 border-primary",
                      },
                    },
                  },
                },
              },
            },
          },
        }}
      >
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} />
      </Flowbite>
    </Provider>
  );
}

export default MyApp;
