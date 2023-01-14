import { useGetDocumentsCountQuery } from "../../../features/admin/adminSlice";

import FeaturesCards from "./FeaturesCards/FeaturesCards";
import Loading from "../../../utils/Loading/Loading";
import MessageTable from "./MessageTable/MessageTable";

const Dashboard = () => {
  const { data: venueData, isLoading: venuesLoading } =
    useGetDocumentsCountQuery("venues");
  const { data: eventData, isLoading: eventsLoading } =
    useGetDocumentsCountQuery("events");
  if (venuesLoading || eventsLoading) return <Loading />;
  return (
    <>
      <FeaturesCards
        totalVenues={venueData.totalCount}
        totalEvents={eventData.totalCount}
      />
      <MessageTable />
    </>
  );
};

export default Dashboard;
