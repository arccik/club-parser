import {
  Container,
  Card,
  Text,
  Badge,
  Button,
  Group,
  Blockquote,
  ActionIcon,
  Stack,
  Image,
  Pagination,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

const UniversalCards = ({ data, cardType, page, setPage, numberOfPages }) => {
  const router = useRouter();

  return (
    <Container size="sm">
      <ActionIcon onClick={() => router.back()}>&#171;Back</ActionIcon>
      <Blockquote
        style={{
          padding: 10,
          margin: 10,
          boxShadow:
            "-1px 0 0 1px rgba(255, 203, 82, 0.75), -1px -1px 0 1px rgba(255, 170, 70, 0.25), -1px 1px 0 1px rgba(255, 170, 70, 0.25), 0 -1px 0 1px rgba(255, 136, 57, 0.5), 0 1px 0 1px rgba(255, 136, 57, 0.5), 1px -1px 0 1px rgba(255, 103, 44, 0.25), 1px 1px 0 1px rgba(255, 103, 44, 0.25), 1px 0 0 1px rgba(255, 69, 31, 0.75)",
        }}
        align="center"
      >
        {cardType || router.query.genre || "Event"}
      </Blockquote>
      {data?.map((place) => (
        <Card key={place._id} shadow="sm" p="lg" mt="lg" radius="md" withBorder>
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
            <Text weight={500} m={0} p={0}>
              {place.placeType.toUpperCase()}: {place.name}
            </Text>
            <Text size="sm" color="dimmed">
              {place.formatted_address || place.address}
            </Text>
          </Stack>

          <Card.Section align="center">
            {place.startdate && (
              <Group>
                <Badge size="lg" color="gray">
                  {new Date(place.startdate).toUTCString().split("GMT")}
                </Badge>
                {place.price && (
                  <Badge>
                    <span>Price: </span>
                    {place.price.includes("£")
                      ? place.price
                      : " £ " + place.price}
                  </Badge>
                )}
              </Group>
            )}
          </Card.Section>
          <Text size="sm" m="md" color="dimmed">
            {place.description}
          </Text>
          {place.genres?.map((genre) => (
            <Badge
              key={genre}
              color="orange"
              variant="light"
              style={{ cursor: "pointer" }}
              onClick={() => router.push(`/details/genres/${genre}`)}
            >
              {genre}
            </Badge>
          ))}

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
      ))}
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
