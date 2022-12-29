import {
  Card,
  Image,
  Text,
  Group,
  Button,
  ActionIcon,
  Badge,
  Accordion,
  Avatar,
  Title,
} from "@mantine/core";
import Stars from "./Stars/Stars";
import useStyles from "./styles";
import SmallMap from "../MapPage/SmallMap";
import Link from "next/link";

import { IconNavigation, IconEdit } from "@tabler/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import FooterSocial from "../HomePage/Footer/Footer";
import { useUser } from "@auth0/nextjs-auth0/client";
import SimilarPlaces from "./SimilarPlaces/SimilarPlaces";
import VenueCard from "./VenueCard/VanueCard";
import EventsFeed from "./EventsFeed/EventsFeed";
dayjs.extend(relativeTime);

export default function DetailsPage({ data }) {
  const { classes, theme } = useStyles();
  const { user } = useUser();

  return (
    <>
      <Card withBorder className={classes.card}>
        <Card.Section>
          <Image src={data.image} alt={data.name} height={400} />
        </Card.Section>

        <Card.Section className={classes.distanceSection}>
          <div>
            <Text color="dimmed" size="xs">
              {dayjs(data.startdate).format("D MMMM YYYY")}
            </Text>
            <Badge
              variant="gradient"
              gradient={{ from: "black", to: "white" }}
              size="sm"
            >
              {dayjs(data.startdate).fromNow()}
            </Badge>
          </div>
          <div>
            <Text size="xs" color="dimmed">
              Open
            </Text>

            <Text weight={500} size="sm">
              {`${data.open} - ${data.close}`}
            </Text>
          </div>
        </Card.Section>

        <Group position="apart" mt="sm">
          <Text size="sm" weight={700} className={classes.title}>
            {data.name}
          </Text>

          <Group>
            <Stars rating={data.rating} id={data._id} />
          </Group>
        </Group>

        <Text mt="sm" mb="md" color="dimmed" size="xs">
          {data.description || ""}
        </Text>

        {Array.isArray(data.genres) && data.genres.length ? (
          <div>
            <Text size="md" color="dimmed">
              Genres
            </Text>
            <Text weight={500} size="sm">
              {data.genres.join(" / ")}
            </Text>
          </div>
        ) : null}

        {data.placeType === "event" ? (
          <VenueCard venue={data.venue} />
        ) : (
          <EventsFeed venueId={data._id} />
        )}
        {data.price && (
          <Badge leftSection="price" size="lg" radius="sm">
            <Text size="sm" color="dimmed">
              {!data.price.includes("£") && "£"} {data.price}
            </Text>
          </Badge>
        )}
        {data.placeType === "event" && (
          <Button
            color="dark"
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
        )}
        <Accordion
          mx="auto"
          variant="filled"
          defaultValue="customization"
          classNames={classes}
          className={classes.venueRoot}
        >
          <Accordion.Item value="photos" variant="filled" mb="lg">
            <Accordion.Control>Address</Accordion.Control>
            <Accordion.Panel>
              <Text size="sm">{data.formatted_address}</Text>
              <Text size="sm">{data.postcode}</Text>
              <Text size="sm">{data.country}</Text>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <SmallMap center={data.location.coordinates} />

        <Button
          color="dark"
          fullWidth
          mt="md"
          radius="md"
          mb="lg"
          component="a"
          leftIcon={<IconNavigation />}
          target="_blank"
          href={`https://www.google.com/maps?q=${data.location.coordinates[0]}, ${data.location.coordinates[1]}`}
        >
          Get me there
        </Button>
        {user && (
          <ActionIcon
            variant="light"
            component={Link}
            className={classes.editButton}
            href={`/admin/${data.placeType}s/edit/${data._id}`}
          >
            <IconEdit size={16} />
          </ActionIcon>
        )}

        <SimilarPlaces
          type={data.placeType}
          coords={{
            lat: data.location.coordinates[0],
            lng: data.location.coordinates[1],
          }}
        />
      </Card>
      <FooterSocial />
    </>
  );
}
