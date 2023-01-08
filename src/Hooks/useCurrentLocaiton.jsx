import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useCurrentLocation = () => {
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);

  var inFiveMinutes = new Date(new Date().getTime() + 5 * 60 * 1000);
  const coords = Cookies.get("location");

  useEffect(() => {
    if (!location && !coords) getLocation();
    if (!location && coords) setLocation(JSON.parse(coords));
  }, []);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        Cookies.set("location", JSON.stringify(coordinates), {
          expires: inFiveMinutes,
        });
        setLocation(coordinates);
      },
      (error) => {
        setError(error.message);
        setLocation(null);
      }
    );
  };
  return { location, error, getLocation };
};

export default useCurrentLocation;
