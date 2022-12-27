import { useEffect, useState } from "react";
import { useLocalStorage } from "@mantine/hooks";

const useCurrentLocaiton = () => {
  const [location, setLocation] = useState();
  const [storeValue, setStoreValue] = useLocalStorage({
    key: "location",
    defaultValue: null,
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    if (storeValue?.length) {
      setLocation(storeValue);
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const result = { lat: coords.latitude, lng: coords.longitude };
        setLocation(result);
        setStoreValue(result);
      });
    } else {
      setLocation(null);
      setStoreValue("");
    }
  }, []);

  return location;
};

export default useCurrentLocaiton;
