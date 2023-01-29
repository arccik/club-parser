import { Group, Text, Badge } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useRouter } from "next/router";

const GenresSlider = ({ genres, classes }) => {
  const router = useRouter();
  if (!genres) return null;

  const genresList = genres.map((genre) => (
    <Carousel.Slide key={genre}>
      <Badge
        color="light"
        className={classes.link}
        onClick={() => router.push(`/details/genres/${genre}`)}
      >
        {genre}
      </Badge>
    </Carousel.Slide>
  ));

  return (
    <Group m="xs">
      <Text size="xs" weight="bolder">
        Genres
      </Text>
      <Carousel
        className={classes.badgeCarousel}
        dragFree
        withControls={false}
        slideSize="10%"
        align="start"
      >
        {genresList}
      </Carousel>
    </Group>
  );
};

export default GenresSlider;
