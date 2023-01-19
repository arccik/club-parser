import { useState } from "react";
import Cookies from "js-cookie";

const useCurrentLocation = () => {
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);

  var inFiveMinutes = new Date(new Date().getTime() + 5 * 60 * 1000);
  const coords = Cookies.get("location");

  function getLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    if (coords) {
      setLocation(JSON.parse(coords));
    } else {
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
    }
  }
  return { location, error, getLocation };
};

export default useCurrentLocation;
