import { useState, useMemo, useRef, useCallback } from "react";
import { GoogleMap } from "@react-google-maps/api";

import styles from "./Map.module.css";
import MapNavBar from "../MapNavBar/MapNavBar";
import Markers from "../../components/Map/Marker/Markes";

const Map = () => {
  const [zoom, setZoom] = useState(10);
  const [activeMarker, setActiveMarker] = useState(null);

  const mapRef = useRef();
  const center = useMemo(
    () => ({ lat: 51.57937620404864, lng: -0.08660418339429162 }),
    []
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
    <div className={styles.map}>
      <GoogleMap
        zoom={zoom}
        center={center}
        // onZoomChanged={setZoom}
        options={options}
        onLoad={onLoad}
        onClick={() => setActiveMarker(null)}
        mapContainerClassName={styles.mapContainer}
      >
        <Markers
          center={center}
          mapRef={mapRef}
          setZoom={setZoom}
          active={activeMarker}
          setActive={setActiveMarker}
        />
      </GoogleMap>
      <MapNavBar />
    </div>
  );
};

export default Map;
