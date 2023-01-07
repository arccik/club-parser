import { useState, useEffect } from "react";
import { useLocalStorage } from "@mantine/hooks";
import Cookies from "js-cookie";

const useCurrentLocation = () => {
  // const [location, setLocation] = useLocalStorage({
  //   key: "location",
  //   defaultValue: null,
  // });
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);

  var inFiveMinutes = new Date(new Date().getTime() + 5 * 60 * 1000);
  const coords = Cookies.get("location");

  useEffect(() => {
    if (!location && !coords) getLocation();
    if (!location && coords) setLocation(JSON.parse(coords));
  });

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        Cookies.set(
          "location",
          JSON.stringify({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
          { expires: inFiveMinutes }
        );
      },
      (error) => {
        setError(error.message);
      }
    );
  };
  return [location, error, getLocation];
};

export default useCurrentLocation;
