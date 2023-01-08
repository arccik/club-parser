import Head from "next/head";
import EventsCardsGrid from "../src/components/HomePage/EventsCardsGrid/EventsCardsGrid";
import FooterSocial from "../src/components/HomePage/Footer/Footer";
import { LoadingOverlay, Text } from "@mantine/core";
import Carousel from "../src/components/HomePage/Carousel/Carousel";
import Search from "../src/components/HomePage/Hero/Search/Search";
import dbConnect from "../src/utils/dbConnect";
import Hero from "../src/components/HomePage/Hero/Hero";
import Event from "../src/models/event-model";
import OldEvents from "../src/components/HomePage/OldEvents/OldEvents";
import GenresBox from "../src/components/HomePage/GenresBox/GenresBox";
import useCurrentLocaiton from "../src/Hooks/useCurrentLocaiton";
import { useGetEventsByLocationQuery } from "../src/features/event/eventSlice";
import LoadLocalDialog from "../src/components/HomePage/LoadLocalDigalog/LoadLocalDialog";
import Loading from "../src/utils/Loading/Loading";
import { useLocalStorage } from "@mantine/hooks";
import Artist from "../src/models/artist-model";
import Venue from "../src/models/venue-model";

export async function getStaticProps() {
  await dbConnect();
  const today = new Date();
  const events = await Event.find({ startdate: { $gte: today } })
    .populate({ path: "artists", model: Artist })
    .populate({ path: "venue", model: Venue })
    .limit(10);
  const oldEvents = await Event.find({ startdate: { $lt: today } }).limit(3);

  return {
    props: {
      events: JSON.parse(JSON.stringify(events)),
      oldEvents: JSON.parse(JSON.stringify(oldEvents)),
    },
    revalidate: 30,
  };
}

const Home = ({ events, oldEvents }) => {
  const { location, getLocation } = useCurrentLocaiton();

  const [showLocalLoad, setShowLoadLocal] = useLocalStorage({
    key: "loadLocal",
    defaultValue: true,
  });

  const {
    data: eventsByLocation,
    isLoading: isEventsLoading,
    error: eventError,
  } = useGetEventsByLocationQuery(location, {
    skip: !location,
  });

  if (isEventsLoading) return <Loading />;
  if (eventError)
    return (
      <Text align="center" m="lg">
        Problem on the server
      </Text>
    );

  const handleDialog = () => {
    setShowLoadLocal(false);
    if (!location) getLocation();
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
      <main style={{ padding: 0, margin: 0 }}>
        <Hero />
        <Search />
        {events.length ? <Carousel events={events} /> : null}
        <LoadingOverlay visible={isEventsLoading} overlayBlur={2} />

        <EventsCardsGrid
          events={eventsByLocation?.length ? eventsByLocation : events}
        />

        <GenresBox />
        {oldEvents.length ? <OldEvents events={oldEvents} /> : null}
      </main>
      <LoadLocalDialog setAgree={handleDialog} show={showLocalLoad} />

      <FooterSocial />
    </>
  );
};
export default Home;
