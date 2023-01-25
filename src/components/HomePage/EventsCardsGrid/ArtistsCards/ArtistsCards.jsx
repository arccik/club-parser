import { Carousel } from "@mantine/carousel";
import { Title, Text, Group, Badge } from "@mantine/core";

import Artist from "./Artist";

const ArtistsCards = ({ artists }) => {
  if (!artists) return null;
  // const slides = artists.map((item) => (
  //   <Carousel.Slide key={item._id} gap="xs">
  //     <Artist {...item} />
  //   </Carousel.Slide>
  // ));

  const artistList = artists.map((artist) => (
    <Badge m={0} key={artist._id} color="indigo">
      {artist.name}
    </Badge>
  ));
  return (
    <>
      <Group m="xs">
        <Text size="xs" weight="bolder">
          Artists
        </Text>
        {artistList}
      </Group>
    </>
  );
};

export default ArtistsCards;
