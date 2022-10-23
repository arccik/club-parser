import MainContent from "../src/components/layouts/Main/MainContent";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

const theme = createTheme();

export default function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainContent />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
