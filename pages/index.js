import Head from "next/head";
import PlacesCardsGrid from "../components/CardsGrid/CardsGrid";
import { FooterSocial } from "../components/Footer/Footer";
import { Divider } from "@mantine/core";
import Carousel from "../components/Carousel/Carousel";
import Sort from "../components/Sort/Sort";
import Venue from "../models/venue-model";
import Event from "../models/event-model";
import connectMongo from "../utils/mongodbConnect";

export async function getStaticProps() {
  await connectMongo();
  const events = await Event.find().limit(30);
  const venues = await Venue.find().limit(30);

  return {
    props: { events: JSON.stringify(events), venues: JSON.stringify(venues) },
  };
}

export default function Home(props) {
  const venues = JSON.parse(props.venues);
  const events = JSON.parse(props.events);
  return (
    <>
      <Head>
        <title>Strip Radar - Find night adventure</title>
        <meta name="description" content="Strip Radar - Find night adventure" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Sort />

        <Carousel events={events.splice(0, 10)} />
        <Divider />

        <PlacesCardsGrid venues={venues.splice(0, 4)} />

        <Carousel events={events.splice(10, 20)} />

        <PlacesCardsGrid venues={venues.splice(4, 10)} />
      </main>
      <FooterSocial />
    </>
  );
}
