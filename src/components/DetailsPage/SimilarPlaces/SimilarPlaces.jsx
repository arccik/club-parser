import { Loader, Title } from "@mantine/core";
import { useGetNearByPlacesQuery } from "../../../features/both/bothSlice";
import SimilarCard from "./Card/Card";
import { Carousel } from "@mantine/carousel";

const SimilarPlaces = ({ coords, id }) => {
  const { data, isLoading, error } = useGetNearByPlacesQuery(coords);
  if (isLoading) return <Loader />;
  if (error) return <p>No Similar Found</p>;

  const cards = data?.map((place) => {
    if (place._id === id) return null;
    return (
      <SimilarCard
        key={place._id}
        open={place.open}
        close={place.close}
        title={place.name}
        image={place.image}
        distance={place.distance}
        link={`/details/${place.placeType}s/${place._id}`}
      />
    );
  });
  return (
    <>
      <Title order={4}>Places Near By</Title>
      <Carousel dragFree slideGap="lg" height={200} initialSlide={1}>
        {cards}
      </Carousel>
    </>
  );
};

export default SimilarPlaces;
