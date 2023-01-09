import { LoadingOverlay } from "@mantine/core";
import Loading from "../../src/utils/Loading/Loading";
import { useState } from "react";
import {
  useGetEventsQuery,
  useGetSortedEventsQuery,
} from "../../src/features/event/eventSlice";
import CardWithPaginationSort from "../../src/components/resourses/CardWithPaginationSort/CardWithPaginationSort";
import useCurrentLocation from "../../src/Hooks/useCurrentLocaiton";

const EventsPage = () => {
  const [activePage, setPage] = useState(1);
  const [sortValue, setSortValue] = useState("");
  const { data, isLoading, error } = useGetEventsQuery(activePage, {
    skip: sortValue,
  });
  const { location } = useCurrentLocation();
  const {
    data: sortedData,
    isLoading: isSortedLoading,
    error: sortedError,
  } = useGetSortedEventsQuery(
    { sortValue, activePage, location },
    { skip: !sortValue }
  );
  if (error || sortedError) return <p>cannot get data</p>;
  if (isLoading || isSortedLoading) return <Loading />;

  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <CardWithPaginationSort
        data={sortedData?.events || data?.events}
        activePage={activePage}
        setPage={setPage}
        setSortValue={setSortValue}
        title="Event"
        numberOfPages={sortedData?.numberOfPages || data.numberOfPages}
        type="event"
      />
    </>
  );
};

export default EventsPage;
