import { LoadingOverlay, Text } from "@mantine/core";
import Loading from "../../src/utils/Loading/Loading";
import { useState, useEffect } from "react";
import {
  useGetEventsQuery,
  useGetSortedEventsQuery,
} from "../../src/features/event/eventSlice";
import CardWithPaginationSort from "../../src/components/resourses/CardWithPaginationSort/CardWithPaginationSort";
import useCurrentLocation from "../../src/Hooks/useCurrentLocaiton";
import { useRouter } from "next/router";

const EventsPage = () => {
  const { location, getLocation } = useCurrentLocation();
  const router = useRouter();
  const [activePage, setPage] = useState(1);
  const [sortValue, setSortValue] = useState("");
  const { data, isLoading, error } = useGetEventsQuery(activePage, {
    skip: sortValue,
  });
  const {
    data: sortedData,
    isLoading: isSortedLoading,
    error: sortedError,
  } = useGetSortedEventsQuery(
    { sortValue, activePage, location },
    { skip: !sortValue }
  );

  useEffect(() => {
    const { page } = router.query;
    if (page) setPage(page);
    if (sortValue === "distance" && !location) getLocation();
  }, [router.query]);

  if (error || sortedError) {
    return <Text align="center">Ops. something went wrong </Text>;
  }
  if (isLoading || isSortedLoading || sortedError) return <Loading />;

  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <CardWithPaginationSort
        data={sortedData?.events || data?.events}
        activePage={activePage}
        setPage={setPage}
        setSortValue={setSortValue}
        title="Event"
        numberOfPages={sortedData?.numberOfPages || data?.numberOfPages}
        type="event"
      />
    </>
  );
};

export default EventsPage;
