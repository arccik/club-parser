import ProfileDetails from "../../../src/components/DetailsPage/Details";
import Venue from "../../../src/models/venue-model";
import { useRouter } from "next/router";
import dbConnect from "../../../src/utils/dbConnect";

const VenuePage = ({ venue }) => {
  const router = useRouter();
  if (router.isFallback) <div>Loading...</div>;

  return <ProfileDetails data={venue} />;
};

export async function getStaticProps({ params }) {
  try {
    await dbConnect();
    const data = await Venue.findById(params.id);
    const venue = JSON.parse(JSON.stringify(data));
    return { props: { venue }, revalidate: 30 };
  } catch (error) {
    console.error("Static Generation Error", error);
  }
}

export async function getStaticPaths() {
  await dbConnect();
  const venues = await Venue.find().distinct("_id");
  const paths = venues.map((venue) => ({
    params: { id: venue._id.toString() },
  }));
  return { paths, fallback: false };
}

export default VenuePage;
