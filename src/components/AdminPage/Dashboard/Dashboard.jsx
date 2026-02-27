import { useGetDocumentsCountQuery } from "../../../features/admin/adminSlice";

import FeaturesCards from "./FeaturesCards/FeaturesCards";
import Loading from "../../../utils/Loading/Loading";
import MessageTable from "./MessageTable/MessageTable";
import SectionHeader from "../../resourses/Layout/SectionHeader";
import { Stack } from "@mantine/core";

const Dashboard = () => {
  const { data: venueData, isLoading: venuesLoading } =
    useGetDocumentsCountQuery("venues");
  const { data: eventData, isLoading: eventsLoading } =
    useGetDocumentsCountQuery("events");
  if (venuesLoading || eventsLoading) return <Loading />;
  return (
    <Stack spacing="lg">
      <FeaturesCards
        totalVenues={venueData.totalCount}
        totalEvents={eventData.totalCount}
      />
      <SectionHeader
        eyebrow="Inbox"
        title="Recent user messages"
        description="Review support requests and mark resolved conversations directly from the table."
      />
      <MessageTable />
    </Stack>
  );
};

export default Dashboard;
