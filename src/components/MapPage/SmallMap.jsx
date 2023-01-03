import { useState, useMemo, useRef, useCallback } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import styles from "./Map.module.css";
import { useLoadScript } from "@react-google-maps/api";
import Loading from "../../utils/Loading/Loading";

const SmallMap = (props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const [zoom, setZoom] = useState(15);
  // const [activeMarker, setActiveMarker] = useState(null);

  const coorinates = useMemo(
    () => ({ lng: props.center[0], lat: props.center[1] }),
    [props.center]
  );

  const mapRef = useRef();
  const center = useMemo(
    () => coorinates || { lat: 51.57937620404864, lng: -0.08660418339429162 },
    [coorinates]
  );
  const options = useMemo(
    () => ({
      disableDefaultUI: false,
      clickableIcons: false,

      mapTypeControl: false,
      gestureHandling: "none",
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  if (!isLoaded) return <Loading />;

  return (
    <GoogleMap
      zoom={zoom}
      center={center}
      options={options}
      onLoad={onLoad}
      mapContainerClassName={styles.newMap}
    >
      <Marker position={{ lng: props.center[0], lat: props.center[1] }} />
    </GoogleMap>
  );
};

export default SmallMap;
