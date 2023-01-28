import {
  Text,
  Group,
  Avatar,
  Title,
  Loader,
  Stack,
  Paper,
} from "@mantine/core";
import { useGetUpcomingEventsForVenueQuery } from "../../../features/both/bothSlice";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
dayjs.extend(relativeTime);

const EventsFeed = ({ venueId }) => {
  const {
    data: events,
    isLoading,
    error,
  } = useGetUpcomingEventsForVenueQuery(venueId);

  if (isLoading) return <Loader />;
  if (error) return <p>Something went wrong! Could not get events</p>;
  if (!events.length)
    return (
      <Text size="xs" color="dimmed" m="md">
        Could not find any events
      </Text>
    );
  return (
    <Paper withBorder mt="xs">
      <Stack m="sm">
        <Title order={4} align="center">
          EVENTS
        </Title>

        {events.map((event) => (
          <Group noWrap spacing="xs" key={event._id}>
            <Group spacing="xs" noWrap>
              <Avatar size={40} src={event.image} />
              <Text
                size="md"
                component={Link}
                href={`/details/events/${event._id}`}
              >
                {event.name.slice(0, 20)}
              </Text>
            </Group>

            <Text size="xs" color="dimmed">
              • {dayjs(event.startdate).fromNow()}
            </Text>
          </Group>
        ))}
      </Stack>
    </Paper>
  );
};

export default EventsFeed;
