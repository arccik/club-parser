import { Container, SimpleGrid, Title } from "@mantine/core";
import useStyles from "./styles";
import EventCard from "./EventCard";

const EventsCardsGrid = ({ events }) => {
  return (
    <Container
      sx={{
        "@media (max-width: 755px)": {
          margin: 0,
          padding: 0,
        },
      }}
    >
      <Title
        mt="md"
        order={3}
        variant="gradient"
        gradient={{ from: "white", to: "dark", deg: 90 }}
        sx={{ fontFamily: "Greycliff CF, sans-serif" }}
        fz="xl"
        fw={700}
      >
        Upcoming Events
      </Title>
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <EventCard data={events} />
      </SimpleGrid>
    </Container>
  );
};
export default EventsCardsGrid;
