import { Container, Grid, SimpleGrid, Title, Text } from "@mantine/core";
import OldCard from "./OldEventsCard";
import Link from "next/link";

const OldEvents = ({ events }) => {
  return (
    <Container my="md">
      <Title order={4}>Check how it was</Title>
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
      <Text
        color="blue"
        fw={700}
        size="md"
        component={Link}
        href="/details/oldevents"
      >
        See More...
      </Text>
    </Container>
  );
};

export default OldEvents;
