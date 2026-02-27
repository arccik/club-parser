import Head from "next/head";
import { LoadingOverlay, Text, SimpleGrid } from "@mantine/core";
import EventsCardsGrid from "../src/components/HomePage/EventsCardsGrid/EventsCardsGrid";
import Carousel from "../src/components/HomePage/Carousel/Carousel";
import Search from "../src/components/HomePage/Search/Search";
import dbConnect from "../src/utils/dbConnect";
import Event from "../src/models/event-model";
import OldEvents from "../src/components/HomePage/OldEvents/OldEvents";
import GenresBox from "../src/components/HomePage/GenresBox/GenresBox";
import useCurrentLocaiton from "../src/Hooks/useCurrentLocaiton";
import { useGetEventsByLocationQuery } from "../src/features/event/eventSlice";
import Notification from "../src/components/resourses/Notification/Notification";
import Artist from "../src/models/artist-model";
import Venue from "../src/models/venue-model";
import FooterSocial from "../src/components/resourses/Footer/Footer";
import PageShell from "../src/components/resourses/Layout/PageShell";
import SectionHeader from "../src/components/resourses/Layout/SectionHeader";
import { IconBolt, IconClock, IconWorld } from "@tabler/icons";
import StatCard from "../src/components/resourses/Layout/StatCard";
import dynamic from "next/dynamic";

const HeroFallback = () => (
  <section className="relative overflow-hidden border-b border-white/10 bg-[#05070d]">
    <div className="mx-auto min-h-[58vh] w-full max-w-6xl px-4 pb-16 pt-20 sm:px-8 md:min-h-[68vh] md:pt-24">
      <div className="h-6 w-44 animate-pulse rounded-full bg-white/10" />
      <div className="mt-8 h-14 w-full max-w-4xl animate-pulse rounded-2xl bg-white/10" />
      <div className="mt-4 h-14 w-4/5 max-w-3xl animate-pulse rounded-2xl bg-white/10" />
      <div className="mt-8 h-5 w-full max-w-2xl animate-pulse rounded-lg bg-white/10" />
      <div className="mt-3 h-5 w-2/3 max-w-xl animate-pulse rounded-lg bg-white/10" />
    </div>
  </section>
);

const LivingFluidHero = dynamic(
  () => import("../components/ui/living-fluid-hero").then((mod) => mod.LivingFluidHero),
  { ssr: false, loading: () => <HeroFallback /> }
);

export async function getStaticProps() {
  try {
    await dbConnect();
    const today = new Date();
    const endDate = new Date();
    const numberOfDaysToAdd = 7;
    const end = endDate.setDate(endDate.getDate() + numberOfDaysToAdd);

    const events = await Event.find({
      startdate: {
        $gte: today,
        $lt: end,
      },
    })
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
  } catch (error) {
    console.error("Home page static generation error:", error);
    return {
      props: {
        events: [],
        oldEvents: [],
        recommended: [],
      },
      revalidate: 30,
    };
  }
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

  const handleLocation = () => {
    if (!location) getLocation();
  };
  const resolvedEvents = eventsByLocation?.length ? eventsByLocation : events;

  return (
    <>
      <Head>
        <title>Club Chaser - Will help you to find your next event</title>
        <meta
          name="description"
          content="Club Chaser your ultimate guide to the best nightlife and events in the United Kingdom. 
          Whether you're a local or a tourist, our website is the perfect resource for discovering the most exciting bars and clubs across the country."
        />
      </Head>

      <main className="section-stack">
        <LivingFluidHero />

        <div id="content-start">
        <PageShell wide>
          <SectionHeader
            eyebrow="Discover nightlife"
            title="Find your next event in seconds"
            description="Browse events, venues, and artists across the UK. Use smart search, location-aware sorting, and curated picks to plan your next night."
          />
          <SimpleGrid
            cols={3}
            spacing="md"
            breakpoints={[
              { maxWidth: "md", cols: 1 },
              { maxWidth: "lg", cols: 2 },
            ]}
          >
            <StatCard
              label="Edge coverage"
              value="150+ venues"
              hint="Across major UK cities"
              icon={<IconWorld size={18} />}
              color="cyan"
            />
            <StatCard
              label="Fresh updates"
              value="Daily"
              hint="Latest upcoming events"
              icon={<IconClock size={18} />}
              color="grape"
            />
            <StatCard
              label="Quick discovery"
              value="<50s"
              hint="From search to shortlist"
              icon={<IconBolt size={18} />}
              color="yellow"
            />
          </SimpleGrid>
        </PageShell>
        </div>

        <Search />
        {eventError ? (
          <Text align="center" color="red.3" mt="sm">
            Could not load location-based events. Showing featured results.
          </Text>
        ) : null}
        {recommended.length ? <Carousel events={recommended} /> : null}
        <LoadingOverlay visible={isEventsLoading} overlayBlur={2} />

        <EventsCardsGrid events={resolvedEvents} />
        <GenresBox />

        {oldEvents.length ? <OldEvents events={oldEvents} /> : null}
      </main>
      <Notification setAgree={handleLocation} />

      <FooterSocial />
    </>
  );
};
export default Home;
