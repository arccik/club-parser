import Event from "../../../models/event-model";
import ProfileDetails from "../../../components/DetailsPage/Details";
import dbConnect from "../../../utils/dbConnect";

const EventById = ({ event }) => {
  return <ProfileDetails data={event} />;
};

export async function getStaticProps({ params }) {
  try {
    await dbConnect();
    const data = await Event.findById(params.id).lean();
    const event = JSON.parse(JSON.stringify(data));
    return { props: { event } };
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
