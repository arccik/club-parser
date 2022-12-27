import { Loader, Title } from "@mantine/core";
import { useGetNearByPlacesQuery } from "../../../features/both/bothSlice";
import SimilarCard from "./Card/Card";
import { Carousel } from "@mantine/carousel";

const SimilarPlaces = ({ coords, type }) => {
  const { data, isLoading, error } = useGetNearByPlacesQuery(coords);
  console.log("SimilarPlaces  ", data);
  if (isLoading) return <Loader />;
  if (error) return <p>No Similar Found</p>;

  const cards = data?.map((place) => (
    <SimilarCard
      key={place._id}
      open={place.open}
      close={place.close}
      title={place.name}
      image={place.image}
      distance={place.distance}
      link={`/details/${place.placeType}s/${place._id}`}
    />
  ));
  return (
    <>
      <Title>Places Near By</Title>
      <Carousel
        dragFree
        slideSize="50%"
        slideGap="lg"
        height={250}
        initialSlide={2}
      >
        {cards}
      </Carousel>
    </>
  );
};

export default SimilarPlaces;
