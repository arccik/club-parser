import { LoadingOverlay, Text } from "@mantine/core";
import Loading from "../../src/utils/Loading/Loading";
import { useState, useEffect } from "react";
import {
  useGetEventsQuery,
  useGetSortedEventsQuery,
} from "../../src/features/event/eventSlice";
import useCurrentLocation from "../../src/Hooks/useCurrentLocaiton";
import { useRouter } from "next/router";
import FooterSocial from "../../src/components/resourses/Footer/Footer";
import UniversalCards from "../../src/components/resourses/UniversalCards/UniversalCards";

const EventsPage = () => {
  const { location, getLocation } = useCurrentLocation();
  const [activePage, setPage] = useState(1);
  const [sortValue, setSortValue] = useState("");
  const router = useRouter();
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
    if (!sortValue && location) {
      setSortValue("distance");
    }
  }, [sortValue, location]);
  const handlePagination = (value) => {
    setPage(Number(value));

    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: value,
      },
    });

    // router.push(`?page=${value}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (router.query.page && router.query.page !== activePage)
      setPage(router.query.page);
    if (sortValue === "distance" && !location) getLocation();
  }, [router.query.page, sortValue, activePage]);

  if (error || sortedError) {
    return <Text align="center">Ops. something went wrong </Text>;
  }
  if (isLoading || isSortedLoading) return <Loading />;
  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <UniversalCards
        setSortValue={setSortValue}
        numberOfPages={sortedData?.numberOfPages || data?.numberOfPages}
        data={sortedData?.events || data?.events}
        cardType="Events"
        page={Number(activePage)}
        setPage={handlePagination}
      />
      <FooterSocial />
    </>
  );
};
export default EventsPage;
