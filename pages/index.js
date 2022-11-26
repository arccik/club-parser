import Head from "next/head";
import styles from "../styles/Home.module.css";
import PlacesBox from "../components/CardsGrid/CardsGrid";
import { FooterSocial } from "../components/Footer/Footer";
import { Divider } from "@mantine/core";
import Carousel from "../components/Carousel/Carousel";
import Header from "../components/Header/Header";
import Filter from "../components/Filter/Filter";

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
        <Header />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Filter />
        </div>

        <Carousel />
        <Divider />
        <PlacesBox />
        <Divider />

        <Carousel />
      </main>
      {/* <footer> */}
      <FooterSocial />
      {/* </footer> */}
    </>
  );
}
