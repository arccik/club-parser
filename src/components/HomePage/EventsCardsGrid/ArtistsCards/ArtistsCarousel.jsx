import { Carousel } from "@mantine/carousel";

import Artist from "./Artist";

const ArtistsCards = ({ artists }) => {
  if (!artists) return null;
  const slides = artists.map((item) => (
    <Carousel.Slide key={item._id} gap="xs" style={{ cursor: "pointer" }}>
      <Artist {...item} />
    </Carousel.Slide>
  ));
  return (
    <>
      <Carousel
        sx={{ maxHeight: 500 }}
        // withIndicators
        dragFree
        withControls={false}
        slideSize="25%"
        align="start"
      >
        {slides}
      </Carousel>
    </>
  );
};

export default ArtistsCards;
