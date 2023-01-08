import { LoadingOverlay } from "@mantine/core";
import Loading from "../../src/utils/Loading/Loading";
import { useState } from "react";
import {
  useGetVenuesQuery,
  useGetSortedVenuesQuery,
} from "../../src/features/venue/venueSlice";
import CardWithPaginationSort from "../../src/components/CardWithPaginationSort/CardWithPaginationSort";

const AdminVenuePage = () => {
  const [activePage, setPage] = useState(1);
  const [sortValue, setSortValue] = useState("");
  const { data, isLoading, error } = useGetVenuesQuery(activePage, {
    skip: sortValue,
  });
  const {
    data: sortedData,
    isLoading: isSortedLoading,
    error: sortedError,
  } = useGetSortedVenuesQuery({ sortValue, activePage }, { skip: !sortValue });

  if (error) return <p>cannot get data</p>;
  if (isLoading || isSortedLoading) return <Loading />;

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
