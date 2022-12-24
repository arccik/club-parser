import TableScrollArea from "../../src/components/AdminPage/TableScrollArea/TableScrollArea";

import { Container, TextInput } from "@mantine/core";
import Loading from "../../src/utils/Loading/Loading";
import { useState } from "react";
import { useGetEventsQuery } from "../../src/features/event/eventSlice";

const AdminEventsPage = () => {
  const { data, isLoading, error } = useGetEventsQuery();

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
    <Container px={0}>
      <TextInput
        onChange={handleSearch}
        size="sm"
        placeholder="What's looking for ?"
      />

      {data.map((event) => (
        <p key={event._id}>{event.name}</p>
      ))}
    </Container>
  );
};

export default AdminEventsPage;
