import { Marker, MarkerClusterer, InfoWindow } from "@react-google-maps/api";
import { IconHandRock } from "@tabler/icons";
import { useMemo, useEffect, useState } from "react";
import formatLocations from "../../../utils/formatLocations";
import { Image } from "@mantine/core";
import MapPopUp from "./MapPopUp";
import { useGetMarkersQuery } from "../../../services/events";

const Markes = ({ center, mapRef, active, setActive }) => {
  const [markers, setMarkers] = useState();
  const { data, error, isLoading } = useGetMarkersQuery();
  const fetchData = async () => {
    const response = await fetch(`http://localhost:3000/api/markers`).then(
      (res) => res.json()
    );
    const locations = formatLocations(response);
    setMarkers(locations);
  };

  useEffect(() => {
    fetchData();
  }, []);
  //   const houses = useMemo(() => generateHouses(center), [center]);

  const handleMarkerClick = (marker) => {
    mapRef.current.panTo(marker);
    mapRef.current.setZoom(18);
    handleActiveMarker(marker);
  };

  const handleActiveMarker = (marker) => {
    if (marker === active) {
      return;
    }
    setActive(marker);
  };

  const getPosition = (coordinates) => {
    return {
      lat: coordinates[0],
      lng: coordinates[1],
    };
  };
  return (
    <MarkerClusterer>
      {(clusterer) =>
        markers &&
        markers.map((house) => (
          <Marker
            clusterer={clusterer}
            key={house._id}
            position={house.position}
            icon={{
              path: "M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468zM6.848.613a1.39 1.39 0 0 1 2.304 0l4.56 6.468a1.61 1.61 0 0 1 0 1.838l-4.56 6.468a1.39 1.39 0 0 1-2.304 0L2.288 8.92a1.61 1.61 0 0 1 0-1.838L6.848.613z",
              fillColor: "grey",
              fillOpacity: 0.9,
              scale: 2,
              strokeColor: "red",
              strokeWeight: 1,
            }}
            onClick={(marker) => {
              handleMarkerClick(house.position);
            }}
          >
            {active === house.position ? (
              <InfoWindow onCloseClick={() => setActive(null)}>
                <>
                  <MapPopUp data={house} />
                </>
              </InfoWindow>
            ) : null}
          </Marker>
        ))
      }
    </MarkerClusterer>
  );
};

export default Markes;
