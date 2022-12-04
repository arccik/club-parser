import { useLoadScript } from "@react-google-maps/api";
import Map from "../../src/components/Map/Map";
const mapPlugins = ["places"];


const OnlyMapPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: mapPlugins,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Map />
    </>
  );
};

export default OnlyMapPage;
