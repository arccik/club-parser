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
        ClubChaser - Best happiness
      </Title>

      <Text
        color="dimmed"
        className={classes.description}
        align="center"
        mt="md"
      >
        As the administrator of your website, you have the power to make
        important decisions and optimizations that can greatly impact the
        overall success and functionality of your online presence.
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
            Stay motivated to keep your website running smooth, and your users
            satisfied.
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
            Events updating automaticlly
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
            These babies we need to push on
          </Text>
        </Card>
      </SimpleGrid>
    </Container>
  );
};

export default FeaturesCards;
