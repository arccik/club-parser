import { useGetDocumentsCountQuery } from "../../../features/event/eventSlice";

import FeaturesCards from "./FeaturesCards/FeaturesCards";

const Dashboard = () => {
  const { data: venueData, isLoading: venuesLoading } =
    useGetDocumentsCountQuery("venues");
  const { data: eventData, isLoading: eventsLoading } =
    useGetDocumentsCountQuery("events");
  if (venuesLoading || eventsLoading) return <p>Loading...</p>;
  return (
    <FeaturesCards
      totalVenues={venueData.totalCount}
      totalEvents={eventData.totalCount}
    />
  );
};

export default Dashboard;
