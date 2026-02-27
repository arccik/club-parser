import {
  SimpleGrid,
  Button,
  Group,
} from "@mantine/core";
import {
  IconBuildingStore,
  IconCalendarStats,
  IconChecklist,
} from "@tabler/icons";
import Link from "next/link";
import StatCard from "../../../resourses/Layout/StatCard";
import SectionHeader from "../../../resourses/Layout/SectionHeader";

const FeaturesCards = ({ totalVenues, totalEvents }) => {
  const totalPosts = totalVenues + totalEvents;

  return (
    <>
      <SectionHeader
        eyebrow="Admin overview"
        title="Control panel and content health"
        description="Track inventory, review the latest messages, and jump directly into content maintenance."
        action={
          <Group spacing="xs">
            <Button component={Link} href="/admin/events" variant="default">
              Manage events
            </Button>
            <Button component={Link} href="/admin/venues">
              Manage venues
            </Button>
          </Group>
        }
      />

      <SimpleGrid cols={3} spacing="md" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <StatCard
          label="Total posts"
          value={totalPosts}
          hint="All indexed content in platform"
          icon={<IconChecklist size={18} />}
          color="grape"
        />
        <StatCard
          label="Events"
          value={totalEvents}
          hint="Upcoming and historical event entries"
          icon={<IconCalendarStats size={18} />}
          color="blue"
        />
        <StatCard
          label="Venues"
          value={totalVenues}
          hint="Published venue profiles"
          icon={<IconBuildingStore size={18} />}
          color="teal"
        />
      </SimpleGrid>
    </>
  );
};

export default FeaturesCards;
