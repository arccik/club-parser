import { Autocomplete, Grid, Container, Calendar } from "@mantine/core";
import {
  IconSearch,
  ActionIcon,
  IconArrowRight,
  IconCalendarEvent,
} from "@tabler/icons";
const SearchBarSkeleton = () => {
  return (
    <Container size="lg">
      <Grid>
        <Grid.Col span={11}>
          <Autocomplete
            icon={<IconSearch size={18} stroke={1.5} />}
            radius="xl"
            size="md"
            mt="sm"
            mb="sm"
            label="Search events, artist or places"
            placeholder="Search..."
            rightSectionWidth={42}
            rightSection={
              <ActionIcon size={30} radius="xl" variant="filled">
                <IconArrowRight size={18} stroke={1.5} />
              </ActionIcon>
            }
          />
        </Grid.Col>
        <Grid.Col span={1} p={0}>
          <IconCalendarEvent
            onClick={() => setShowCalendar((prev) => !prev)}
            style={{
              marginTop: 55,
              cursor: "pointer",
            }}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default SearchBarSkeleton;
