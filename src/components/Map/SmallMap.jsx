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
    () => ({ lat: props.center[0], lng: props.center[1] }),
    [props.center]
  );

  const mapRef = useRef();
  const center = useMemo(
    () => coorinates || { lat: 51.57937620404864, lng: -0.08660418339429162 },
    [coorinates]
  );
  const options = useMemo(
    () => ({
      // mapId: "216185b90ab09587",
      disableDefaultUI: true,
      clickableIcons: false,
      gestureHandling: "greedy",
      panControl: true,
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  if (!isLoaded) return <Loading />;

  return (
    <GoogleMap
      zoom={zoom}
      center={center}
      // onZoomChanged={setZoom}
      options={options}
      onLoad={onLoad}
      // onClick={() => setActiveMarker(null)}
      mapContainerClassName={styles.newMap}
    >
      <Marker
        position={{ lat: props.center[0], lng: props.center[1] }}
        // icon={{
        //   path: "M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468zM6.848.613a1.39 1.39 0 0 1 2.304 0l4.56 6.468a1.61 1.61 0 0 1 0 1.838l-4.56 6.468a1.39 1.39 0 0 1-2.304 0L2.288 8.92a1.61 1.61 0 0 1 0-1.838L6.848.613z",
        //   fillColor: "grey",
        //   fillOpacity: 0.9,
        //   scale: 2,
        //   strokeColor: "red",
        //   strokeWeight: 1,
        // }}
        // onClick={(marker) => {
        //   handleMarkerClick(house.location);
        // }}
      />
    </GoogleMap>
  );
};

export default SmallMap;
