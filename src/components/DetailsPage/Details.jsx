import {
  Card,
  Image,
  Text,
  Group,
  Button,
  ActionIcon,
  Badge,
  Accordion,
  Title,
  Container,
} from "@mantine/core";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { IconNavigation, IconEdit, IconWorld, IconPhone } from "@tabler/icons";
import dayjs from "dayjs";
dayjs.extend(relativeTime);

import Stars from "./Stars/Stars";
import useStyles from "./styles";
import SmallMap from "../MapPage/SmallMap";
import relativeTime from "dayjs/plugin/relativeTime";
import { useUser } from "@auth0/nextjs-auth0/client";
import SimilarPlaces from "./SimilarPlaces/SimilarPlaces";
import VenueCard from "./VenueCard/VanueCard";
import EventsFeed from "./EventsFeed/EventsFeed";
import BuyTickets from "./BuyTickets/BuyTickets";
import ArtistsCarousel from "../HomePage/EventsCardsGrid/ArtistsCards/ArtistsCarousel";
import FooterSocial from "../resourses/Footer/Footer";

const DetailsPage = ({ data }) => {
  const router = useRouter();
  const { classes } = useStyles();
  const { user } = useUser();

  if (!data) return null;
  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta property="og:title" content={data.name} key="Event title" />
      </Head>
      <Container px={0}>
        <Card withBorder className={classes.card}>
          <Card.Section>
            <Image src={data.image} alt={data.name} height={400} />
          </Card.Section>

          <Card.Section className={classes.distanceSection}>
            {data.placeType === "event" && (
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
            )}
            {data.open && (
              <div>
                <Text size="xs" color="dimmed">
                  Open
                </Text>

                <Text weight={500} size="sm">
                  {`${data.open} - ${data.close}`}
                </Text>
              </div>
            )}
            {data.placeType === "venue" && (
              <div>
                <Group spacing="xs">
                  <div>
                    <Text size="xs" color="dimmed">
                      Website
                    </Text>
                    <ActionIcon
                      variant="light"
                      component="a"
                      target="_blank"
                      href={data.link}
                    >
                      <IconWorld />
                    </ActionIcon>
                  </div>
                  <div>
                    {data.phone && (
                      <>
                        <Text size="xs" color="dimmed">
                          Phone
                        </Text>
                        <ActionIcon
                          variant="light"
                          component="a"
                          href={`tel:${data.phone}`}
                        >
                          <IconPhone />
                        </ActionIcon>
                      </>
                    )}
                  </div>
                </Group>
              </div>
            )}
          </Card.Section>

          <Group position="apart" mt="sm">
            <Group spacing={0}>
              <Text size="sm" weight={700} className={classes.title}>
                {data.name}
              </Text>
            </Group>

            <Group>
              <Stars rating={data.rating} id={data._id} type={data.placeType} />
            </Group>
          </Group>

          <Text
            mt="sm"
            mb="md"
            color="dimmed"
            size="xs"
            style={{ whiteSpace: "pre-line" }}
          >
            {data.description || ""}
          </Text>

          {data.genres.length > 0 && (
            <>
              <Title size="md" mb="xs">
                Genres
              </Title>
              <Group spacing={0}>
                {data.genres.map((genre) => (
                  <Badge
                    m={0}
                    key={genre}
                    color="light"
                    className={classes.badgeLink}
                    onClick={() => router.push(`/details/genres/${genre}`)}
                  >
                    {genre}
                  </Badge>
                ))}
              </Group>
            </>
          )}

          {data.artists && (
            <>
              <Title mt="lg" mb="sm" size="md">
                Artists
              </Title>
              <ArtistsCarousel artists={data.artists} />
            </>
          )}

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
            <BuyTickets eventId={data.eventId} title={data.name} />
          )}
          {data.placeType === "venue" && (
            <Accordion
              mt="lg"
              mx="auto"
              variant="filled"
              defaultValue="customization"
              classNames={classes}
              className={classes.venueRoot}
            >
              <Accordion.Item value="photos" variant="filled" mb="lg">
                <Accordion.Control>Address</Accordion.Control>
                <Accordion.Panel>
                  <Text size="sm">
                    {data.formatted_address || data.address}
                  </Text>
                  <Text size="sm">{data.postcode}</Text>
                  <Text size="sm">{data.country}</Text>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          )}

          <SmallMap center={data.location.coordinates} />

          <Button
            color="dark"
            fullWidth
            variant="light"
            mt="md"
            radius="md"
            mb="lg"
            component="a"
            leftIcon={<IconNavigation />}
            target="_blank"
            href={`https://www.google.com/maps?q=${data.location.coordinates[1]}, ${data.location.coordinates[0]}`}
          >
            Get me there
          </Button>

          {user && user.role === "admin" && (
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
            id={data._id}
            coords={{
              lat: data.location.coordinates[0],
              lng: data.location.coordinates[1],
            }}
          />
        </Card>
        <FooterSocial />
      </Container>
    </>
  );
};
export default DetailsPage;