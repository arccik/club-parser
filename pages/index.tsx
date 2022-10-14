import { createContext } from "react";

import MainContent from "../components/layouts/Main/MainContent";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";
import IEvent from "../interfaces/event";

export async function getStaticProps() {
  const { data } = await axios.get("http://localhost:3000/api/data");
  return {
    props: {
      data,
    },
  };
}

export const AppContext = createContext<IEvent[]>([]);

const theme = createTheme();

export default function Index({ data }: { data: IEvent[] }) {
  return (
    <AppContext.Provider value={data}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainContent />
      </ThemeProvider>
    </AppContext.Provider>
  );
}
