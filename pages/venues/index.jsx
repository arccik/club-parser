import { Container, Grid, Pagination } from "@mantine/core";
import Loading from "../../src/utils/Loading/Loading";
import { useState } from "react";
import { useGetVenuesQuery } from "../../src/features/venue/venueSlice";
import EventPageCard from "../../src/components/EventsPage/EventPageCard";
import { FooterSocial } from "../../src/components/HomePage/Footer/Footer";

const AdminEventsPage = () => {
  const [activePage, setPage] = useState(1);
  const { data, isLoading, error } = useGetVenuesQuery(activePage);
  if (error) return <p>cannot get data</p>;
  if (isLoading) return <Loading />;
  return (
    <>
      <Container size="md">
        <Grid mt="lg">
          {data.venues.map((event) => (
            <Grid.Col key={event._id} lg={4} xs={6}>
              <EventPageCard event={event} />
            </Grid.Col>
          ))}
        </Grid>
        <Pagination
          position="center"
          mt="lg"
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

export default AdminEventsPage;
