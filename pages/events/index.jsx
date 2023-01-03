import TableScrollArea from "../../src/components/AdminPage/TableScrollArea/TableScrollArea";

import {
  Container,
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
      <Container size="md">
        <Title
          align="center"
          m="lg"
          style={{
            position: "relative",

            zIndex: -1,
            fontSize: 100,
            WebkitTextStroke: "4px black",
            color: "white",
          }}
        >
          Events
        </Title>
        <Group spacing="xs">
          <Text size="sm">Sort By</Text>
          <Button
            onClick={() => setSortValue("startdate")}
            size="xs"
            variant="light"
          >
            Date
          </Button>
          <Button
            onClick={() => setSortValue("distance")}
            size="xs"
            variant="light"
          >
            Distance
          </Button>
          <Button
            onClick={() => setSortValue("price")}
            size="xs"
            variant="light"
          >
            Price
          </Button>
        </Group>
        <Divider mt="sm" />
        <Grid mt="lg">
          <LoadingOverlay visible={isSortedLoading} overlayBlur={2} />
          {(sortedData || data.events).map((event) => (
            <Grid.Col key={event._id} lg={4} xs={6}>
              <EventPageCard event={event} />
            </Grid.Col>
          ))}
        </Grid>
        <Pagination
          position="center"
          m="lg"
          noWrap
          styles={(theme) => ({
            item: {
              "&[data-active]": {
                backgroundImage: theme.fn.gradient({
                  from: "red",
                  to: "yellow",
                }),
              },
            },
          })}
          page={activePage}
          onChange={setPage}
          total={data.numberOfPages}
        />
      </Container>
      <FooterSocial />
    </>
  );
};

export default EventsPage;
