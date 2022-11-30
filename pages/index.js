import Head from "next/head";
import PlacesCardsGrid from "../components/CardsGrid/CardsGrid";
import { FooterSocial } from "../components/Footer/Footer";
import { Divider } from "@mantine/core";
import Carousel from "../components/Carousel/Carousel";
import Search from "../components/Search/Search";
import Venue from "../models/venue-model";
import Event from "../models/event-model";
import connectMongo from "../utils/mongodbConnect";
import { useState } from "react";

export async function getStaticProps() {
  await connectMongo();
  const events = await Event.find().limit(30);
  const venues = await Venue.find().limit(30);

  return {
    props: { events: JSON.stringify(events), venues: JSON.stringify(venues) },
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

      <main>
        <Search
          setSeach={handleSearch}
          eventsData={filtredEvents}
          venuesData={filtredVenues}
        />
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
