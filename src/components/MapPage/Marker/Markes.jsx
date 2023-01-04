import { Marker, MarkerClusterer, InfoWindow } from "@react-google-maps/api";
import MapPopUp from "./MapPopUp";
import { useGetMarkersQuery } from "../../../features/marker/markerSlice";
import { useState } from "react";
import MapNavBar from "../MapNavBar/MapNavBar";

const Markes = ({ center, mapRef, active, setActive, currentLocation }) => {
  const [state, setState] = useState("venues");
  const { data: markers, error, isLoading } = useGetMarkersQuery(state);
  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <p>Error check console {console.error({ error })}</p>;

  const handleMarkerClick = (marker) => {
    const coords = { lat: marker.coordinates[1], lng: marker.coordinates[0] };
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
      lat: coordinates[1],
      lng: coordinates[0],
    };
  };
  return (
    <>
      <MapNavBar handleClick={setState} />
      <Marker
        icon={{
          url: "assets/current-location-icon.png",
        }}
        position={currentLocation}
        onClick={() => mapRef.current.panTo(currentLocation)}
      ></Marker>

      <MarkerClusterer>
        {(clusterer) =>
          markers &&
          markers.map((house) => (
            <Marker
              clusterer={clusterer}
              key={house._id}
              position={getPosition(house.location.coordinates)}
              icon={
                house.placeType === "venue"
                  ? "/assets/venue-icon.png"
                  : "/assets/event-icon.png"
                // : {
                //     path: "M13 11H17V17H13V11ZM14.5 12.5V15.5H15.5V12.5H14.5Z M7 11H11V17H7V11ZM8.5 12.5V15.5H9.5V12.5H8.5Z M20 20V5H17V3H15.5V5H8.5V3H7V5H4V20H20ZM5.5 6.5V8H18.5V6.5H5.5ZM18.5 9.5H5.5V18.5H18.5V9.5Z",
                //     // scale: 1.2,
                //     strokeColor: "blue",
                //     strokeWeight: 1,
                //   }
              }
              onClick={(marker) => {
                handleMarkerClick(house.location);
              }}
            >
              {active?.lat === house.location.coordinates[1] ? (
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
