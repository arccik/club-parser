import {
  Card,
  Image,
  Text,
  Group,
  RingProgress,
  Rating,
  Button,
  Container,
} from "@mantine/core";
import { GoogleMap } from "@react-google-maps/api";
import Markers from "../../components/Map/Marker/Markes";
import Stars from "../Stars/Stars";
import useStyles from "./styles";
import { useCallback, useMemo, useRef } from "react";

export default function DetailsPage({ data }) {
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const mapRef = useRef();
  const options = useMemo(
    () => ({
      // mapId: "216185b90ab09587",
      disableDefaultUI: true,
      clickableIcons: false,
      gestureHandling: "greedy",
      panControl: true,
    }),
    []
  );
  const { classes } = useStyles();
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
      <GoogleMap
        zoom={10}
        center={{
          lat: data.location.coordinates[0],
          lat: data.location.coordinates[1],
        }}
        onLoad={onLoad}
        options={options}
        mapContainerClassName={classes.mapContainer}
      ></GoogleMap>
      <Button variant="dark" mt="lg" color="blue" fullWidth radius="md">
        Open On Map
      </Button>
      <Button
        variant="light"
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        mb="lg"
      >
        Book Ticket
      </Button>

      <Card.Section className={classes.footer}>
        {/* <div>
          <Text size="xs" color="dimmed">
            Distance
          </Text>
          <Text weight={500} size="sm">
            {data.distance}
          </Text>
        </div> */}
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
            Address
          </Text>
          <Text weight={500} size="sm">
            {data.formatted_address}
          </Text>
        </div>
      </Card.Section>
    </Card>
  );
}
