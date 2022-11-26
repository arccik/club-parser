import { useState, useMemo, useRef, useCallback } from "react";
import { GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api";

import styles from "./Map.module.css";

const Map = () => {
  const [mylocation, setMylocation] = useState(null);
  const mapRef = useRef();
  const center = useMemo(
    () => ({ lat: 51.57937620404864, lng: -0.08660418339429162 }),
    []
  );
  const options = useMemo(
    () => ({
      mapId: "216185b90ab09587",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const handleMarkerClick = (marker) => {
    mapRef.current.panTo(marker);
    setMylocation(true);
  };
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const houses = useMemo(() => generateHouses(center), [center]);
  return (
    <div className={styles.map}>
      <GoogleMap
        zoom={10}
        center={center}
        options={options}
        onLoad={onLoad}
        style={{ zIndex: 0, position: "absolute" }}
        mapContainerClassName={styles.mapContainer}
      >
        <MarkerClusterer>
          {(clusterer) =>
            houses.map((house) => (
              <>
                <Marker
                  clusterer={clusterer}
                  key={house.lat}
                  position={house}
                  icon={{
                    path: "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
                    fillColor: "yellow",
                    fillOpacity: 0.9,
                    scale: 2,
                    strokeColor: "gold",
                    strokeWeight: 2,
                  }}
                  onClick={() => {
                    handleMarkerClick(house);
                  }}
                />
              </>
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    </div>
  );
};

export default Map;

const generateHouses = (position) => {
  const _houses = [];
  for (let i = 0; i < 1000; i++) {
    const direction = Math.random() < 0.9 ? -2 : 2 + Math.random();
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
};
