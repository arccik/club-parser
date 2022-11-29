import { Container } from "@mantine/core";
import Venue from "../../models/venue-model";
import EditDetails from "../../components/AdminPage/EditDetails";
import TableSelection from "../../components/AdminPage/PostList";

export async function getStaticProps({ params }) {
  console.log("params", params);
  const venue = await Venue.find().limit(10);
  return { props: { data: JSON.stringify(venue), rest: " params" } };
}

export default function Admin(props) {
  const data = JSON.parse(props.data);
  return (
    <Container>
      <h1> Adminka</h1>
      <TableSelection data={data} />
      <EditDetails data={data} />
    </Container>
  );
}
