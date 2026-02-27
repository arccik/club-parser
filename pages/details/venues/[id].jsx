import DetailsPage from "../../../src/components/DetailsPage/Details";
import Venue from "../../../src/models/venue-model";
import { useRouter } from "next/router";
import dbConnect from "../../../src/utils/dbConnect";

const VenuePage = ({ venue }) => {
  const router = useRouter();
  if (router.isFallback) return <div>Loading...</div>;

  return <DetailsPage data={venue} />;
};

export async function getStaticProps({ params }) {
  try {
    await dbConnect();
    const data = await Venue.findById(params.id);
    const venue = JSON.parse(JSON.stringify(data));
    return { props: { venue }, revalidate: 30 };
  } catch (error) {
    console.error("Static Generation Error", error);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  try {
    await dbConnect();
    const venues = await Venue.find().distinct("_id");
    const paths = venues.map((venue) => ({
      params: { id: venue._id.toString() },
    }));
    return { paths, fallback: "blocking" };
  } catch (error) {
    console.error("Venue paths generation error:", error);
    return { paths: [], fallback: "blocking" };
  }
}

export default VenuePage;
