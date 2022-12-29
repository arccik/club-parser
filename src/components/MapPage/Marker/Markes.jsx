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
              icon={{
                path: "M17.684,7.925l-5.131-0.67L10.329,2.57c-0.131-0.275-0.527-0.275-0.658,0L7.447,7.255l-5.131,0.67C2.014,7.964,1.892,8.333,2.113,8.54l3.76,3.568L4.924,17.21c-0.056,0.297,0.261,0.525,0.533,0.379L10,15.109l4.543,2.479c0.273,0.153,0.587-0.089,0.533-0.379l-0.949-5.103l3.76-3.568C18.108,8.333,17.986,7.964,17.684,7.925 M13.481,11.723c-0.089,0.083-0.129,0.205-0.105,0.324l0.848,4.547l-4.047-2.208c-0.055-0.03-0.116-0.045-0.176-0.045s-0.122,0.015-0.176,0.045l-4.047,2.208l0.847-4.547c0.023-0.119-0.016-0.241-0.105-0.324L3.162,8.54L7.74,7.941c0.124-0.016,0.229-0.093,0.282-0.203L10,3.568l1.978,4.17c0.053,0.11,0.158,0.187,0.282,0.203l4.578,0.598L13.481,11.723z",
                fillColor: "red",
                // fillOpacity: 0.9,
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
