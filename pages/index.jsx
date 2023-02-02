import Head from "next/head";
import { LoadingOverlay, Text } from "@mantine/core";
import EventsCardsGrid from "../src/components/HomePage/EventsCardsGrid/EventsCardsGrid";
import Carousel from "../src/components/HomePage/Carousel/Carousel";
import Search from "../src/components/HomePage/Search/Search";
import dbConnect from "../src/utils/dbConnect";
import Hero from "../src/components/HomePage/Hero/Hero";
import Event from "../src/models/event-model";
import OldEvents from "../src/components/HomePage/OldEvents/OldEvents";
import GenresBox from "../src/components/HomePage/GenresBox/GenresBox";
import useCurrentLocaiton from "../src/Hooks/useCurrentLocaiton";
import { useGetEventsByLocationQuery } from "../src/features/event/eventSlice";
import Notification from "../src/components/resourses/Notification/Notification";
import Loading from "../src/utils/Loading/Loading";
import Artist from "../src/models/artist-model";
import Venue from "../src/models/venue-model";
import FooterSocial from "../src/components/resourses/Footer/Footer";

export async function getStaticProps() {
  await dbConnect();
  const today = new Date();
  const events = await Event.find({ startdate: { $gte: today } })
    .populate({ path: "artists", model: Artist })
    .populate({ path: "venue", model: Venue })
    .limit(10);
  const oldEvents = await Event.find({
    startdate: { $lt: today.setDate(today.getDate()) },
  })
    .sort({ startdate: -1 })
    .limit(3);

  const recommended = await Event.find({
    startdate: { $gte: new Date() },
    price: { $exists: true, $nin: ["", "-"] },
    "artists.0": { $exists: true },
  })
    .sort({ startdate: 1 })
    .limit(10);

  return {
    props: {
      events: JSON.parse(JSON.stringify(events)),
      oldEvents: JSON.parse(JSON.stringify(oldEvents)),
      recommended: JSON.parse(JSON.stringify(recommended)),
    },
    revalidate: 30,
  };
}

const Home = ({ events, oldEvents, recommended }) => {
  const { location, getLocation } = useCurrentLocaiton();

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

  const handleLocation = () => {
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
      </Head>

      <main style={{ padding: 0, margin: 0 }}>
        <Hero />
        <Search />
        {recommended.length ? <Carousel events={recommended} /> : null}
        <LoadingOverlay visible={isEventsLoading} overlayBlur={2} />

        <EventsCardsGrid
          events={eventsByLocation?.length ? eventsByLocation : events}
        />
        <GenresBox />

        {oldEvents.length ? <OldEvents events={oldEvents} /> : null}
      </main>
      <Notification setAgree={handleLocation} />

      <FooterSocial />
    </>
  );
};
export default Home;
