import {
  Card,
  Image,
  Text,
  Group,
  RingProgress,
  Rating,
  Button,
  Container,
  ActionIcon,
  Badge,
} from "@mantine/core";
import Stars from "../Stars/Stars";
import useStyles from "./styles";
import SmallMap from "../Map/SmallMap";

import { IconShare, IconHeart, IconBookmark } from "@tabler/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function DetailsPage({ data }) {
  const { classes, theme } = useStyles();
  return (
    <Card withBorder className={classes.card}>
      <Card.Section>
        <Image src={data.image} alt={data.name} height={400} />
      </Card.Section>

      <Group position="apart" mt="sm">
        <Text size="sm" weight={700} className={classes.title}>
          {data.name}
        </Text>
        <Group spacing={5}>
          <Stars rating={data.rating} id={data._id} />
          {/* <RingProgress size={18} sections={[{ value: 80, color: "blue" }]} /> */}
        </Group>
      </Group>
      <Text color="dimmed" weight={700} size="xs">
        {dayjs(data.startdate).format("D MMMM YYYY")}
      </Text>
      <Badge
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan" }}
        size="sm"
      >
        {dayjs(data.startdate).fromNow()}
      </Badge>

      <Text mt="sm" mb="md" color="dimmed" size="xs">
        {data.description || (
          <>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
            libero, perspiciatis minima blanditiis labore quam quisquam odit
            voluptates, error quos omnis nihil quaerat ab voluptate dicta? At
            cum minus, nesciunt ut quis debitis? Hic recusandae tenetur ex
            nostrum fugiat aliquid.
          </>
        )}
      </Text>

      <Text mt="sm" mb="md" size="sm">
        Venue
      </Text>
      <Container>
        <Text size="sm">{data.formatted_address}</Text>
        <Text size="sm">{data.postcode}</Text>
        <Text size="sm">{data.country}</Text>
      </Container>

      <Button
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        mb="lg"
        component="a"
        target="_blank"
        href={data.link}
      >
        Book Ticket
      </Button>
      <SmallMap center={data.location.coordinates} />

      <Card.Section className={classes.footer}>
        <div>
          <Text size="xs" color="dimmed">
            Distance
          </Text>
          <Text weight={500} size="sm">
            {data.distance}
          </Text>
        </div>
        <div>
          <Text size="xs" color="dimmed">
            Open
          </Text>
          <Text weight={500} size="sm">
            {`${data.open} - ${data.close}`}
          </Text>
        </div>
        <div>
          <Text size="xs" color="dimmed">
            Genres
          </Text>
          <Text weight={500} size="sm">
            {data?.genres}
          </Text>
        </div>
      </Card.Section>
    </Card>
  );
}
