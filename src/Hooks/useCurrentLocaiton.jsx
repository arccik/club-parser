import { useState, useEffect } from "react";
import { useLocalStorage } from "@mantine/hooks";

const useCurrentLocation = () => {
  const [location, setLocation] = useLocalStorage({
    key: "location",
    defaultValue: null,
  });

  const [error, setError] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        setError(error.message);
      }
    );
  };


  return [location, error, getLocation];
};

export default useCurrentLocation;
