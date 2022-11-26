import { useLoadScript } from "@react-google-maps/api";
import Map from "../../components/Map/Map";
import ProfileDetails from "../../components/ProfilePage/ProfileDetails";
const mapPlugins = ["places"];

const MapPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: mapPlugins,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Map />
      <ProfileDetails />
    </>
  );
};

export default MapPage;
