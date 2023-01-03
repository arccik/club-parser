import "../src/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { ApplicationContainer } from "../src/components/ApplicationContainer";

import { store } from "../store";
import { Provider } from "react-redux";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { extendedApiSlice } from "../src/features/event/eventSlice";

store.dispatch(extendedApiSlice.endpoints.getEvents.initiate());

function MyApp({ Component, pageProps }) {
  return (
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
  );
}

export default MyApp;
