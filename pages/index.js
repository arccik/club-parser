import Head from "next/head";
import PlacesCardsGrid from "../src/components/HomePage/PlacesCardsGrid/PlacesCardsGrid";
import { FooterSocial } from "../src/components/HomePage/Footer/Footer";
import { Container, LoadingOverlay } from "@mantine/core";
import Carousel from "../src/components/HomePage/Carousel/Carousel";
import Search from "../src/components/HomePage/Hero/Search/Search";
import Venue from "../src/models/venue-model";
import Event from "../src/models/event-model";
import dbConnect from "../src/utils/dbConnect";
import Hero from "../src/components/HomePage/Hero/Hero";
import OldEvents from "../src/components/HomePage/OldEvents/OldEvents";
import GenresBox from "../src/components/HomePage/GenresBox/GenresBox";
import useCurrentLocaiton from "../src/Hooks/useCurrentLocaiton";
import { useGetEventsByLocationQuery } from "../src/features/event/eventSlice";
import { useGetVenueByLocationQuery } from "../src/features/venue/venueSlice";
import LoadLocalDialog from "../src/components/HomePage/LoadLocalDigalog/LoadLocalDialog";
import Loading from "../src/utils/Loading/Loading";
import { useLocalStorage } from "@mantine/hooks";

export async function getStaticProps() {
  await dbConnect();
  // prettier-ignore
  const events = await Event.find({ startdate: { $gte: new Date() } }).limit(
    10
  );
  const venues = await Venue.find().limit(10);
  // prettier-ignore
  const oldEvents = await Event.find().sort({ startdate: -1 }).limit(3);

  return {
    props: {
      events: JSON.parse(JSON.stringify(events)),
      venues: JSON.parse(JSON.stringify(venues)),
      oldEvents: JSON.parse(JSON.stringify(oldEvents)),
    },
    revalidate: 30,
  };
}

export default function Home({ events, venues, oldEvents }) {
  const location = useCurrentLocaiton();
  const [showLocalLoad, setLoadLocal] = useLocalStorage({
    key: "loadLocal",
    defaultValue: true,
  });
  const {
    data: eventsByLocation,
    isLoading: isEventsLoading,
    error: eventError,
  } = useGetEventsByLocationQuery(location, {
    skip: !location || showLocalLoad,
  });
  const {
    data: venuesByLocation,
    isLoading: isVenuesLoading,
    error: venueError,
  } = useGetVenueByLocationQuery(location, {
    skip: !location || showLocalLoad,
  });

  if (isVenuesLoading || isEventsLoading) return <Loading />;
  if (eventError && venueError) return <p> Cannot fetch data</p>;

  const handleDialog = () => {
    setLoadLocal(false);
  };
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
      <LoadLocalDialog setAgree={handleDialog} show={showLocalLoad} />
      <Hero />
      <Search />
      <main>
        <Container px={0}>
          {events.length ? (
            <Carousel events={eventsByLocation || events} />
          ) : null}
          <LoadingOverlay
            visible={isEventsLoading || isVenuesLoading}
            overlayBlur={2}
          />
          <PlacesCardsGrid venues={venuesByLocation || venues} />
          <GenresBox />
          {oldEvents.length ? <OldEvents events={oldEvents} /> : null}
        </Container>
      </main>
      <FooterSocial />
    </>
  );
}
