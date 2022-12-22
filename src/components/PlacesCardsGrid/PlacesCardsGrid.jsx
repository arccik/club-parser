import {
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
  Group,
  Rating,
  Badge,
} from "@mantine/core";
import Link from "next/link";
import useStyles from "./styles";
import dayjs from "dayjs";

export default function PlacesCardsGrid({ venues, type = "venues" }) {
  const { classes } = useStyles();

  const cards = venues.map((article, i) => (
    <Card
      key={article._id}
      className={classes.card}
      shadow="sm"
      radius="md"
      withBorder
      size="lg"
      component={Link}
      href={`/details/${type}/${article._id}`}
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.image} alt="article image" />
      </AspectRatio>

      <Group position="apart" mt="sm" mb="xs">
        <Text size="md" weight={700} className={classes.title}>
          {article.name}
        </Text>
        <Rating defaultValue={article.rating} />
      </Group>
      <Group position="apart" mt="md" mb="xs">
        <Text size="sm">{article.description || "Descriptions"}</Text>
      </Group>
      {type === "venues" ? (
        <Group position="apart" mt="md">
          <Text size="xs" color="dimmed">
            {`Doors Open ${article.open}`}
          </Text>
          <Text size="xs" color="dimmed">
            Distance: {article.distance.toPrecision(3)} km
          </Text>
        </Group>
      ) : (
        <Group position="apart" mt="md">
          <Badge>
            <Text size="xs" color="dimmed">
              {`Ended ${dayjs(article.enddate).format("DD MMM YYYY")}`}
            </Text>
          </Badge>
        </Group>
      )}
    </Card>
  ));
  return (
    <Container style={{ position: "relative", top: 300 }}>
      {type === "venues" && (
        <Text fz="xl" color="white" weight="bolder">
          Places near by
        </Text>
      )}

      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {cards}
      </SimpleGrid>
    </Container>
  );
}
