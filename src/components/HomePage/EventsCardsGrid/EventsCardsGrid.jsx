import { Button, Container, SimpleGrid, Title } from "@mantine/core";
import Link from "next/link";
import EventCard from "./EventCard";

const EventsCardsGrid = ({ events, old }) => {
  return (
    <Container
      sx={{
        "@media (max-width: 755px)": {
          margin: 0,
          padding: 0,
        },
      }}
    >
      {!old && (
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
      )}
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <EventCard data={events} />
      </SimpleGrid>
      <Button fullWidth color="dark" component={Link} href="/events">
        See All events
      </Button>
    </Container>
  );
};
export default EventsCardsGrid;
