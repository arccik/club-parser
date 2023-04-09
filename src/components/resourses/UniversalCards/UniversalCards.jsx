import {
  Container,
  Card,
  Text,
  Badge,
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
    <Container size="lg">
      <Title className={classes.title} p={0} m={0} align="center">
        {cardType || router.query.genre || "Event"}
      </Title>
      {!withOutSort && (
        <SortButtons placeType={cardType} setValue={setSortValue} />
      )}
      <Grid>
        {data &&
          data.map((place) => (
            <Grid.Col span={12} key={place._id} xs={4}>
              <Card shadow="sm" p="lg" mt="lg" radius="md" withBorder>
                <Card.Section
                  component={Link}
                  href={`/details/${place.placeType}s/${place._id}`}
                >
                  {place.image && (
                    <Image
                      src={place.image}
                      height={160}
                      alt={place.name}
                      placeholder="blur"
                    />
                  )}
                </Card.Section>

                <Stack mt="sm" mb="xs" spacing={0}>
                  <Title
                    order={4}
                    weight={700}
                    m={0}
                    p={0}
                    color="white"
                    component={Link}
                    href={`/details/${place.placeType}s/${place._id}`}
                  >
                    {place.name}
                  </Title>
                  <Text size="sm" color="dimmed">
                    {place.formatted_address || place.address}
                  </Text>
                </Stack>
                <Card.Section align="center">
                  {place.startdate && (
                    <>
                      <Title order={5} align="center">
                        {new Date(place.startdate).toUTCString().split("GMT")}
                      </Title>
                      {place.price && (
                        <Chip value="1">
                          <span>Price: </span>
                          {place.price.includes("£")
                            ? place.price
                            : " £" + place.price}
                        </Chip>
                      )}
                    </>
                  )}
                </Card.Section>
                {place.placeType === "venue" && (
                  <Center>
                    <Stars rating={place.rating} id={place._id} />
                  </Center>
                )}
                <Text
                  size="sm"
                  mt="xs"
                  color="dimmed"
                  className={classes.description}
                >
                  {place.description}
                </Text>

                {place.genres?.length > 0 && (
                  <GenresSlider genres={place.genres} />
                )}
                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                  component={Link}
                  href={`/details/${place.placeType}s/${place._id}`}
                >
                  Check this out
                </Button>
              </Card>
            </Grid.Col>
          ))}
      </Grid>
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
