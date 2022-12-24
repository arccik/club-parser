import TableScrollArea from "../../src/components/AdminPage/TableScrollArea/TableScrollArea";

import { Container, TextInput, Grid, Pagination } from "@mantine/core";
import Loading from "../../src/utils/Loading/Loading";
import { useState } from "react";
import { useGetEventsQuery } from "../../src/features/event/eventSlice";
import EventPageCard from "../../src/components/EventPageCard/EventPageCard";
import { FooterSocial } from "../../src/components/Footer/Footer";

const AdminEventsPage = () => {
  const [activePage, setPage] = useState(1);
  const { data, isLoading, error } = useGetEventsQuery(activePage);
  if (error) return <p>cannot get data</p>;
  if (isLoading) return <Loading />;
  return (
    <>
      <Container size="md">
        <Grid mt="lg">
          {data.events.map((event) => (
            <Grid.Col key={event._id} lg={4} xs={6}>
              <EventPageCard event={event} />
            </Grid.Col>
          ))}
        </Grid>
        <Pagination
          position="center"
          mt="lg"
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

export default AdminEventsPage;
