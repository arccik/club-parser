import {
  Container,
  Grid,
  SimpleGrid,
  Title,
  Text,
  Button,
} from "@mantine/core";
import OldCard from "./OldEventsCard";
import Link from "next/link";

const OldEvents = ({ events }) => {
  return (
    <Container my="md" style={{ position: "relative" }}>
      <Title order={4} color="dimmed">
        Check past Events
      </Title>
      <SimpleGrid
        cols={2}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <OldCard data={events[0]} />
        <Grid gutter="xs">
          <Grid.Col span={6}>
            <OldCard data={events[1]} />
          </Grid.Col>
          <Grid.Col span={6}>
            <OldCard data={events[2]} />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
      <Text fw={700} size="md" component={Link} href="/details/oldevents">
        <Button variant="default">See More...</Button>
      </Text>
    </Container>
  );
};

export default OldEvents;
