import { SimpleGrid } from "@mantine/core";
import useStyles from "./styles";
import EventCard from "./EventCard";

const EventsCardsGrid = ({ events }) => {
  return (
    <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
      <EventCard data={events} />
    </SimpleGrid>
  );
};
export default EventsCardsGrid;
