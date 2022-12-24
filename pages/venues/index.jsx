import TableScrollArea from "../../src/components/AdminPage/TableScrollArea/TableScrollArea";

import { Container, TextInput, Grid } from "@mantine/core";
import Loading from "../../src/utils/Loading/Loading";
import { useState } from "react";
import { useGetVenuesQuery } from "../../src/features/venue/venueSlice";
import EventPageCard from "../../src/components/EventPageCard/EventPageCard";

const AdminEventsPage = () => {
  const { data, isLoading, error } = useGetVenuesQuery();

  const [filteredData, setFilteredData] = useState(null);

  const handleSearch = ({ target }) => {
    if (target.value === "") setFilteredData(null);
    setFilteredData(
      data.filter((value) =>
        value.name.toLowerCase().includes(target.value.toLowerCase())
      )
    );
  };
  if (isLoading) return <Loading />;
  return (
    <>
      <Container size="md">
        <Grid mt="lg">
          {data.map((event) => (
            <Grid.Col key={event._id} lg={4} xs={6}>
              <EventPageCard event={event} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default AdminEventsPage;
