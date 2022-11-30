import ProfileDetails from "../../../components/DetailsPage/Details";
import Venue from "../../../models/venue-model";

export async function getServerSideProps({ params }) {
  const id = params.id;
  const venue = await Venue.findById(id);
  return {
    props: {
      venue: JSON.stringify(venue),
    },
  };
}

const MapPage = (props) => {
  const venue = JSON.parse(props.venue);
  return <ProfileDetails data={venue} />;
};

export default MapPage;
