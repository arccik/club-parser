import { LoadingOverlay, Text } from "@mantine/core";
import Loading from "../../src/utils/Loading/Loading";
import { useState, useEffect } from "react";
import {
  useGetVenuesQuery,
  useGetSortedVenuesQuery,
} from "../../src/features/venue/venueSlice";
import CardWithPaginationSort from "../../src/components/resourses/CardWithPaginationSort/CardWithPaginationSort";
import useCurrentLocation from "../../src/Hooks/useCurrentLocaiton";

const AdminVenuePage = () => {
  const [activePage, setPage] = useState(1);
  const [sortValue, setSortValue] = useState("");
  const { location } = useCurrentLocation();
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
