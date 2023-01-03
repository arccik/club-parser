import { Carousel } from "@mantine/carousel";
import { Title, Text } from "@mantine/core";

import Artist from "./Artist";

const ArtistsCards = ({ artists }) => {
  if (!artists) return null;
  const slides = artists.map((item) => (
    <Carousel.Slide key={item._id} gap="xs">
      <Artist {...item} />
    </Carousel.Slide>
  ));
  return (
    <>
      <Carousel
        sx={{ maxWidth: 300 }}
        mx="auto"
        // withIndicators
        dragFree
        withControls={false}
        slideSize="25%"
        breakpoints={[
          {
            maxWidth: "100px",
            slideSize: "100%",
          },
        ]}
        align="start"
      >
        {slides}
      </Carousel>
    </>
  );
};

export default ArtistsCards;
