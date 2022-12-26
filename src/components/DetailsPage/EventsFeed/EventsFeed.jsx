import { Card, Text, Badge, Group, Avatar, Title, Loader } from "@mantine/core";
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
      <Text size="xs" color="dimmed">
        Could not find upcoming events
      </Text>
    );
  return (
    <>
      <Title order={4}>Upcoming Events</Title>
      {events.map((event) => (
        <Group noWrap spacing="xs" m="lg" key={event._id}>
          <Group spacing="xs" noWrap>
            <Avatar
              size={20}
              src={event.image}
              component={Link}
              href={`/details/events/${event._id}`}
            />
            <Text size="xs">{event.name}</Text>
          </Group>
          <Text size="xs" color="dimmed">
            •
          </Text>
          <Text size="xs" color="dimmed">
            {dayjs(event.startdate).fromNow()}
          </Text>
        </Group>
      ))}
    </>
  );
};

export default EventsFeed;
