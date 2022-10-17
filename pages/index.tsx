import { createContext } from "react";

import MainContent from "../src/components/layouts/Main/MainContent";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import axios from "axios";
import IEvent from "../src/interfaces/event";
import formatDistance from "date-fns/formatDistance";

export async function getStaticProps() {
  const { data } = await axios.get("http://localhost:3000/api/data");
  data.map((club: IEvent, i: number) => {
    return (club.date = formatDistance(new Date(club.date), new Date(), {
      addSuffix: true,
    }));
  });
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
