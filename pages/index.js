import Head from "next/head";
import PlacesCardsGrid from "../src/components/HomePage/PlacesCardsGrid/PlacesCardsGrid";
import { FooterSocial } from "../src/components/HomePage/Footer/Footer";
import {
  Container,
  Divider,
  Title,
  Loader,
  LoadingOverlay,
} from "@mantine/core";
import Carousel from "../src/components/HomePage/Carousel/Carousel";
import Search from "../src/components/HomePage/Hero/Search/Search";
import Venue from "../src/models/venue-model";
import Event from "../src/models/event-model";
import dbConnect from "../src/utils/dbConnect";
import Hero from "../src/components/HomePage/Hero/Hero";
import OldEvents from "../src/components/HomePage/OldEvents/OldEvents";
import GenresBox from "../src/components/HomePage/GenresBox/GenresBox";
import useCurrentLocaiton from "../src/Hooks/useCurrentLocaiton";
import { useState, useEffect } from "react";
import { useGetEventsByLocationQuery } from "../src/features/event/eventSlice";
import Loading from "../src/utils/Loading/Loading";
import { useGetVenueByLocationQuery } from "../src/features/venue/venueSlice";

export async function getStaticProps() {
  await dbConnect();
  // prettier-ignore
  const events = await Event.find({ startdate: { $gte: new Date() } }).limit(
    10
  );
  const venues = await Venue.find().limit(10);
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
    isLoading: isEventsLoading,
    isError,
    error,
  } = useGetEventsByLocationQuery(location, {
    skip: !location,
  });
  const {
    data: venuesByLocation,
    isLoading: isVenuesLoading,
    error: venueError,
  } = useGetVenueByLocationQuery(location, { skip: !location });

  useEffect(() => {
    if (location) {
      if (eventsByLocation) setEvents(eventsByLocation);
      if (venuesByLocation) setVenues(venuesByLocation);
    }
  }, [location, eventsByLocation, venuesByLocation]);

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
          {events.length ? <Carousel events={events} /> : null}
          <LoadingOverlay
            visible={isEventsLoading || isVenuesLoading}
            overlayBlur={2}
          />
          <PlacesCardsGrid venues={venues} />
          <GenresBox />
          {oldEvents.length ? <OldEvents events={oldEvents} /> : null}
        </Container>
      </main>
      <FooterSocial />
    </>
  );
}
