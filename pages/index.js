import Head from "next/head";
import PlacesCardsGrid from "../src/components/CardsGrid/CardsGrid";
import { FooterSocial } from "../src/components/Footer/Footer";
import { Divider } from "@mantine/core";
import Carousel from "../src/components/Carousel/Carousel";
import Search from "../src/components/Search/Search";
import Venue from "../src/models/venue-model";
import Event from "../src/models/event-model";
import dbConnect from "../src/utils/dbConnect";
import { useState } from "react";
import Hero from "../src/components/Hero/Hero";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [filtredEvents, setFiltredEvents] = useState(JSON.parse(props.events));
  const [filtredVenues, setFiltredVenues] = useState(JSON.parse(props.venues));

  const handleSearch = (value) => {
    const data = [...filtredEvents, ...filtredVenues].filter((item) =>
      item.toString().includes(value)
    );
    setFiltredEvents(data);
  };
  return (
    <>
      <Head>
        <title>Strip Radar - Find night adventure</title>
        <meta name="description" content="Strip Radar - Find night adventure" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />

      <main>
        {/* <Search
          setSeach={handleSearch}
          eventsData={filtredEvents}
          venuesData={filtredVenues}
        /> */}
        {filtredEvents.length > 10 && (
          <Carousel events={filtredEvents.splice(10, 20)} />
        )}

        <Divider />

        <PlacesCardsGrid venues={filtredVenues.splice(0, 4)} />

        <Carousel events={filtredEvents.splice(0, 10)} />

        {filtredVenues.length > 4 && (
          <PlacesCardsGrid venues={filtredVenues.splice(4, 10)} />
        )}
      </main>
      <FooterSocial />
    </>
  );
}
