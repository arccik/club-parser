import { Marker, MarkerClusterer, InfoWindow } from "@react-google-maps/api";
import MapPopUp from "./MapPopUp";
import { useGetMarkersQuery } from "../../../features/marker/markerSlice";
import { useState } from "react";
import MapNavBar from "../../MapNavBar/MapNavBar";

const Markes = ({ center, mapRef, active, setActive }) => {
  const [state, setState] = useState("venues");
  const { data: markers, error, isLoading } = useGetMarkersQuery(state);
  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <p>Error check console {console.error({ error })}</p>;

  const handleMarkerClick = (marker) => {
    const coords = { lat: marker.coordinates[0], lng: marker.coordinates[1] };
    mapRef.current.panTo(coords);
    mapRef.current.setZoom(18);
    handleActiveMarker(coords);
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
    <>
      <MapNavBar handleClick={setState} />

      <MarkerClusterer>
        {(clusterer) =>
          markers &&
          markers.map((house) => (
            <Marker
              clusterer={clusterer}
              key={house._id}
              position={getPosition(house.location.coordinates)}
              icon={{
                // path: "M8.384 1.226a.463.463 0 0 0-.768 0l-4.56 6.468a.537.537 0 0 0 0 .612l4.56 6.469a.463.463 0 0 0 .768 0l4.56-6.469a.537.537 0 0 0 0-.612l-4.56-6.468zM6.848.613a1.39 1.39 0 0 1 2.304 0l4.56 6.468a1.61 1.61 0 0 1 0 1.838l-4.56 6.468a1.39 1.39 0 0 1-2.304 0L2.288 8.92a1.61 1.61 0 0 1 0-1.838L6.848.613z",
                fillColor: "grey",
                fillOpacity: 0.9,
                scale: 1.2,
                strokeColor: "red",
                strokeWeight: 1,
              }}
              onClick={(marker) => {
                handleMarkerClick(house.location);
              }}
            >
              {active?.lat === house.location.coordinates[0] ? (
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
    </>
  );
};

export default Markes;