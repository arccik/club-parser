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
    const venue = await Venue.findById(params.id).lean();
    venue._id = venue._id.toString();
    return { props: { venue } };
  } catch (error) {
    console.error("Static Generation Error", error);
  }
}

export async function getStaticPaths() {
  await dbConnect();
  const venues = await Venue.find();
  const paths = venues.map((venue) => ({
    params: { id: venue._id.toString() },
  }));
  return { paths, fallback: false };
}

export default VenuePage;
