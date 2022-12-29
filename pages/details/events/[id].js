import Event from "../../../src/models/event-model";
import Venue from "../../../src/models/venue-model";

import ProfileDetails from "../../../src/components/DetailsPage/Details";
import dbConnect from "../../../src/utils/dbConnect";
import { useLoadScript } from "@react-google-maps/api";
import Loading from "../../../src/utils/Loading/Loading";

const EventById = ({ event, venue }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: [],
  });
  if (!isLoaded) return <Loading />;
  return <ProfileDetails data={event} venue={venue} />;
};

export async function getStaticProps({ params }) {
  try {
    await dbConnect();
    const eventResponse = await Event.findById(params.id);
    if (eventResponse) {
      const venueResponse = await Venue.findById(eventResponse.venue);
      const event = JSON.parse(JSON.stringify(eventResponse));
      const venue = JSON.parse(JSON.stringify(venueResponse));
      return { props: { event, venue }, revalidate: 30 };
    }
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
