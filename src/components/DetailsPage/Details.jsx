import {
  Card,
  Image,
  Text,
  Group,
  Button,
  ActionIcon,
  Badge,
  Title,
  Container,
  Paper,
} from "@mantine/core";
import Link from "next/link";
import Head from "next/head";
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
import ShareButton from "../../utils/ShareButton/ShareButton";
import GenresSlider from "../HomePage/EventsCardsGrid/GenresSlider";

const DetailsPage = ({ data }) => {
  const { classes } = useStyles();
  const { user } = useUser();

  if (!data) return null;
  return (
    <>
      <Head>
        <title>{data.name}</title>
        <meta property="og:title" content={data.name} key={data.name} />
        <meta property="og:image" content={data.image} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />
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
            {
              <div>
                <Button
                  variant="default"
                  radius="md"
                  component="a"
                  size="xs"
                  leftIcon={<IconNavigation style={{ margin: 0 }} />}
                  target="_blank"
                  href={`https://www.google.com/maps?q=${data.location.coordinates[1]}, ${data.location.coordinates[0]}`}
                >
                  {data?.venue?.town || data.town}
                </Button>
              </div>
            }
            <Group>
              <Stars rating={data.rating} id={data._id} />
            </Group>
          </Group>
          <Text
            mt="sm"
            mb="md"
            color="dimmed"
            size="xs"
            style={{
              whiteSpace: "pre-line",
              fontSize: 14,
              fontFamily: "Verdana (sans-serif)",
            }}
          >
            {data.description || ""}
          </Text>

          {data.artists && (
            <>
              <Title mt="lg" mb="sm" size="md">
                Artists
              </Title>
              <ArtistsCarousel artists={data.artists} />
            </>
          )}
          {data.placeType === "event" && (
            <BuyTickets eventId={data.eventId} title={data.name} />
          )}
          {data.genres.length > 0 && <GenresSlider genres={data.genres} />}

          {data.placeType === "event" && data.venue ? (
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
          {data.placeType === "venue" && (
            <>
              <Paper shadow="xs" p="md" mb="xs">
                <Title size="xs">Address</Title>
                <Text size="sm">{data.formatted_address || data.address}</Text>
                <Text size="sm">{data.postcode}</Text>
                <Text size="sm">{data.country}</Text>
              </Paper>
            </>
          )}

          <SmallMap center={data.location.coordinates} />

          <Button
            fullWidth
            variant="default"
            // style={{ backgroundColor: "rgb(60 184 176)", opacity: 0.7 }}
            radius="lg"
            mt="md"
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
            currentPlace={data._id}
            coords={{
              lat: data.location.coordinates[0],
              lng: data.location.coordinates[1],
            }}
          />
        </Card>
        <ShareButton
          title={data.title}
          url={`/details/${data.placeType}s/${data._id}`}
        />
        <FooterSocial />
      </Container>
    </>
  );
};
export default DetailsPage;