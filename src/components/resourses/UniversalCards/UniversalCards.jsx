import {
  Container,
  Card,
  Text,
  Button,
  Grid,
  Stack,
  Image,
  Pagination,
  Title,
  Center,
  Chip,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import useStyles from "./styles";
import Stars from "../../DetailsPage/Stars/Stars";
import SortButtons from "../CardWithPaginationSort/sortButtons";
import GenresSlider from "../../HomePage/EventsCardsGrid/GenresSlider";
import SectionHeader from "../Layout/SectionHeader";
import EmptyState from "../Layout/EmptyState";

const UniversalCards = (props) => {
  const {
    data,
    cardType,
    page,
    setPage,
    numberOfPages,
    withOutSort,
    setSortValue,
  } = props;

  const { classes } = useStyles();
  const router = useRouter();

  return (
    <Container size="xl" sx={{ paddingTop: 12, paddingBottom: 36 }}>
      <SectionHeader
        eyebrow="Explore"
        title={cardType || router.query.genre || "Events"}
        description="Browse and refine listings by relevance, rating, and distance."
        align="left"
      />
      {!withOutSort && (
        <SortButtons placeType={cardType} setValue={setSortValue} />
      )}
      {data?.length ? (
        <Grid mt="xs">
          {data.map((place) => (
            <Grid.Col span={12} key={place._id} sm={6} lg={4}>
              <Card
                p="md"
                radius="lg"
                withBorder
                sx={{
                  height: "100%",
                  background: "linear-gradient(180deg, #121722, #0f131d)",
                  borderColor: "#2b3244",
                }}
              >
                <Card.Section
                  component={Link}
                  href={`/details/${place.placeType}s/${place._id}`}
                >
                  {place.image ? (
                    <Image src={place.image} height={180} alt={place.name} />
                  ) : (
                    <Center h={180} sx={{ background: "#1a2233" }}>
                      <Text size="sm" color="dimmed">
                        No image available
                      </Text>
                    </Center>
                  )}
                </Card.Section>

                <Stack mt="sm" mb="xs" spacing={4}>
                  <Title
                    order={4}
                    weight={700}
                    m={0}
                    p={0}
                    color="white"
                    component={Link}
                    href={`/details/${place.placeType}s/${place._id}`}
                    sx={{ textDecoration: "none", lineHeight: 1.2 }}
                  >
                    {place.name}
                  </Title>
                  <Text size="sm" color="dimmed" lineClamp={1}>
                    {place.formatted_address || place.address}
                  </Text>
                </Stack>
                {place.startdate ? (
                  <Text size="xs" color="dimmed" mt={2}>
                    {new Date(place.startdate).toUTCString().split("GMT")[0]}
                  </Text>
                ) : null}
                {place.price ? (
                  <Chip mt="xs" value="1">
                    Price: {place.price.includes("£") ? place.price : `£${place.price}`}
                  </Chip>
                ) : null}
                {place.placeType === "venue" ? (
                  <Center mt="sm">
                    <Stars rating={place.rating} id={place._id} />
                  </Center>
                ) : null}
                <Text
                  size="sm"
                  mt="xs"
                  color="dimmed"
                  className={classes.description}
                  lineClamp={3}
                >
                  {place.description}
                </Text>

                {place.genres?.length > 0 ? <GenresSlider genres={place.genres} /> : null}
                <Button
                  variant="white"
                  color="dark"
                  fullWidth
                  mt="md"
                  radius="md"
                  component={Link}
                  href={`/details/${place.placeType}s/${place._id}`}
                >
                  Open details
                </Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <EmptyState
          title="No results found"
          description="Try changing the sort order or browsing another category."
        />
      )}
      {numberOfPages > 1 && (
        <Pagination
          position="center"
          m="lg"
          noWrap
          page={page}
          onChange={(page) => {
            setPage(page);
            window.scrollTo(0, 0);
          }}
          total={numberOfPages}
        />
      )}
    </Container>
  );
};

export default UniversalCards;
