import Head from "next/head";
import PlacesCardsGrid from "../src/components/PlacesCardsGrid/PlacesCardsGrid";
import { FooterSocial } from "../src/components/Footer/Footer";
import { Divider, Title } from "@mantine/core";
import Carousel from "../src/components/Carousel/Carousel";
import Search from "../src/components/Hero/Search/Search";
import Venue from "../src/models/venue-model";
import Event from "../src/models/event-model";
import dbConnect from "../src/utils/dbConnect";
import Hero from "../src/components/Hero/Hero";
import OldEvents from "../src/components/OldEvents/OldEvents";

export async function getStaticProps() {
  await dbConnect();
  const events = await Event.find().limit(30);
  const venues = await Venue.find().limit(30);

  return {
    props: { events: JSON.stringify(events), venues: JSON.stringify(venues) },
    revalidate: 30,
  };
}

export default function Home(props) {
  const events = JSON.parse(props.events);
  const venues = JSON.parse(props.venues);

  return (
    <>
      <Head>
        <title>Strip Radar - Events all over the globe</title>
        <meta
          name="description"
          content="Strip Radar - Events all over the globe"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>
      <Hero />
      <Search />
      <main>
        {events.length && <Carousel events={events} />}

        <Divider />

        <PlacesCardsGrid venues={venues.splice(0, 4)} />

        {events.length > 2 && <Carousel events={events.splice(0, 10)} />}

        <OldEvents />

        {venues.length > 4 && <PlacesCardsGrid venues={venues.splice(4, 10)} />}
      </main>
      <FooterSocial />
    </>
  );
}
