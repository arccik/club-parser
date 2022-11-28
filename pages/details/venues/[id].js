import { useLoadScript } from "@react-google-maps/api";
import fetcher from "../../../utils/fetcher";
import ProfileDetails from "../../../components/DetailsPage/Details";
const mapPlugins = ["places"];

export async function getStaticPaths() {
  const data = await fetcher(`http://localhost:3000/api/venues`);
  const paths = data.map((item) => {
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
  const data = await fetcher(`http://localhost:3000/api/venues/${id}`);
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
