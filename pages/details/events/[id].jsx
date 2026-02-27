import Event from "../../../src/models/event-model";
import DetailsPage from "../../../src/components/DetailsPage/Details";
import dbConnect from "../../../src/utils/dbConnect";
import { useLoadScript } from "@react-google-maps/api";
import Loading from "../../../src/utils/Loading/Loading";
import Venue from "../../../src/models/venue-model";
import Artist from "../../../src/models/artist-model";

const EventById = ({ event }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: "",
  });
  if (!isLoaded) return <Loading />;

  return <DetailsPage data={event} />;
};

export async function getStaticProps({ params }) {
  try {
    await dbConnect();
    const preEvent = await Event.findById(params.id);
    await Venue.populate(preEvent, {
      path: "venue",
      model: Venue,
    });

    await Artist.populate(preEvent, {
      path: "artists",
      model: Artist,
    });
    const event = JSON.parse(JSON.stringify(preEvent));

    return { props: { event }, revalidate: 30 };
  } catch (error) {
    console.error("event fetching error: ", error);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  try {
    await dbConnect();
    const events = await Event.find().lean();
    const paths = events.map((event) => ({
      params: { id: event._id.toString() },
    }));
    return { paths, fallback: "blocking" };
  } catch (error) {
    console.error("Event paths generation error:", error);
    return { paths: [], fallback: "blocking" };
  }
}

export default EventById;
