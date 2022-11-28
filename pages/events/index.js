import { useLoadScript } from "@react-google-maps/api";
import Map from "../../components/Map/Map";
import Details from "../../components/DetailsPage";
import { useQuery } from "react-query";
const mapPlugins = ["places"];

export const getStaticProps = async () => {
  return { props: { msg: "hello" } };
};

const MapPage = (props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: mapPlugins,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Map />
      <Details />
    </>
  );
};

export default MapPage;
