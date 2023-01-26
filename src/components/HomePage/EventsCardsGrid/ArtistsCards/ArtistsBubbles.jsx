import { Carousel } from "@mantine/carousel";
import { Text, Group, Badge } from "@mantine/core";
import useStyles from "./styles";

const ArtistsBubbles = ({ artists }) => {
  const { classes } = useStyles();
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
          //   sx={{ maxWidth: 270 }}
          className={classes.badgeCarousel}
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
