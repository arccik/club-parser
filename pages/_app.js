import "../src/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { ApplicationContainer } from "../src/components/ApplicationContainer";

import { store } from "../store";
import { Provider } from "react-redux";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { extendedApiSlice } from "../src/features/event/eventSlice";
import Script from "next/script";

store.dispatch(extendedApiSlice.endpoints.getEvents.initiate());

function MyApp({ Component, pageProps }) {
  return (
    <>
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
