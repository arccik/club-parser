import {
  Container,
  Group,
  Badge,
  Title,
  Text,
  SimpleGrid,
  Card,
} from "@mantine/core";
import { IconGauge, IconUser, IconCookie } from "@tabler/icons";
import useStyles from "./styles";
import Link from "next/link";

const FeaturesCards = ({ totalVenues, totalEvents }) => {
  const { classes, theme } = useStyles();

  return (
    <Container size="lg" py="xl">
      <Group position="center">
        <Badge variant="filled" size="lg">
          Best company ever
        </Badge>
      </Group>

      <Title order={2} className={classes.title} align="center" mt="sm">
        StripRadar - All it is about the quality time and entertaiments.
      </Title>

      <Text
        color="dimmed"
        className={classes.description}
        align="center"
        mt="md"
      >
        Every once in a while, everyone missing some importent moments in the
        life lost themselves in the fog. This happiness to enjoy the moment when
        the music and your body merged into one.
      </Text>

      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        <Card shadow="md" radius="md" className={classes.card} p="xl">
          <IconGauge size={50} stroke={2} color={theme.fn.primaryColor()} />
          <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
            All Posts: {totalVenues + totalEvents}
          </Text>
          <Text size="sm" color="dimmed" mt="sm">
            Guys, so far, the volume of our posts its not very satisfying our
            needs and overall our success, we need to push it up!
          </Text>
        </Card>
        <Card
          component={Link}
          href="/admin/events"
          shadow="md"
          radius="md"
          className={classes.card}
          p="xl"
        >
          <IconUser size={50} stroke={2} color={theme.fn.primaryColor()} />
          <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
            Events: {totalEvents}
          </Text>
          <Text size="sm" color="dimmed" mt="sm">
            Guys, so far, the volume of our posts its not very satisfying our
            needs and overall our success, we need to push it up!
          </Text>
        </Card>
        <Card
          component={Link}
          href="/admin/venues"
          shadow="md"
          radius="md"
          className={classes.card}
          p="xl"
        >
          <IconCookie size={50} stroke={2} color={theme.fn.primaryColor()} />
          <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
            Venues: {totalVenues}
          </Text>
          <Text size="sm" color="dimmed" mt="sm">
            Guys, so far, the volume of our posts its not very satisfying our
            needs and overall our success, we need to push it up!
          </Text>
        </Card>
      </SimpleGrid>
    </Container>
  );
};

export default FeaturesCards;
