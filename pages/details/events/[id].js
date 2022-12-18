import Event from "../../../src/models/event-model";
import ProfileDetails from "../../../src/components/DetailsPage/Details";
import dbConnect from "../../../src/utils/dbConnect";
import { useLoadScript } from "@react-google-maps/api";
import Loading from "../../../src/utils/Loading/Loading";

const EventById = ({ event }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: [],
  });
  if (!isLoaded) return <Loading />;
  return <ProfileDetails data={event} />;
};

export async function getStaticProps({ params }) {
  try {
    await dbConnect();
    const data = await Event.findById(params.id).lean();
    const event = JSON.parse(JSON.stringify(data));
    return { props: { event }, revalidate: 30 };
  } catch (error) {
    console.error("event fetching error: ", error);
    return error;
  }
}

export async function getStaticPaths() {
  await dbConnect();
  const events = await Event.find().lean();
  const paths = events.map((event) => ({
    params: { id: event._id.toString() },
  }));
  return { paths, fallback: false };
}

export default EventById;
