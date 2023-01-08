import { Card, Text, Group } from "@mantine/core";
import Image from "next/image";
import dayjs from "dayjs";
import useStyles from "./styles";
import Link from "next/link";

const EventPageCard = ({ event }) => {
  const { classes } = useStyles();
  console.log("Event Page Card : ", event);
  return (
    <Card
      withBorder
      radius="md"
      p={0}
      className={classes.card}
      component={Link}
      href={`/details/${event.placeType}s/${event._id}`}
    >
      <Group noWrap spacing={0}>
        {event.image && (
          <Image
            src={event?.image}
            height={140}
            width={140}
            alt={event.name}
            blurDataURL="/assets/blur.jpg"
            placeholder="blur"
          />
        )}
        <div className={classes.body}>
          <Group>
            <Text transform="uppercase" color="dimmed" weight={700} size="xs">
              {event.startdate ? (
                dayjs(event.startdate).format("DD MMM YY")
              ) : (
                <p>
                  {event.open} - {event.close}
                </p>
              )}
            </Text>
            {event.distance && (
              <Text size="xs"> {event.distance.toPrecision(3)} km</Text>
            )}
          </Group>
          <Text className={classes.title} mt="xs" mb="md">
            {event.name}
          </Text>
          <Group noWrap spacing="xs">
            <Group spacing="xs" noWrap>
              {/* <Avatar size={20} src={event.formatted_address} /> */}
              <Text size="xs">{event.formatted_address}</Text>
            </Group>
          </Group>
        </div>
      </Group>
    </Card>
  );
};
export default EventPageCard;
