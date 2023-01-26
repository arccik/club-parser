import { Carousel } from "@mantine/carousel";
import { Title, Text, Group, Badge } from "@mantine/core";

import Artist from "./Artist";

const ArtistsBubbles = ({ artists }) => {
  if (!artists) return null;

  const artistList = artists.map((artist) => (
    <Carousel.Slide key={artist._id}>
      <Badge m={0} color="light" variant="dot" fullWidth>
        {artist.name}
      </Badge>
    </Carousel.Slide>
  ));
  return (
    <>
      <Group m="xs">
        <Text size="xs" weight="bolder">
          Artists
        </Text>
        <Carousel
          sx={{ maxWidth: 270 }}
          dragFree
          withControls={false}
          slideSize="10%"
          align="start"
        >
          {artistList}
        </Carousel>
      </Group>
    </>
  );
};

export default ArtistsBubbles;
