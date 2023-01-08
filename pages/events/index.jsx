import TableScrollArea from "../../src/components/AdminPage/TableScrollArea/TableScrollArea";

import {
  Container,
  TextInput,
  Grid,
  Pagination,
  Badge,
  Text,
  Title,
  Divider,
  Group,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import Loading from "../../src/utils/Loading/Loading";
import { useState } from "react";
import {
  useGetEventsQuery,
  useGetSortedEventsQuery,
} from "../../src/features/event/eventSlice";
import EventPageCard from "../../src/components/EventsPage/EventPageCard";
import FooterSocial from "../../src/components/HomePage/Footer/Footer";
import CardWithPaginationSort from "../../src/components/CardWithPaginationSort/CardWithPaginationSort";

const EventsPage = () => {
  const [activePage, setPage] = useState(1);
  const [sortValue, setSortValue] = useState("");
  const { data, isLoading, error } = useGetEventsQuery(activePage);
  const {
    data: sortedData,
    isLoading: isSortedLoading,
    error: sortedError,
  } = useGetSortedEventsQuery({ sortValue, activePage }, { skip: !sortValue });
  if (error) return <p>cannot get data</p>;
  if (isLoading) return <Loading />;

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
