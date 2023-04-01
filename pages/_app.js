import "../src/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { ApplicationContainer } from "../src/components/resourses/ApplicationContainer";

import { Provider } from "react-redux";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Script from "next/script";
import Head from "next/head";
import { store } from "../src/features/store";


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico?v=2" />
        <meta
          name="viewport"
          content="user-scalable=no, width=device-width, initial-scale=1.0"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-ZF6QWP4051"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "G-ZF6QWP4051");
        `}
      </Script>
      <UserProvider>
        <Provider store={store}>
          <MantineProvider
            theme={{ colorScheme: "dark" }}
            withGlobalStyles
            withNormalizeCSS
          >
            <ApplicationContainer>
              <Component {...pageProps} />
            </ApplicationContainer>
          </MantineProvider>
        </Provider>
      </UserProvider>
    </>
  );
}

export default MyApp;
