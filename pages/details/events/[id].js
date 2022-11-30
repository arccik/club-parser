import Event from "../../../models/event-model";
import ProfileDetails from "../../../components/DetailsPage/Details";

export async function getServerSideProps({ params }) {
  const id = params.id;
  const event = await Event.findById(id);
  return {
    props: {
      event: JSON.stringify(event),
    },
  };
}

const MapPage = (props) => {
  const event = JSON.parse(props.event);
  return <ProfileDetails data={event} />;
};

export default MapPage;
