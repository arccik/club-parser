import "../src/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { ApplicationContainer } from "../src/components/ApplicationContainer";
import { QueryClient, QueryClientProvider } from "react-query";

import { store } from "../src/store/store";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorSchema: "light" }}
        >
          <ApplicationContainer>
            <Component {...pageProps} />
          </ApplicationContainer>
        </MantineProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
