import {
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
} from "@mantine/core";
import Link from "next/link";
import { useQuery } from "react-query";
import fetcher from "../../utils/fetcher";
import useStyles from "./styles";

export default function ArticlesCardsGrid() {
  const { isLoading, error, data } = useQuery("places", () =>
    fetcher("/api/events")
  );
  const { classes } = useStyles();

  const cards = data?.map((article, i) => (
    <Link href={`/details/${article.title}`} key={article.image + i}>
      <Card
        radius="md"
        component="a"
        href="#"
        className={classes.card}
        shadow="lg"
      >
        <AspectRatio ratio={1920 / 1080}>
          <Image src={article.image} alt="article image" />
        </AspectRatio>
        <Text
          color="dimmed"
          size="xs"
          transform="uppercase"
          weight={700}
          mt="xs"
        >
          {article.formatted_address}
        </Text>
        <Text className={classes.title} mt={5}>
          {article.name}
        </Text>
      </Card>
    </Link>
  ));
  if (error) return <h1>Error: {JSON.stringify(error)}</h1>;
  return (
    <Container>
      <Text className={classes.placesNearBy}>Places near by</Text>
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {cards}
      </SimpleGrid>
    </Container>
  );
}
