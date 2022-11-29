import { Container } from "@mantine/core";
import Venue from "../../../models/venue-model";

export async function getStaticProps({ params }) {
  const findVenueById = await Venue.findById(params.id);
  return {
    props: {
      venue: findVenueById ? findVenueById : {},
    },
  };
}
export async function getStaticPaths() {
  const venues = await Venue.find().select("_id");
  const paths = venues.map((venue) => {
    return {
      params: {
        id: venue._id.toString(),
      },
    };
  });
  return { paths, fallback: true };
}

export default function EditPage(venue) {
  return (
    <Container>
      <h1>Edit Post</h1>
    </Container>
  );
}
