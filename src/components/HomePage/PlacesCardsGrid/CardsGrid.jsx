import {
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
  Group,
  Rating,
} from "@mantine/core";
import Link from "next/link";
import useStyles from "./styles";

export default function PlacesCardsGrid({ venues }) {
  const { classes } = useStyles();

  const cards = venues.map((article, i) => (
    <Card
      key={article._id}
      className={classes.card}
      shadow="sm"
      radius="md"
      withBorder
    >
      <Link
        href={`/details/venues/${article._id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <AspectRatio ratio={1920 / 1080}>
          <Image src={article.image} alt="article image" />
        </AspectRatio>

        <Group position="apart" mt="md" mb="xs">
          <Text size="md" weight={700} style={{ width: 140 }}>
            {article.name}
          </Text>
          <Rating defaultValue={article.rating} />
        </Group>
        <Group position="apart" mt="md" mb="xs">
          <Text size="xs" mt="xs" color="dimmed">
            {`Doors Open ${article.open}`}
          </Text>
          {article.distance && (
            <Text size="xs" mt="xs" color="dimmed">
              Distance: {article.distance} km
            </Text>
          )}
        </Group>
      </Link>
    </Card>
  ));
  return (
    <Container size="md">
      <Text className={classes.placesNearBy}>Places near by</Text>
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {cards}
      </SimpleGrid>
    </Container>
  );
}
