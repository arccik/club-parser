import { Marker, MarkerClusterer, InfoWindow } from "@react-google-maps/api";
import MapPopUp from "./MapPopUp";
import { useGetMarkersQuery } from "../../../features/marker/markerSlice";
import Loading from "../../../utils/Loading/Loading";

const Markes = ({ mapRef, active, setActive, currentLocation }) => {
  const { data: markers, error, isLoading } = useGetMarkersQuery("venues");
  if (isLoading) return <Loading />;
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
      {currentLocation && (
        <Marker
          icon={{
            url: "assets/current-location-icon.png",
          }}
          position={currentLocation}
          onClick={() => mapRef.current.panTo(currentLocation)}
        ></Marker>
      )}
      <MarkerClusterer minimumClusterSize={4}>
        {(clusterer) =>
          markers &&
          markers.map((house) => (
            <Marker
              clusterer={clusterer}
              key={house._id}
              position={getPosition(house.location.coordinates)}
              icon="/assets/venue-icon.png"
              onClick={() => {
                handleMarkerClick(house.location);
              }}
            >
              {active?.lat === house.location.coordinates[1] ? (
                <InfoWindow onCloseClick={() => setActive(null)}>
                  <MapPopUp data={house} />
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
