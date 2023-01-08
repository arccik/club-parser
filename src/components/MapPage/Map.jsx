import { useState, useMemo, useRef, useCallback } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { ActionIcon } from "@mantine/core";
import { IconCurrentLocation } from "@tabler/icons";

import styles from "./Map.module.css";
import Markers from "./Marker/Markes";
import useCurrentLocaiton from "../../Hooks/useCurrentLocaiton";

const Map = () => {
  const [zoom, setZoom] = useState(14);
  const [activeMarker, setActiveMarker] = useState(null);
  const { location: currentLocation } = useCurrentLocaiton();

  const mapRef = useRef();
  const center = useMemo(
    () =>
      currentLocation || { lat: 51.57937620404864, lng: -0.08660418339429162 },
    [currentLocation]
  );
  // mapId: "216185b90ab09587",
  const options = useMemo(
    () => ({
      mapId: "17ded2ca5b1b08df",
      disableDefaultUI: true,
      clickableIcons: false,
      gestureHandling: "greedy",
      panControl: true,
    }),
    []
  );

  const handleCurrentLocationClick = () => {
    mapRef.current.panTo(center);
    mapRef.current.setZoom(18);
  };

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  return (
    <>
      <ActionIcon
        size="lg"
        variant="transparent"
        color="red"
        className={styles.currentLocationButton}
        onClick={handleCurrentLocationClick}
      >
        <IconCurrentLocation size={25} />
      </ActionIcon>
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
          currentLocation={currentLocation}
          center={center}
          mapRef={mapRef}
          setZoom={setZoom}
          active={activeMarker}
          setActive={setActiveMarker}
        />
      </GoogleMap>
    </>
  );
};

export default Map;
