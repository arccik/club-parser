import Head from "next/head";
import PlacesCardsGrid from "../src/components/PlacesCardsGrid/PlacesCardsGrid";
import { FooterSocial } from "../src/components/Footer/Footer";
import { Container, Divider, Title } from "@mantine/core";
import Carousel from "../src/components/Carousel/Carousel";
import Search from "../src/components/Hero/Search/Search";
import Venue from "../src/models/venue-model";
import Event from "../src/models/event-model";
import dbConnect from "../src/utils/dbConnect";
import Hero from "../src/components/Hero/Hero";
import OldEvents from "../src/components/OldEvents/OldEvents";
import GenresBox from "../src/components/Home/GenresBox/GenresBox";
import useCurrentLocaiton from "../src/Hooks/useCurrentLocaiton";
import { useState, useEffect } from "react";
import { useGetEventsByLocationQuery } from "../src/features/event/eventSlice";
import Loading from "../src/utils/Loading/Loading";
import { useGetVenueByLocationQuery } from "../src/features/venue/venueSlice";

export async function getStaticProps() {
  await dbConnect();
  // prettier-ignore
  const events = await Event.find({ startdate: { $gte: new Date() } }).limit(30);
  const venues = await Venue.find().limit(30);
  // prettier-ignore
  const oldEvents = await Event.find({ startdate: { $lt: new Date() } }).limit(3);

  return {
    props: {
      events: JSON.stringify(events),
      venues: JSON.stringify(venues),
      oldEvents: JSON.stringify(oldEvents),
    },
    revalidate: 30,
  };
}

export default function Home(props) {
  const [events, setEvents] = useState(JSON.parse(props.events));
  const [venues, setVenues] = useState(JSON.parse(props.venues));
  const oldEvents = JSON.parse(props.oldEvents);
  const location = useCurrentLocaiton();
  const {
    data: eventsByLocation,
    isLoading,
    isError,
    error,
  } = useGetEventsByLocationQuery(location, {
    skip: !location,
  });
  const {
    data: venuesByLocation,
    isLoading: isVenueLoading,
    error: venueError,
  } = useGetVenueByLocationQuery(location, { skip: !location });

  useEffect(() => {
    if (location) {
      if (eventsByLocation) setEvents(eventsByLocation);
      if (venuesByLocation) setVenues(venuesByLocation);
    }
  }, [location, eventsByLocation, venuesByLocation]);

  if (isLoading || isVenueLoading) return <Loading />;
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
        <Container px={0}>
          {events?.length && <Carousel events={events} />}
          <PlacesCardsGrid venues={venues} />
          <GenresBox />
          <OldEvents events={oldEvents} />
          {/* {venues.length > 4 && <PlacesCardsGrid venues={venues.splice(4, 10)} />} */}
          {/* {events.length > 10 && <Carousel events={events.splice(10, 20)} />} */}
        </Container>
      </main>
      <FooterSocial />
    </>
  );
}
