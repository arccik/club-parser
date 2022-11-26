import Head from "next/head";
import styles from "../styles/Home.module.css";
import PlacesBox from "../components/CardsGrid/CardsGrid";
import { FooterSocial } from "../components/Footer/Footer";
import { Divider } from "@mantine/core";
import Carousel from "../components/Carousel/Carousel";
import Filter from "../components/Filter/Filter";
import Sort from "../components/Sort/Sort";

export default function Home() {
  return (
    <>
      <Head>
        <title className={styles.title}>Next StripRadar</title>
        <meta
          name="description"
          content="Strip Radar - Find your The adventure night "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Filter />
        {/* <Sort /> */}
        <Carousel />
        <Divider />

        <PlacesBox />
        <Divider />

        <Carousel />
        <Divider />
      </main>
      <FooterSocial />
    </>
  );
}
