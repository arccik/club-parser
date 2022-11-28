import { useLoadScript } from "@react-google-maps/api";
import ProfileDetails from "../../../components/DetailsPage/Details";
import fetcher from "../../../utils/fetcher";
const mapPlugins = ["places"];

export async function getStaticPaths() {
  const vanuePaths = await fetcher(`http://localhost:3000/api/venues`);
  const eventPaths = await fetcher(`http://localhost:3000/api/venues`);
  const paths = [...eventPaths, ...vanuePaths].map((item) => {
    return {
      params: {
        id: item._id,
      },
    };
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const id = params.id;
  const data = await fetcher(`http://localhost:3000/api/events/${id}`);
  return {
    props: {
      data,
    },
  };
}

const MapPage = ({ data }) => {
  return (
    <>
      <ProfileDetails data={data} />
    </>
  );
};

export default MapPage;
