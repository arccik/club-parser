import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme, Container, Text } from "@mantine/core";
import Card from "./Card/Card";

export default function CardsCarousel({ events }) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const slides = events.map((item) => (
    <Carousel.Slide key={item._id}>
      <Card
        image={item.image}
        title={item.name}
        category={item.type}
        id={item._id}
      />
    </Carousel.Slide>
  ));

  return (
    <>
      <Container size="md" pb="sm">
        <Text fz="xl" color="white" weight="bolder">
          Upcoming events
        </Text>
        <Carousel
          loop
          slideSize="25%"
          breakpoints={[
            {
              maxWidth: "100px",
              slideSize: "100%",
            },
          ]}
          slideGap="xs"
          align="start"
          slidesToScroll={mobile ? 1 : 2}
        >
          {slides}
        </Carousel>
      </Container>
    </>
  );
}
