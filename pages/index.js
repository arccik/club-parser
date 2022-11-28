import Head from "next/head";
import styles from "../styles/Home.module.css";
import PlacesBox from "../components/CardsGrid/CardsGrid";
import { FooterSocial } from "../components/Footer/Footer";
import { Divider } from "@mantine/core";
import Carousel from "../components/Carousel/Carousel";
import Filter from "../components/Filter/Filter";
import Sort from "../components/Sort/Sort";
import fetcher from "../utils/fetcher";

export async function getStaticProps() {
  const events = await fetcher("http://localhost:3000/api/events");
  const venues = await fetcher("http://localhost:3000/api/venues");
  return { props: { events, venues } };
}

export default function Home({ events, venues }) {
  return (
    <>
      <Head>
        <title className={styles.title}>
          Strip Radar - Find night adventure{" "}
        </title>
        <meta name="description" content="Strip Radar - Find night adventure" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Filter />
        {/* <Sort /> */}
        <Carousel events={events} />
        <Divider />

        <PlacesBox venues={venues} />

        <Carousel events={events} />
        <Divider />
      </main>
      <FooterSocial />
    </>
  );
}
