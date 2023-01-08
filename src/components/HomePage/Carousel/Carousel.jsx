import { Carousel } from "@mantine/carousel";
import { Container, Text } from "@mantine/core";
import Card from "./Card/Card";
import dayjs from "dayjs";

const CardsCarousel = ({ events }) => {
  const slides = events?.map((item) => (
    <Carousel.Slide key={item._id}>
      <Card
        image={item.image}
        title={item.name}
        date={dayjs(item.startdate).format("DD/MM/YYYY")}
        id={item._id}
      />
    </Carousel.Slide>
  ));

  return (
    <Container
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
      }}
    >
      <Text fz="xl" color="white" weight="bolder">
        Recomended
      </Text>
      <Carousel
        loop
        dragFree
        slideSize="25%"
        breakpoints={[
          {
            maxWidth: "100px",
            slideSize: "100%",
          },
        ]}
        slideGap="xs"
        align="start"
      >
        {slides}
      </Carousel>
    </Container>
  );
};
export default CardsCarousel;
