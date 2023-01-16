import { LoadingOverlay, Text } from "@mantine/core";
import Loading from "../../src/utils/Loading/Loading";
import { useState, useEffect } from "react";
import {
  useGetVenuesQuery,
  useGetSortedVenuesQuery,
} from "../../src/features/venue/venueSlice";
import CardWithPaginationSort from "../../src/components/resourses/CardWithPaginationSort/CardWithPaginationSort";
import useCurrentLocation from "../../src/Hooks/useCurrentLocaiton";
import { useRouter } from "next/router";

const AdminVenuePage = () => {
  const [activePage, setPage] = useState(1);
  const [sortValue, setSortValue] = useState("");
  const { location } = useCurrentLocation();
  const router = useRouter();
  const { data, isLoading, error } = useGetVenuesQuery(activePage, {
    skip: sortValue,
  });

  const {
    data: sortedData,
    isLoading: isSortedLoading,
    error: sortedError,
  } = useGetSortedVenuesQuery(
    { sortValue, activePage, location },
    { skip: !sortValue }
  );
  useEffect(() => {
    const { page } = router.query;
    if (page) setPage(page);
  }, [router.query]);
  if (error || sortedError) {
    return <Text align="center">Ops. something went wrong </Text>;
  }
  if (isLoading || isSortedLoading || sortedError) return <Loading />;

  return (
    <>
      <LoadingOverlay visible={isLoading || isSortedLoading} overlayBlur={2} />
      <CardWithPaginationSort
        data={sortedData?.venues || data?.venues}
        activePage={activePage}
        setPage={setPage}
        setSortValue={setSortValue}
        title="Venues"
        numberOfPages={sortedData?.numberOfPages || data.numberOfPages}
        type="venue"
      />
    </>
  );
};

export default AdminVenuePage;
