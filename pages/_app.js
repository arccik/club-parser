import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { ApplicationContainer } from "../components/ApplicationContainer";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
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
  );
}

export default MyApp;
