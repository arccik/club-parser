import { useLoadScript } from "@react-google-maps/api";
import Map from "../../src/components/MapPage/Map";
import { useEffect } from "react";
import useCurrentLocation from "../../src/Hooks/useCurrentLocaiton";

const mapPlugins = ["places"];

const OnlyMapPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: mapPlugins,
  });

  const { getLocation } = useCurrentLocation();

  useEffect(() => {
    getLocation();
  }, []);
  if (!isLoaded) return <div>Loading...</div>;

  return <Map />;
};

export default OnlyMapPage;
