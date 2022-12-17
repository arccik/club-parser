import {
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  Title,
  useMantineTheme,
} from "@mantine/core";
import OldCard from "./OldEventsCard";

const OldEvents = () => {
  return (
    <Container my="md">
      <Title>ENDED EVENTS</Title>
      <SimpleGrid
        cols={2}
        spacing="md"
        breakpoints={[{ maxWidth: "sm", cols: 1 }]}
      >
        <OldCard />
        {/* <Skeleton height={300} radius="md" animate={false} /> */}
        <Grid gutter="xs">
          <Grid.Col span={6}>
            <OldCard />
            {/* <Skeleton height={142} radius="md" animate={false} /> */}
          </Grid.Col>
          <Grid.Col span={6}>
            <OldCard />
            {/* <Skeleton height={142} radius="md" animate={false} /> */}
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
};

export default OldEvents;
