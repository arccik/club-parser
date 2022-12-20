import { useState, useMemo, useRef, useCallback } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import styles from "./Map.module.css";
import MapNavBar from "../MapNavBar/MapNavBar";
import Markers from "../../components/Map/Marker/Markes";
import useCurrentLocaiton from "../../Hooks/useCurrentLocaiton";

const Map = () => {
  const [zoom, setZoom] = useState(14);
  const [activeMarker, setActiveMarker] = useState(null);
  const location = useCurrentLocaiton();

  const mapRef = useRef();
  const center = useMemo(
    () => location || { lat: 51.57937620404864, lng: -0.08660418339429162 },
    [location]
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

  return (
    <GoogleMap
      zoom={zoom}
      center={center}
      // onZoomChanged={setZoom}
      options={options}
      onLoad={onLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerClassName={styles.mapContainer}
    >
      <Marker
        icon={{
          url: "http://maps.google.com/mapfiles/kml/pal4/icon17.png",
        }}
        position={location}
      ></Marker>
      <Markers
        center={center}
        mapRef={mapRef}
        setZoom={setZoom}
        active={activeMarker}
        setActive={setActiveMarker}
      />
    </GoogleMap>
  );
};

export default Map;
